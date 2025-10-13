'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link'; // ✅ Добавлен Link для навигации

// --- Иконки ---
const ArrowRight = ({ className }: { className?: string }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 19 7-7-7-7" />
        <path d="M5 12h14" />
    </svg>
);
const ArrowLeft = ({ className }: { className?: string }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 19-7-7 7-7" />
        <path d="M19 12H5" />
    </svg>
);
const Book = ({ className }: { className?: string }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
);
const Brain = ({ className }: { className?: string }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
        <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
        <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
        <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
        <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
        <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
        <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
        <path d="M6 18a4 4 0 0 1-1.967-.516" />
        <path d="M19.967 17.484A4 4 0 0 1 18 18" />
    </svg>
);
const CheckCircle = ({ className }: { className?: string }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <path d="m9 11 3 3L22 4" />
    </svg>
);
const XCircle = ({ className }: { className?: string }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="m15 9-6 6" />
        <path d="m9 9 6 6" />
    </svg>
);
const RotateCcw = ({ className }: { className?: string }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
    </svg>
);
const BookOpen = ({ className }: { className?: string }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6l4 4 4-4h6v18H2V3z" />
        <path d="M6 8v13" />
        <path d="M18 8v13" />
    </svg>
);
// ✅ Новая иконка для кнопки
const QrCode = ({ className }: { className?: string }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="5" height="5" x="3" y="3" rx="1" />
        <rect width="5" height="5" x="16" y="3" rx="1" />
        <rect width="5" height="5" x="3" y="16" rx="1" />
        <path d="M21 16h-5a1 1 0 0 0-1 1v4" />
        <path d="M16 8h1" />
        <path d="M19 8h1" />
        <path d="M16 11h2" />
        <path d="M16 14h3" />
        <path d="M8 8h2" />
        <path d="M8 11h4" />
        <path d="M11 14h1" />
        <path d="M8 16h1" />
        <path d="M8 19h1" />
        <path d="M11 16h1" />
        <path d="M14 19h1" />
        <path d="M14 16h1" />
    </svg>
);

// --- Ваши существующие интерфейсы (без изменений) ---
// ... (все ваши интерфейсы: BaseQuestion, SingleChoiceQuestion и т.д.)
interface BaseQuestion {
    id: string;
    question: string;
    explanation: string;
    type: 'single' | 'multiple' | 'text' | 'matching';
}
interface SingleChoiceQuestion extends BaseQuestion {
    type: 'single';
    options: string[];
    correctAnswer: number;
}
interface MultipleChoiceQuestion extends BaseQuestion {
    type: 'multiple';
    options: string[];
    correctAnswers: number[];
}
interface TextAnswerQuestion extends BaseQuestion {
    type: 'text';
    correctAnswer: string;
    caseSensitive?: boolean;
}
interface MatchingQuestion extends BaseQuestion {
    type: 'matching';
    leftColumn: { id: number; text: string }[];
    rightColumn: { id: string; text: string }[];
    correctMatches: { leftId: number; rightId: string }[];
    leftTitle?: string;
    rightTitle?: string;
}
type Question = SingleChoiceQuestion | MultipleChoiceQuestion | TextAnswerQuestion | MatchingQuestion;
interface Quiz {
    questions: Question[];
}
interface GlossaryTerm {
    term: string;
    definition: string;
}
interface Topic {
    id: string;
    title: string;
    image: string;
    contentFile: string;
}
interface Section {
    id: string;
    title: string;
    description: string;
    icon: string;
    topics: Topic[];
    quizFile: string;
    glossaryFile: string;
}


