import { useState } from 'react';
import Image from 'next/image';
import React from 'react';

export const MarkdownImageComponent: React.FC<{
    src: string;
    alt?: string;
    caption?: string;
    className?: string;
    align?: 'left' | 'right' | 'center';
}> = ({ src, alt = "", caption = "", className = "", align = 'center' }) => {
    const [aspectRatio, setAspectRatio] = useState<number>(16 / 9);

    const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
        const img = event.currentTarget;
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        setAspectRatio(width / height);
    };

    const alignmentClasses = {
        left: "float-left mr-4 mb-4 ml-0 max-w-[50%] md:max-w-[300px] w-full md:w-auto",
        right: "float-right ml-4 mb-4 mr-0 max-w-[50%] md:max-w-[300px] w-full md:w-auto",
        center: "mx-auto my-6 w-full"
    };

    if (align === 'center') {
        return (
            <div className={`${alignmentClasses[align]} ${className}`}>
                <div className="relative w-full" style={{ paddingBottom: `${100 / aspectRatio}%` }}>
                    <Image src={src} alt={alt} fill className="object-cover rounded-lg border-2 border-amber-300" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw" onLoad={handleImageLoad}/>
                </div>
                {caption && (<div className="text-center text-lg text-black-700 mt-2 italic">{caption}</div>)}
            </div>
        );
    }

    return (
        <>
            <div className={`md:hidden mx-auto my-4 w-full max-w-md ${className}`}>
                <div className="relative w-full" style={{ paddingBottom: `${100 / aspectRatio}%` }}>
                    <Image src={src} alt={alt} fill className="object-cover rounded-lg border-2 border-amber-300" sizes="(max-width: 768px) 100vw, 400px" onLoad={handleImageLoad}/>
                </div>
                {caption && (<div className="text-center text-lg text-black mt-2 italic">{caption}</div>)}
            </div>
            <div className={`hidden md:block ${alignmentClasses[align]} ${className}`}>
                <Image src={src} alt={alt} width={300} height={200} className="rounded-lg border-2 border-amber-300 object-cover w-full" sizes="(max-width: 768px) 100vw, 300px" onLoad={handleImageLoad}/>
                {caption && (<div className="text-center text-lg text-black mt-2 italic">{caption}</div>)}
            </div>
        </>
    );
};