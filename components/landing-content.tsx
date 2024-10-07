"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const testimonials=[
    
        {
            name: "Alice Johnson",
            avatar: "A",
            title: "Data Scientist",
            content: "This platform is a game changer! I can generate images, write scripts, and even create music all in one place. It's incredibly efficient for my creative workflow."
        },
        {
            name: "Michael Smith",
            avatar: "M",
            title: "Freelance Writer",
            content: "Absolutely love the versatility of this AI platform. I can quickly switch between text generation and image creation. It saves me hours when preparing content for my clients."
        },
        {
            name: "Sofia Martinez",
            avatar: "S",
            title: "Marketing Manager",
            content: "The tool has become my go-to for marketing campaigns. Whether it’s generating ad copy or producing visuals, the all-in-one approach has made content creation seamless."
        },
        {
            name: "David Brown",
            avatar: "D",
            title: "Product Manager",
            content: "Managing multiple AI capabilities under a single platform was a brilliant idea. I can brainstorm product ideas, create presentations, and even automate customer support responses, all without switching tools."
        },
        {
            name: "Emily Davis",
            avatar: "E",
            title: "Graphic Designer",
            content: "The AI tools for image generation are exceptional! They’ve helped me draft concepts quickly, and having text tools in the same interface is a bonus for generating creative captions."
        },
        {
            name: "Liam Wilson",
            avatar: "L",
            title: "Software Engineer",
            content: "I never thought I'd need a platform like this until I tried it. The code generation and debugging capabilities alongside text analysis make it a must-have tool for developers."
        },
        {
            name: "Olivia Taylor",
            avatar: "O",
            title: "Content Strategist",
            content: "Being able to do everything from generating blog content to creating visuals without hopping between different tools is a major plus. It's helped me boost productivity significantly."
        },
        {
            name: "James Anderson",
            avatar: "J",
            title: "Entrepreneur",
            content: "Having access to multiple AI tools in one place has saved me so much time. I use it for generating ideas, creating marketing materials, and even writing emails. The convenience is unmatched."
        }
    
    
]

export const LandingContent=() => {
  return (
    <div className='px-10 pb-20'>
        <h2 className='text-center text-4xl text-white font-extrabold mb-10'>
            Testimonials
        </h2>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {testimonials.map((item)=>{
                return(
                    <Card key={item.content} className="bg-[#192339] border-none text-white">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-x-2 ">
                                <div>
                                    <p>{item.name}</p>
                                    <p className="text-zinc-400 text-sm" >{item.title}</p>
                                </div>
                                
                            </CardTitle>
                            <CardContent className="pt-4 px-0">
                                {item.content}
                            </CardContent>
                        </CardHeader>
                    </Card>
                )
            })}
        </div>
    
    
    </div>
    
  )
}
