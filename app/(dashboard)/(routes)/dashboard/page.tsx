"use client"
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { ArrowRight, CodeSquareIcon, ImagesIcon, MessageSquare, Music2, VideoIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const tools = [
    {
        label:"Conversation",
        icon:MessageSquare,
        color:"text-violet-500",
        href:"/conversation",
        bgColor:"bg-violet-500/10"
    },
    {
        label:"Image Generation",
        icon:ImagesIcon,
        color:"text-pink-700",
        href:"/image",
        bgColor:"bg-pink-500/10"

    },
    {
        label:"Video Generation",
        icon:VideoIcon,
        color:"text-orange-700",
        href:"/video",
        bgColor:"bg-orange-500/10"

    },
    {
        label:"Music Generation",
        icon:Music2,
        color:"text-emerald-500",
        href:"/music",
        bgColor:"bg-emerald-500/10"

    },
    {
        label:"Code Generation",
        icon:CodeSquareIcon,
        color:"text-blue-600",
        href:"/code",
        bgColor:"bg-blue-500/10"

    }
]

export default function DashboardPage() {
    const router = useRouter();
  return (
    <div>
        <div className="mb-8 space-y-4">
            <h2 className='text-2xl md:text-4xl font-bold text-center'>Explore the power of AI</h2>
            <p className='text-muted-foreground font-light text-sm md:text-lg text-center'>
                 Welcome to the NEXUS of AI tools
            </p>
            <div className='px-4 md:px-20 lg:px-32 space-y-4'>
                {tools.map((tool)=>(
                    <Card 
                    onClick={()=>router.push(tool.href)} key={tool.href}
                    className='p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor.pointer'>
                        <div className='flex items-center gap-x-4'>
                            <div className={cn("p-2 w-fit rounded-md",tool.bgColor)}>
                                <tool.icon className={cn('w-8 h-8',tool.color)}/>
                            </div>
                            <div className='font-semibold'>
                                {tool.label}
                            </div>
                        </div>
                        <ArrowRight className='w-5 h-5'/>
                    </Card>
                ))}
                
            </div>
        </div>
    </div>
  )
}
