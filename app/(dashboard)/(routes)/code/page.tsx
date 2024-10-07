"use client";

import Heading from '@/components/heading';
import { CodeSquareIcon } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { formSchema } from './constants';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import { useProModel } from '@/hooks/use-pro-model';
import axios, { AxiosError } from "axios";
import { Empty } from '@/components/empty';
import { Loader } from '@/components/loader';
import { cn } from '@/lib/utils';
import { UserAvatar } from '@/components/user-avatar';
import { BotAvatar } from '@/components/bot-avatar';
import ReactMarkdown from "react-markdown";
import toast from 'react-hot-toast';

export default function CodePage() {
    const proModel = useProModel();
    const router = useRouter();
    const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const userMessage: ChatCompletionMessageParam = {
                role: "user",
                content: values.prompt
            };
            const newMessages = [...messages, userMessage];

            const response = await axios.post("/api/code", {
                messages: newMessages
            });

            const assistantMessage: ChatCompletionMessageParam = {
                role: "assistant",
                content: response.data.response
            };

            setMessages((current) => [...current, userMessage, assistantMessage]);
            form.reset();
        } catch (error) {
            const axiosError = error as AxiosError;
            if (axiosError?.response?.status === 403) {
                proModel.onOpen();
            } else {
                toast.error("Something went wrong");
            }
        } finally {
            router.refresh();
        }
    };

    return (
        <div>
            <Heading
                title="Code Generation"
                description='Generate code using descriptive text'
                icon={CodeSquareIcon}
                iconColor='text-blue-500'
                bgColor='bg-blue-500/10'
            />
            <div className='px-4 py-9 lg:px-8'>
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className='rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2'
                        >
                            <FormField
                                name='prompt'
                                render={({ field }) => (
                                    <FormItem className='col-span-12 lg:col-span-10'>
                                        <FormControl className='m-0 p-0'>
                                            <Input
                                                className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                                                disabled={isLoading}
                                                placeholder='Python program to solve 3Sum problem?'
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className='col-span-12 lg:col-span-2 w-full' disabled={isLoading}>
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className='space-y-4 mt-4'>
                    {isLoading && (
                        <div className='p-8 rounded-lg w-full flex items-center justify-center bg-muted'>
                            <Loader />
                        </div>
                    )}

                    {messages.length === 0 && !isLoading && (
                        <Empty label="Ask the Pro Coder" />
                    )}
                    <div className='flex flex-col-reverse gap-4'>
                        {messages.map((message, index) => (
                            <div key={index} className={cn("p-8 w-full flex items gap-x-8 rounded-lg",
                                message.role === "user" ? "bg-white border border-black/10" : "bg-muted"
                            )}>
                                {message.role === 'user' ? <UserAvatar /> : <BotAvatar />}
                                <ReactMarkdown
                                    components={{
                                        pre: ({ ...props }) => ( // Omit node
                                            <div className='overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg'>
                                                <pre {...props} />
                                            </div>
                                        ),
                                        code: ({ ...props }) => ( // Omit node
                                            <code className='bg-black/10 rounded-lg p-1' {...props} />
                                        )
                                    }} 
                                    className="text-sm overflow-hidden leading-7"
                                >
                                    {typeof message.content === 'string' ? message.content : JSON.stringify(message.content) || ""}
                                </ReactMarkdown>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