// --- Ваши существующие компоненты и хуки (без изменений) ---
// ... (все ваши хуки и компоненты: TopicContent, useQuiz, FormattedText и т.д.)
const TopicContent: React.FC<{ topic: Topic }> = ({ topic }) => {
    const { content, loading, error } = useTopicContent(topic.contentFile);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-8">
                <div className="text-amber-700">Загрузка контента...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-300 rounded-lg p-4 text-red-700">
                <p>Ошибка загрузки контента: {error}</p>
                <p className="text-sm mt-2">Файл: {topic.contentFile}</p>
            </div>
        );
    }

    return <FormattedText content={content} />;
};
const useTopicContent = (contentFile: string | null) => {
    const [content, setContent] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!contentFile) {
            setContent('');
            return;
        }

        const loadContent = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(contentFile);
                if (!response.ok) {
                    throw new Error(`Failed to load content: ${response.status}`);
                }
                const text = await response.text();
                setContent(text);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
                setContent('');
            } finally {
                setLoading(false);
            }
        };

        loadContent();
    }, [contentFile]);

    return { content, loading, error };
};
const useQuiz = (quizFile: string | null) => {
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!quizFile) {
            setQuiz(null);
            return;
        }

        const loadQuiz = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(quizFile);
                if (!response.ok) {
                    throw new Error(`Failed to load quiz: ${response.status}`);
                }
                const data: Quiz = await response.json();
                setQuiz(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
                setQuiz(null);
            } finally {
                setLoading(false);
            }
        };

        loadQuiz();
    }, [quizFile]);

    return { quiz, loading, error };
};
const useGlossary = (glossaryFile: string | null) => {
    const [glossary, setGlossary] = useState<GlossaryTerm[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!glossaryFile) {
            setGlossary(null);
            return;
        }

        const loadGlossary = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(glossaryFile);
                if (!response.ok) {
                    throw new Error(`Failed to load glossary: ${response.status}`);
                }
                const data: { glossary: GlossaryTerm[] } = await response.json();
                setGlossary(data.glossary);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
                setGlossary(null);
            } finally {
                setLoading(false);
            }
        };

        loadGlossary();
    }, [glossaryFile]);

    return { glossary, loading, error };
};
const MarkdownImageComponent: React.FC<{
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
const MarkdownVideoComponent: React.FC<{
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
const FormattedText: React.FC<{ content: string }> = ({ content }) => {
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
const SingleChoiceQuestionComponent: React.FC<{question: SingleChoiceQuestion; selectedAnswer: number | null; onAnswerSelect: (answer: number) => void;}> = ({ question, selectedAnswer, onAnswerSelect }) => {
    return (
        <div className="space-y-3">
            {question.options.map((option, index) => (
                <button key={index} className={`w-full text-left p-4 rounded-md border transition-all ${selectedAnswer === index ? 'border-amber-600 bg-amber-200 text-black' : 'border-amber-300 hover:border-amber-400 hover:bg-amber-200 text-black'}`} onClick={() => onAnswerSelect(index)}>
                    <span className="font-semibold mr-3">{String.fromCharCode(65 + index)}.</span>{option}
                </button>
            ))}
        </div>
    );
};
const MultipleChoiceQuestionComponent: React.FC<{question: MultipleChoiceQuestion; selectedAnswers: number[]; onAnswerSelect: (answers: number[]) => void;}> = ({ question, selectedAnswers, onAnswerSelect }) => {
    const toggleAnswer = (index: number) => {
        const newAnswers = selectedAnswers.includes(index) ? selectedAnswers.filter(i => i !== index) : [...selectedAnswers, index];
        onAnswerSelect(newAnswers);
    };

    return (
        <div className="space-y-3">
            {question.options.map((option, index) => (
                <button key={index} className={`w-full text-left p-4 rounded-md border transition-all ${selectedAnswers.includes(index) ? 'border-amber-600 bg-amber-200 text-black' : 'border-amber-300 hover:border-amber-400 hover:bg-amber-200 text-black'}`} onClick={() => toggleAnswer(index)}>
                    <span className="font-semibold mr-3">{String.fromCharCode(65 + index)}.</span>{option}
                </button>
            ))}
        </div>
    );
};
const TextAnswerQuestionComponent: React.FC<{question: TextAnswerQuestion; answer: string; onAnswerChange: (answer: string) => void;}> = ({ question, answer, onAnswerChange }) => {
    return (
        <div className="space-y-3">
            <input type="text" value={answer} onChange={(e) => onAnswerChange(e.target.value)} className="w-full p-4 border border-amber-300 rounded-md focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-black text-lg" placeholder="Введите ваш ответ..."/>
            {!question.caseSensitive && (<p className="text-sm text-amber-600">Регистр букв не учитывается</p>)}
        </div>
    );
};
const MatchingQuestionComponent: React.FC<{question: MatchingQuestion; matches: { leftId: number; rightId: string }[]; onMatchesChange: (matches: { leftId: number; rightId: string }[]) => void;}> = ({ question, matches, onMatchesChange }) => {
    const getMatchForLeft = (leftId: number) => {
        return matches.find(match => match.leftId === leftId)?.rightId || '';
    };

    const handleMatchChange = (leftId: number, rightId: string) => {
        const newMatches = matches.filter(match => match.leftId !== leftId);
        if (rightId) {
            newMatches.push({ leftId, rightId });
        }
        onMatchesChange(newMatches);
    };

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <h4 className="font-semibold text-amber-900 mb-2">{question.leftTitle || 'Левый столбец'}</h4>
                    <div className="space-y-2">{question.leftColumn.map((item) => (<div key={item.id} className="p-3 bg-amber-100 rounded border border-amber-200 text-black">{item.id}. {item.text}</div>))}</div>
                </div>
                <div>
                    <h4 className="font-semibold text-amber-900 mb-2">{question.rightTitle || 'Правый столбец'}</h4>
                    <div className="space-y-2">{question.rightColumn.map((item) => (<div key={item.id} className="p-3 bg-amber-100 rounded border border-amber-200 text-black">{item.id}. {item.text}</div>))}</div>
                </div>
            </div>
            <div className="space-y-3">
                <h4 className="font-semibold text-amber-900">Установите соответствие:</h4>
                {question.leftColumn.map((leftItem) => (
                    <div key={leftItem.id} className="flex items-center gap-3">
                        <span className="font-medium w-8">{leftItem.id}.</span>
                        <span className="flex-1">{leftItem.text}</span>
                        <select value={getMatchForLeft(leftItem.id)} onChange={(e) => handleMatchChange(leftItem.id, e.target.value)} className="p-2 border border-amber-300 rounded">
                            <option value="">...</option>
                            {question.rightColumn.map((rightItem) => (<option key={rightItem.id} value={rightItem.id}>{rightItem.id}</option>))}
                        </select>
                    </div>
                ))}
            </div>
            <div className="text-sm text-amber-600">Введите ответ в формате: {question.leftColumn.map(item => item.id).join('')} → {question.rightColumn.map(item => item.id).join('')}</div>
        </div>
    );
};
const checkAnswer = (question: Question, userAnswer: any): boolean => {
    switch (question.type) {
        case 'single': return userAnswer === (question as SingleChoiceQuestion).correctAnswer;
        case 'multiple': return JSON.stringify([...(userAnswer || [])].sort()) === JSON.stringify([...(question as MultipleChoiceQuestion).correctAnswers].sort());
        case 'text': const textQuestion = question as TextAnswerQuestion; if (textQuestion.caseSensitive) { return (userAnswer || '').trim() === textQuestion.correctAnswer; } return (userAnswer || '').trim().toLowerCase() === textQuestion.correctAnswer.toLowerCase();
        case 'matching': return JSON.stringify([...(userAnswer || [])].sort((a: any, b: any) => a.leftId - b.leftId)) === JSON.stringify([...(question as MatchingQuestion).correctMatches].sort((a: any, b: any) => a.leftId - b.leftId));
        default: return false;
    }
};


const sections: Section[] = [
    {
        id: 'ancient',
        title: 'Кубань в древности',
        description: 'История Кубани от каменного века до Античности',
        icon: '/images/pot.svg',
        quizFile: '/1/1quiz.json',
        glossaryFile: '/1/1glossary.json',
        topics: [ { id: 'kubanKamen', title: 'Кубань в каменном веке', image: '/1/1/7.jpg', contentFile: '/1/1/1.1text.md' }, { id: 'bronzeCulture', title: 'Культуры эпохи бронзы', image: '/1/2/8.jpg', contentFile: '/1/2/1.2text.md' }, { id: '1.3', title: 'Население Северо-Западного Кавказа в железном веке', image: '/1/4/szkpreview.jpg', contentFile: '/1/3/1.3text.md' }, { id: '1.4', title: 'Греческая колонизация Северо-Западного Кавказа', image: '/1/4/4.jpg', contentFile: '/1/4/1.4text.md' },]
    },
    {
        id: 'kuban_middle_age',
        title: 'Северо-Западный Кавказ в эпоху средневековья',
        description: 'История региона в средневековье',
        icon: '/images/swords.svg',
        quizFile: '/2/2quiz.json',
        glossaryFile: '/2/2glossary.json',
        topics: [ { id: 'topic1', title: 'Кубань в период домонгольского вторжения', image: '/2/1/5.jpg', contentFile: '/2/1/2.1text.md' }, { id: 'topic2', title: 'Нашествие монгол и полчищ Темирлана в ХIII-ХIV вв.', image: '/2/2/2.jpg', contentFile: '/2/2/2.2text.md' }, { id: 'topic3', title: 'Итальянское проникновение на Черноморское побережье. Генуэзские колонии в ХIII-ХV вв.', image: '/2/3/4.jpg', contentFile: '/2/3/2.3text.md' }, { id: 'topic4', title: 'Северо-Западный Кавказ в международных отношениях второй половины ХV - ХVII вв.', image: '/2/4/3.jpg', contentFile: '/2/4/2.4text.md' }, { id: 'topic5', title: 'Первые русские поселенцы на Кубани', image: '/2/5/5.jpg', contentFile: '/2/5/2.5text.md' }]
    },
    {
        id: 'kuban18-19',
        title: 'Кубань в ХVIII -  ХIХ вв.',
        description: 'Социально-экономическое и политическое развитие Кубани',
        icon: '/images/crown.svg',
        quizFile: '/3/3quiz.json',
        glossaryFile: '/3/3glossary.json',
        topics: [ { id: 'topic1', title: 'Территория расселения и общественно-политическое устройство адыгов в ХVIII - середине ХIХ вв.', image: '/3/1/5.jpg', contentFile: '/3/1/3.1text.md' }, { id: 'topic2', title: 'Военно-политическая ситуация на Северо-Западном Кавказе в ХVIII веке', image: '/3/2/szk18.jpg', contentFile: '/3/2/3.2text.md' }, { id: 'topic3', title: 'Переселение черноморских и донских казаков на Кубань', image: '/3/2/migration.jpg', contentFile: '/3/3/3.3text.md' }, { id: 'topic4', title: 'Присоединение Северо-Западного Кавказа к России', image: '/3/4/9.jpg', contentFile: '/3/4/3.4text.md' }, { id: 'topic5', title: 'Военно-казачья и народная колонизация Кубани', image: '/3/5/1.jpg', contentFile: '/3/5/3.5text.md' }, { id: 'topic6', title: 'Иностранная колонизация Кубани', image: '/3/6/4.jpg', contentFile: '/3/6/3.6text.md' }, { id: 'topic7', title: 'Образование Кубанской области и Кубанского казачьего войска. Военная служба казаков.', image: '/3/7/2.jpg', contentFile: '/3/7/3.7text.md' }, { id: 'topic8', title: 'Социально-экономическое развитие Кубани во второй половине ХIХ в.', image: '/3/8/4.jpg', contentFile: '/3/8/3.8text.md' }, { id: 'topic9', title: 'Культура и быт казачества и адыгов', image: '/3/9/3.jpg', contentFile: '/3/9/3.9text.md' }]
    },
    {
        id: 'kuban20-21',
        title: 'Кубанская область в годы империалистических войн,  революционных потрясений и социалистической модернизации',
        description: 'Кубань на пути социально-политической и экономической трансформации',
        icon: '/images/hammer.svg',
        quizFile: '/4/4quiz.json',
        glossaryFile: '/4/4glossary.json',
        topics: [ { id: 'topic1', title: 'Экономика Кубани, особенности ее развития', image: '/4/1/3.jpg', contentFile: '/4/1/4.1text.md' }, { id: 'topic2', title: 'Политическая жизнь региона в годы Первой русской революции 1905-1907 гг', image: '/4/2/3.jpg', contentFile: '/4/2/4.2text.md' }, { id: 'topic3', title: 'Кубанцы в Первой мировой войне', image: '/4/3/4.jpg', contentFile: '/4/3/4.3text.md' }, { id: 'topic4', title: 'Резонанс революционных событий 1917 г. на Кубани', image: '/4/4/4.jpg', contentFile: '/4/4/4.4text.md' }, { id: 'topic5', title: 'Кубань в пламени Гражданской войны', image: '/4/5/prev.jpg', contentFile: '/4/5/4.5text.md' }, { id: 'topic6', title: 'НЭП на Кубани', image: '/4/6/32.jpg', contentFile: '/4/6/4.6text.md' }, { id: 'topic7', title: 'Коллективизация и индустриализация на Кубани', image: '/4/7/8.jpg', contentFile: '/4/7/4.7text.md' }]
    },
    {
        id: 'kuban_in_war',
        title: 'Героические страницы истории Великой Отечественной войны',
        description: 'Кубань в годы Великой Отечественной войны',
        icon: '/images/star.svg',
        quizFile: '/5/5quiz.json',
        glossaryFile: '/5/5glossary.json',
        topics: [ { id: 'topic1', title: 'Мобилизация региона', image: '/5/1/2.jpg', contentFile: '/5/1/5.1text.md' }, { id: 'topic2', title: 'Битва за Кавказ. Оборонительный период', image: '/5/2/4.jpg', contentFile: '/5/2/5.2text.md' }, { id: 'topic3', title: 'Преступления немецкого оккупационного режима на Кубани', image: '/5/3/3.jpg', contentFile: '/5/3/5.3text.md' }, { id: 'topic4', title: 'Партизанское и подпольное движение на Кубани', image: '/5/4/3.jpg', contentFile: '/5/4/5.4text.md' }, { id: 'topic5', title: 'Наступательный период битвы за Кавказ. Освобождение Кубани', image: '/5/5/6.jpg', contentFile: '/5/5/5.5text.md' }, { id: 'topic6', title: 'Воздушные бои над Кубанью', image: '/5/6/2.jpg', contentFile: '/5/6/5.6text.md' }, { id: 'topic7', title: 'Восстановление и развитие народного хозяйства в 1945-1950 гг.', image: '/5/7/4.jpg', contentFile: '/5/7/5.7text.md' }]
    },
];

export default function Home() {
    // Состояние для определения, запущено ли приложение как TWA (в оболочке)
    // Изначально null, чтобы кнопка не "моргала" при загрузке
    const [isTwa, setIsTwa] = useState<boolean | null>(null);

    // Состояние для определения типа устройства (ПК или мобильный)
    const [isMobile, setIsMobile] = useState<boolean | null>(null);

    // Этот эффект выполняется один раз при загрузке страницы на клиенте
    useEffect(() => {
        // Проверяем, соответствует ли режим отображения 'standalone' (как у TWA)
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
        setIsTwa(isStandalone);

        // Проверяем тип устройства по User Agent
        const userAgent = typeof window.navigator === "undefined" ? "" : navigator.userAgent;
        const mobile = Boolean(userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i));
        setIsMobile(mobile);
    }, []); // Пустой массив зависимостей означает, что эффект запустится только один раз

    const [currentSection, setCurrentSection] = useState<Section | null>(null);
    const [currentTopic, setCurrentTopic] = useState<Topic | null>(null);
    const [isQuizMode, setIsQuizMode] = useState(false);
    const [isGlossaryMode, setIsGlossaryMode] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswers, setUserAnswers] = useState<any[]>([]);
    const [selectedAnswer, setSelectedAnswer] = useState<any>(null);
    const [showResult, setShowResult] = useState(false);
    const [quizCompleted, setQuizCompleted] = useState(false);
    useEffect(() => {
        // Сбрасываем прокрутку в начало страницы при любом изменении навигации
        window.scrollTo(0, 0);
    }, [currentSection, currentTopic, isQuizMode, isGlossaryMode, currentQuestion, showResult]);
    const { quiz, loading: quizLoading, error: quizError } = useQuiz(
        currentSection && isQuizMode ? currentSection.quizFile : null
    );
    const { glossary, loading: glossaryLoading, error: glossaryError } = useGlossary(
        currentSection && isGlossaryMode ? currentSection.glossaryFile : null
    );


    // Обработчик кнопки "назад" для TWA
    useEffect(() => {
        const handleBackButton = (event: Event) => {
            // Предотвращаем стандартное поведение (выход из приложения)
            event.preventDefault();

            // Обрабатываем навигацию в зависимости от текущего состояния
            if (isQuizMode && currentSection) {
                if (showResult) {
                    // В режиме результатов теста - выходим из теста
                    exitQuiz();
                } else if (currentQuestion > 0) {
                    // В режиме теста - переходим к предыдущему вопросу
                    prevQuestion(quiz);
                } else {
                    // На первом вопросе - выходим из теста
                    exitQuiz();
                }
            } else if (isGlossaryMode && currentSection) {
                // В режиме глоссария - выходим из глоссария
                exitGlossary();
            } else if (currentTopic && currentSection) {
                // В теме - возвращаемся к списку тем
                goToSection();
            } else if (currentSection) {
                // В списке тем - возвращаемся к разделам
                goToHome();
            } else {
                // На главной странице - стандартное поведение (выход)
                // Для TWA приложения можно использовать window.close()
                if (isTwa) {
                    // В TWA приложении показываем подтверждение выхода
                    if (window.confirm('Вы уверены, что хотите выйти из приложения?')) {
                        // Закрываем приложение
                        if (window.close) {
                            window.close();
                        } else {
                            // Fallback для браузеров, которые не поддерживают window.close()
                            window.history.back();
                        }
                    }
                } else {
                    // В обычном браузере - стандартное поведение
                    window.history.back();
                }
            }
        };

        // Добавляем обработчик события backbutton (для Cordova/Capacitor)
        document.addEventListener('backbutton', handleBackButton, false);

        // Также обрабатываем событие popstate (нажатие кнопки назад в браузере)
        const handlePopState = (event: PopStateEvent) => {
            event.preventDefault();
            handleBackButton(new Event('backbutton'));
        };

        window.addEventListener('popstate', handlePopState);

        // Очистка при размонтировании компонента
        return () => {
            document.removeEventListener('backbutton', handleBackButton, false);
            window.removeEventListener('popstate', handlePopState);
        };
    }, [currentSection, currentTopic, isQuizMode, isGlossaryMode, currentQuestion, showResult, quiz, isTwa]);

    // --- Ваши существующие функции навигации (без изменений) ---
    // ... (goToHome, startQuiz, resetQuiz и т.д.)
    const goToHome = () => {
        setCurrentSection(null);
        setCurrentTopic(null);
        setIsQuizMode(false);
        setIsGlossaryMode(false);
        resetQuiz();
    };
    const goToSection = () => {
        setCurrentTopic(null);
        setIsQuizMode(false);
        setIsGlossaryMode(false);
        resetQuiz();
    };
    const startQuiz = () => {
        setIsQuizMode(true);
        setIsGlossaryMode(false);
        resetQuiz();
    };
    const showGlossary = () => {
        setIsGlossaryMode(true);
        setIsQuizMode(false);
        resetQuiz();
    };
    const resetQuiz = () => {
        setCurrentQuestion(0);
        setUserAnswers([]);
        setSelectedAnswer(getInitialAnswerState(quiz?.questions[0] || null));
        setShowResult(false);
        setQuizCompleted(false);
    };
    const handleAnswerSelect = (answer: any) => {
        setSelectedAnswer(answer);
    };
    const nextQuestion = (quiz: Quiz | null) => {
        if (selectedAnswer !== null && selectedAnswer !== undefined && selectedAnswer !== '' && quiz) {
            const newAnswers = [...userAnswers];
            newAnswers[currentQuestion] = selectedAnswer;
            setUserAnswers(newAnswers);
            if (currentQuestion < quiz.questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
                setSelectedAnswer(newAnswers[currentQuestion + 1] || getInitialAnswerState(quiz.questions[currentQuestion + 1]));
            } else {
                setQuizCompleted(true);
                setShowResult(true);
            }
        }
    };
    const prevQuestion = (quiz: Quiz | null) => {
        if (currentQuestion > 0 && quiz) {
            const newAnswers = [...userAnswers];
            newAnswers[currentQuestion] = selectedAnswer;
            setUserAnswers(newAnswers);
            setCurrentQuestion(currentQuestion - 1);
            setSelectedAnswer(newAnswers[currentQuestion - 1] || getInitialAnswerState(quiz.questions[currentQuestion - 1]));
        }
    };
    const getInitialAnswerState = (question: Question | null) => {
        if (!question) return null;
        switch (question.type) {
            case 'single': return null;
            case 'multiple': return [];
            case 'text': return '';
            case 'matching': return [];
            default: return null;
        }
    };
    const restartQuiz = () => {
        resetQuiz();
    };
    const exitQuiz = () => {
        setIsQuizMode(false);
        resetQuiz();
    };
    const exitGlossary = () => {
        setIsGlossaryMode(false);
    };
    const calculateScore = (quiz: Quiz | null) => {
        if (!quiz) return 0;
        let correct = 0;
        userAnswers.forEach((answer, index) => {
            if (checkAnswer(quiz.questions[index], answer)) {
                correct++;
            }
        });
        return correct;
    };


    // --- Вся ваша логика отображения  ---
    //
    if (currentSection && isQuizMode) {
        if (quizLoading) {
            return <div className="min-h-screen bg-amber-50 flex justify-center items-center"><div className="text-amber-700">Загрузка теста...</div></div>;
        }
        if (quizError || !quiz) {
            return (
                <div className="min-h-screen bg-amber-50 flex justify-center items-center">
                    <div className="bg-red-100 border border-red-300 rounded-lg p-6 text-red-700 max-w-md text-center">
                        <h2 className="text-xl font-bold mb-2">Ошибка загрузки теста</h2>
                        <p>{quizError || 'Не удалось найти файл теста.'}</p>
                        <p className="text-sm mt-2">Файл: {currentSection.quizFile}</p>
                        <button onClick={exitQuiz} className="mt-4 px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700">Назад к разделу</button>
                    </div>
                </div>
            );
        }

        const questions = quiz.questions;
        const currentQ = questions[currentQuestion];
        const progress = ((currentQuestion + 1) / questions.length) * 100;
        const formatUserAnswer = (question: Question, answer: any): string => {
            switch (question.type) {
                case 'single': return question.options[answer as number];
                case 'multiple': return (answer as number[]).map(idx => question.options[idx]).join(', ');
                case 'text': return answer as string;
                case 'matching': return (answer as any[]).map(match => `${match.leftId}→${match.rightId}`).join(', ');
                default: return '';
            }
        };
        const formatCorrectAnswer = (question: Question): string => {
            switch (question.type) {
                case 'single': return question.options[(question as SingleChoiceQuestion).correctAnswer];
                case 'multiple': return (question as MultipleChoiceQuestion).correctAnswers.map(idx => question.options[idx]).join(', ');
                case 'text': return (question as TextAnswerQuestion).correctAnswer;
                case 'matching': return (question as MatchingQuestion).correctMatches.map(match => `${match.leftId}→${match.rightId}`).join(', ');
                default: return '';
            }
        };
        const isAnswerReady = () => {
            if (selectedAnswer === null || selectedAnswer === undefined) return false;
            if (currentQ.type === 'multiple' && selectedAnswer.length === 0) return false;
            if (currentQ.type === 'text' && selectedAnswer.trim() === '') return false;
            if (currentQ.type === 'matching' && selectedAnswer.length !== currentQ.leftColumn.length) return false;
            return true;
        };

        if (showResult) {
            const score = calculateScore(quiz);
            const percentage = Math.round((score / questions.length) * 100);
            return (
                <div className="min-h-screen bg-amber-50">
                    <div className="container mx-auto px-4 py-8 max-w-4xl">
                        <div className="mb-6"><button onClick={exitQuiz} className="mb-4 flex items-center text-amber-800 hover:text-amber-900"><ArrowLeft className="w-4 h-4 mr-2" />Назад к разделу</button></div>
                        <div className="border border-amber-200 rounded-lg p-6 bg-amber-100 text-center">
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <div className="p-3 bg-amber-200 rounded-lg"><Image src={currentSection.icon} alt={`${currentSection.title} icon`} width={32} height={32}/></div>
                                <div><h2 className="text-2xl font-bold text-amber-900">Тест завершен!</h2><p className="text-amber-700">Раздел: {currentSection.title}</p></div>
                            </div>
                            <div className="text-6xl mb-4">{percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '📚'}</div>
                            <div className="space-y-2">
                                <p className="text-amber-800">Ваш результат:</p>
                                <div className="flex items-center justify-center gap-2">
                                    <span className="text-3xl font-semibold text-amber-900">{score}</span>
                                    <span className="text-amber-700">из {questions.length}</span>
                                    <span className={`px-2 py-1 rounded-full text-sm ${percentage >= 80 ? 'bg-green-200 text-green-800' : percentage >= 60 ? 'bg-yellow-200 text-yellow-800' : 'bg-red-200 text-red-800'}`}>{percentage}%</span>
                                </div>
                            </div>
                            <p className="text-amber-700 mt-4">{percentage >= 80 ? 'Отличный результат! Вы хорошо знаете этот исторический период.' : percentage >= 60 ? 'Хороший результат! Рекомендуем повторить материал.' : 'Стоит изучить материал более внимательно и попробовать еще раз.'}</p>
                            <div className="space-y-3 mt-6">
                                {questions.map((question, index) => {
                                    const userAnswer = userAnswers[index];
                                    const isCorrect = checkAnswer(question, userAnswer);
                                    return (
                                        <div key={question.id} className="text-left p-4 border border-amber-200 rounded-lg bg-amber-50">
                                            <div className="flex items-start gap-3 mb-2">
                                                {isCorrect ? (<CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />) : (<XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />)}
                                                <div className="flex-1">
                                                    <p className="mb-2 font-medium text-black">{question.question}</p>
                                                    <p className="text-sm text-black">Ваш ответ: {formatUserAnswer(question, userAnswer)}</p>
                                                    {!isCorrect && (<p className="text-sm text-green-700 mt-1">Правильный ответ: {formatCorrectAnswer(question)}</p>)}
                                                    <p className="text-sm text-black mt-2">{question.explanation}</p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-6">
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <button onClick={restartQuiz} className="px-4 py-2 border border-amber-300 text-amber-800 rounded-md hover:bg-amber-200 flex items-center justify-center transition-colors"><RotateCcw className="w-4 h-4 mr-2" />Пройти еще раз</button>
                                    <button onClick={exitQuiz} className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors">Вернуться к разделу</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="min-h-screen bg-amber-50">
                <div className="container mx-auto px-4 py-8 max-w-4xl">
                    <div className="mb-6">
                        <button onClick={exitQuiz} className="mb-4 flex items-center text-amber-800 hover:text-amber-900"><ArrowLeft className="w-4 h-4 mr-2" />Выйти из теста</button>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between"><h2 className="text-xl font-semibold text-amber-900">Тест: {currentSection.title}</h2><span className="px-2 py-1 bg-amber-200 text-amber-800 rounded-md text-sm">Вопрос {currentQuestion + 1} из {questions.length}</span></div>
                            <div className="w-full bg-amber-200 rounded-full h-2"><div className="bg-amber-600 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div></div>
                        </div>
                    </div>
                    <div className="border border-amber-200 rounded-lg p-6 bg-amber-100">
                        <h3 className="text-xl font-semibold mb-6 text-amber-900">{currentQ.question}</h3>
                        {currentQ.type === 'single' && (<SingleChoiceQuestionComponent question={currentQ} selectedAnswer={selectedAnswer} onAnswerSelect={handleAnswerSelect}/>)}
                        {currentQ.type === 'multiple' && (<MultipleChoiceQuestionComponent question={currentQ} selectedAnswers={selectedAnswer} onAnswerSelect={handleAnswerSelect}/>)}
                        {currentQ.type === 'text' && (<TextAnswerQuestionComponent question={currentQ} answer={selectedAnswer} onAnswerChange={handleAnswerSelect}/>)}
                        {currentQ.type === 'matching' && (<MatchingQuestionComponent question={currentQ} matches={selectedAnswer} onMatchesChange={handleAnswerSelect}/>)}
                        <div className="flex justify-between pt-6">
                            <button onClick={() => prevQuestion(quiz)} disabled={currentQuestion === 0} className={`px-6 py-2 rounded-md transition-colors flex items-center gap-2 ${currentQuestion === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-amber-500 text-white hover:bg-amber-600'}`}><ArrowLeft className="w-4 h-4" />Назад</button>
                            <button onClick={() => nextQuestion(quiz)} disabled={!isAnswerReady()} className={`px-6 py-2 rounded-md transition-colors flex items-center gap-2 ${!isAnswerReady() ? 'bg-amber-300 text-amber-500 cursor-not-allowed' : 'bg-amber-600 text-white hover:bg-amber-700'}`}>{currentQuestion === questions.length - 1 ? 'Завершить тест' : 'Далее'}{currentQuestion < questions.length - 1 && <ArrowRight className="w-4 h-4" />}</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    if (currentTopic && currentSection) {
        return (
            <div className="min-h-screen bg-amber-50">
                <div className="container mx-auto px-4 py-8 max-w-4xl">
                    <div className="mb-6">
                        <button
                            onClick={goToSection}
                            className="w-full text-left p-3 rounded-md border border-amber-300 hover:bg-amber-200 text-amber-800 transition-colors flex items-start gap-2"
                        >
                            <ArrowLeft className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            <span className="flex-1 break-words">
                                Назад к разделу "{currentSection.title}"
                            </span>
                        </button>
                    </div>
                    <article className="bg-amber-100 border border-amber-200 rounded-lg shadow-lg p-6 select-text">
                        <div className="mb-6"><Image src={currentTopic.image} alt={currentTopic.title} width={800} height={400} className="w-full h-64 object-cover rounded-lg border-2 border-amber-300"/></div>
                        <div className="prose prose-lg max-w-none">
                            <h1 className="text-3xl font-bold mb-4 text-amber-900">{currentTopic.title}</h1>
                            <div className="text-black-800 leading-relaxed p-6 rounded-lg border border-amber-200 relative overflow-hidden text-lg" style={{ background: `url('/images/back.jpg') center/cover no-repeat`, backgroundAttachment: 'fixed', backgroundColor: 'rgba(253, 230, 200, 0.85)', backdropFilter: 'blur(2px)', }}>
                                <div className="relative z-10"><TopicContent topic={currentTopic} /></div>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        );
    }
    if (currentSection && isGlossaryMode) {
        const renderContent = () => {
            if (glossaryLoading) { return <div className="text-center text-amber-700 col-span-full">Загрузка глоссария...</div>; }
            if (glossaryError || !glossary) { return (<div className="col-span-full bg-red-100 border border-red-300 rounded-lg p-6 text-red-700 text-center"><h2 className="text-xl font-bold mb-2">Ошибка загрузки глоссария</h2><p>{glossaryError || 'Не удалось найти файл глоссария.'}</p><p className="text-sm mt-2">Файл: {currentSection.glossaryFile}</p></div>); }
            if (glossary.length === 0) { return <div className="text-center text-amber-700 col-span-full">В этом разделе пока нет терминов.</div>; }
            return glossary.map((term, index) => (<div key={index} className="border border-amber-200 rounded-lg p-6 bg-amber-100 hover:bg-amber-200 transition-colors"><h3 className="text-xl font-semibold flex items-center gap-3 mb-3 text-amber-900"><BookOpen className="w-5 h-5 text-amber-700" />{term.term}</h3><p className="text-black text-lg leading-relaxed">{term.definition}</p></div>));
        };
        return (
            <div className="min-h-screen bg-amber-50">
                <div className="container mx-auto px-4 py-8 max-w-6xl">
                    <div className="mb-8">
                        <button onClick={exitGlossary} className="mb-4 flex items-center text-amber-800 hover:text-amber-900"><ArrowLeft className="w-4 h-4 mr-2" />Назад к разделу</button>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-amber-200 rounded-lg"><Image src={currentSection.icon} alt={`${currentSection.title} icon`} width={32} height={32}/></div>
                            <div><h1 className="text-3xl font-bold mb-2 text-amber-900">Глоссарий: {currentSection.title}</h1><p className="text-amber-700">Словарь основных терминов и понятий</p></div>
                        </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">{renderContent()}</div>
                </div>
            </div>
        );
    }
    if (currentSection) {
        return (
            <div className="min-h-screen bg-amber-50">
                <div className="container mx-auto px-4 py-8 max-w-6xl">
                    <div className="mb-8">
                        <button onClick={goToHome} className="mb-4 flex items-center text-amber-800 hover:text-amber-900"><ArrowLeft className="w-4 h-4 mr-2" />Назад к разделам</button>
                        <div className="flex flex-col gap-6 mb-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-amber-200 rounded-lg"><Image src={currentSection.icon} alt={`${currentSection.title} icon`} width={32} height={32}/></div>
                                <div className="flex-1"><h1 className="text-3xl font-bold mb-2 text-amber-900">{currentSection.title}</h1><p className="text-amber-700">{currentSection.description}</p></div>
                            </div>
                            <div className="flex gap-3">
                                <button onClick={showGlossary} className="px-4 py-2 border border-amber-300 text-amber-800 rounded-md hover:bg-amber-200 flex items-center gap-2 transition-colors"><BookOpen className="w-5 h-5" />Глоссарий</button>
                                <button onClick={startQuiz} className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 flex items-center gap-2 transition-colors"><Brain className="w-5 h-5" />Пройти тест</button>
                            </div>
                        </div>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2">
                        {currentSection.topics.map((topic) => (
                            <div key={topic.id} className="cursor-pointer border border-amber-200 rounded-lg hover:shadow-lg transition-all duration-200 overflow-hidden bg-amber-100 hover:bg-amber-200" onClick={() => setCurrentTopic(topic)}>
                                <div className="aspect-video relative overflow-hidden">
                                    <Image src={topic.image} alt={topic.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300"/>
                                    <div className="absolute top-3 right-3 bg-white bg-opacity-90 p-2 rounded-full shadow-sm"><Book className="w-4 h-4 text-amber-600" /></div>
                                </div>
                                <div className="p-4"><h3 className="text-lg font-semibold text-gray-800  leading-tight">{topic.title}</h3></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // --- Главная страница с разделами ---
    const DownloadButton = () => {
        // Не рендерим кнопку, пока не определили окружение
        if (isTwa === null || isTwa === true) {
            return null;
        }

        // Если это мобильный браузер -> прямая ссылка на скачивание
        if (isMobile) {
            return (
                <a
                    href="/KubanHistory.apk" // ✅ Прямой путь к вашему файлу в /public
                    download  // Этот атрибут указывает браузеру скачать файл
                    className="flex items-center px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
                >
                    <QrCode className="w-5 h-5 mr-2" />
                    Скачать приложение
                </a>
            );
        }

        // Если это ПК браузер -> ссылка на страницу с QR-кодом
        return (
            <Link href="/download" className="flex items-center px-4 py-2 bg-amber-600 text-sm text-white rounded-md hover:bg-amber-700 transition-colors">
                <QrCode className="w-5 h-5 mr-2" />
                Скачать приложение
            </Link>
        );
    };

    return (
        <div className="min-h-screen bg-amber-50">
            <div className="bg-amber-100 py-4 px-4 border-b border-amber-200">
                <div className="container mx-auto flex justify-between items-center">
                    <Image
                        src="/images/kuban-history.png"
                        alt="История Кубани"
                        width={200}
                        height={50}
                        className="h-10 w-auto md:h-12" // Логотип высотой 40px (h-10) на мобильных и 48px (h-12) на десктопе
                        priority
                    />
                    {/* Используем компонент DownloadButton для десктопа */}
                    <div className="hidden sm:flex items-center">
                        <DownloadButton />
                    </div>
                    {/*Используем компонент DownloadButton для мобильных */}
                    <div className="sm:hidden flex items-center">
                        <DownloadButton />
                    </div>
                </div>
            </div>

            <div className="w-full">
                <Image src="/images/Rubo_Kazaki1.jpg" alt="История Кубани" width={1200} height={400} className="w-full h-auto object-cover" priority/>
            </div>

            <div className="container mx-auto px-4 py-8 max-w-6xl">



                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                    {sections.map((section) => (
                        <div key={section.id} className="cursor-pointer border border-amber-200 rounded-lg p-6 hover:shadow-lg transition-all duration-200 bg-amber-100 hover:bg-amber-200" onClick={() => setCurrentSection(section)}>
                            <div className="mb-4">
                                <div className="flex items-start gap-4"> {/* Изменено: items-center -> items-start */}
                                    <div className="p-3 bg-amber-200 rounded-lg flex-shrink-0"> {/* Добавлено: flex-shrink-0 */}
                                        <Image src={section.icon} alt={`${section.title} icon`} width={32} height={32}/>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-amber-900">{section.title}</h3>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className="text-amber-800 mb-4">{section.description}</p>
                                <div className="flex items-center justify-between text-sm text-amber-700">
                                    <span>{section.topics.length} {section.topics.length === 1 ? 'тема' : section.topics.length < 5 ? 'темы' : 'тем'}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}