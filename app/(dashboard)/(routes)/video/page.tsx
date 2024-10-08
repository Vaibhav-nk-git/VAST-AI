"use client";

import Heading from '@/components/heading';
import { FileVideo2Icon} from 'lucide-react';
// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { formSchema } from './constants';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { useRouter } from 'next/navigation';
// import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
// import axios from "axios";
// import { Empty } from '@/components/empty';
// import { Loader } from '@/components/loader';
// import { cn } from '@/lib/utils';
// import { UserAvatar } from '@/components/user-avatar';
// import { BotAvatar } from '@/components/bot-avatar';
import { ComingSoon } from '@/components/comingSoon';

export default function ConversationPage() {
    // const router = useRouter();
    // const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);

    // const form = useForm<z.infer<typeof formSchema>>({
    //     resolver: zodResolver(formSchema),
    //     defaultValues: {
    //         prompt: ""
    //     }
    // });

    // const isLoading = form.formState.isSubmitting;

    // const onSubmit = async (values: z.infer<typeof formSchema>) => {
    //     try {
    //         const userMessage: ChatCompletionMessageParam = {
    //             role: "user",
    //             content: values.prompt
    //         };
    //         const newMessages = [...messages, userMessage];

    //         const response = await axios.post("/api/conversation", {
    //             messages: newMessages
    //         });

    //         const assistantMessage: ChatCompletionMessageParam = {
    //             role: "assistant",
    //             content: response.data.response
    //         };

    //         setMessages((current) => [...current, userMessage, assistantMessage]);
    //         form.reset();
    //     } catch (error) {
    //         console.log("[CONVERSATION_ERROR]", error);
    //     }finally{
    //         router.refresh();
    //     }
    // };

    return (
        <div>
            <Heading
                title="Video Generation"
                description='Generate videos through AI'
                icon={FileVideo2Icon}
                iconColor='text-orange-500'
                bgColor='bg-orange-500/10'
            />
            {/* <div className='px-4 py-9 lg:px-8'>
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
                                                placeholder='How do I calculate acceleration of a car?'
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
                            <Loader/>
                        </div>
                    )}

                    {messages.length === 0 && !isLoading && (
                        <Empty label="Start the conversation Now"/>
                    )}
                    <div className='flex flex-col-reverse gap-4'>
                        {messages.map((message, index) => (
                            <div key={index} className={cn("p-8 w-full flex items gap-x-8 rounded-lg",
                                message.role ==="user"? "bg-white border border-black/10":"bg-muted"
                            )} >
                                {message.role === 'user' ? <UserAvatar/>: <BotAvatar/>}
                                <p className='text-sm'>
                                    {message.content}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div> */}
            <div>
                <ComingSoon label='AI Video generation will be coming in soon '/>
            </div>
        </div>
    );
}
