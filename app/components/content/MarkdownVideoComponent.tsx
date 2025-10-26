import { useState } from 'react';
import React from 'react';

export const MarkdownVideoComponent: React.FC<{
    src: string;
    alt?: string;
    caption?: string;
    className?: string;
    align?: 'left' | 'right' | 'center';
}> = ({ src, alt = "", caption = "", className = "", align = 'center' }) => {
    const [aspectRatio, setAspectRatio] = useState<number>(16 / 9);
    const videoIdMatch = src.match(/\/video\/([a-zA-Z0-9]+)\/?/);
    const videoId = videoIdMatch ? videoIdMatch[1] : null;
    const embedSrc = videoId ? `https://rutube.ru/embed/${videoId}` : src;

    const alignmentClasses = {
        left: "float-left mr-4 mb-4 ml-0 max-w-[50%] md:max-w-[300px] w-full md:w-auto",
        right: "float-right ml-4 mb-4 mr-0 max-w-[50%] md:max-w-[300px] w-full md:w-auto",
        center: "mx-auto my-6 w-full"
    };

    if (align === 'center') {
        return (
            <div className={`${alignmentClasses[align]} ${className}`}>
                <div className="relative w-full" style={{ paddingBottom: `${100 / aspectRatio}%` }}>
                    <iframe src={embedSrc} title={alt.replace('video:', '')} className="absolute top-0 left-0 w-full h-full rounded-lg border-2 border-amber-300" allowFullScreen loading="lazy"/>
                </div>
                {caption && (<div className="text-center text-sm text-amber-700 mt-2 italic">{caption}</div>)}
            </div>
        );
    }

    return (
        <>
            <div className={`md:hidden mx-auto my-4 w-full max-w-md ${className}`}>
                <div className="relative w-full" style={{ paddingBottom: `${100 / aspectRatio}%` }}>
                    <iframe src={embedSrc} title={alt.replace('video:', '')} className="absolute top-0 left-0 w-full h-full rounded-lg border-2 border-amber-300" allowFullScreen loading="lazy"/>
                </div>
                {caption && (<div className="text-center text-lg text-black mt-2 italic">{caption}</div>)}
            </div>
            <div className={`hidden md:block ${alignmentClasses[align]} ${className}`}>
                <div className="relative w-[300px]" style={{ paddingBottom: `${100 / aspectRatio * (300 / (16 / 9 * 300))}%` }}>
                    <iframe src={embedSrc} title={alt.replace('video:', '')} className="absolute top-0 left-0 w-full h-full rounded-lg border-2 border-amber-300" allowFullScreen loading="lazy"/>
                </div>
                {caption && (<div className="text-center text-lg text-black mt-2 italic">{caption}</div>)}
            </div>
        </>
    );
};