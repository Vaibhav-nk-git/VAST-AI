import Image from "next/image";

interface ComingSoonProps{
    label:string;
}

export const ComingSoon=({label}:ComingSoonProps)=> {
  return (
    <div className="h-full p-20 flex flex-col items-center justify-center">
        <div className="relative h-72 w-72">
            <Image
                alt="ComingSoon"
                fill
                src = "/coming-soon.png"
            />
        </div>
        <p className="text-muted-foreground text-sm text-center">{label}</p>
    </div>
  )
}

