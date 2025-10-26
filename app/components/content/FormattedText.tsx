import React from 'react';
import { MarkdownImageComponent } from './MarkdownImageComponent';
import { MarkdownVideoComponent } from './MarkdownVideoComponent';

export const FormattedText: React.FC<{ content: string }> = ({ content }) => {
    const parseContent = (text: string) => {
        const imageRegex = /!\[(.*?)\]\((.*?)(?:,\s*([LR]))?(?:\s+"(.*?)")?\)/g;
        const parts = text.split(imageRegex);
        const result: React.ReactNode[] = [];

        for (let i = 0; i < parts.length; i++) {
            if (i % 5 === 0 && parts[i] !== undefined) {
                if (parts[i].trim()) {
                    result.push(parseTextWithFormatting(parts[i]));
                }
                if (parts[i + 1] !== undefined && parts[i + 2] !== undefined) {
                    const alt = parts[i + 1];
                    const src = parts[i + 2];
                    const align = parts[i + 3] as 'L' | 'R' | undefined;
                    const caption = parts[i + 4] || "";
                    const alignment = align === 'L' ? 'left' : align === 'R' ? 'right' : 'center';

                    if (alt.startsWith('video:')) {
                        result.push(<MarkdownVideoComponent key={`video-${i}`} src={src} alt={alt} caption={caption} align={alignment}/>);
                    } else {
                        result.push(<MarkdownImageComponent key={`img-${i}`} src={src} alt={alt} caption={caption} align={alignment}/>);
                    }
                    i += 4;
                }
            }
        }

        if (result.length === 0 || typeof result[result.length - 1] === 'string') {
            const lastPart = parts[parts.length - 1];
            if (lastPart && lastPart.trim()) {
                result.push(parseTextWithFormatting(lastPart));
            }
        }
        return result;
    };

    const parseTextWithFormatting = (text: string) => {
        let formattedText = text
            .replace(/\*\*(.*?)\*\*|__(.*?)__/g, '<strong>$1$2</strong>')
            .replace(/\*(.*?)\*|_(.*?)_/g, '<em>$1$2</em>')
            .replace(/~~(.*?)~~/g, '<u>$1</u>')
            .replace(/--(.*?)--/g, '<s>$1</s>');

        return <div key={`text-${Math.random()}`} className="whitespace-pre-line mb-4 text-lg leading-relaxed text-black" dangerouslySetInnerHTML={{ __html: formattedText }}/>;
    };

    return (<div className="leading-relaxed">{parseContent(content)}<div className="clear-both"></div></div>);
};