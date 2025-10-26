import React from 'react';
import Image from 'next/image';
import { Section, Topic } from '../../lib/types';
import { useTopicContent } from '../../hooks/useTopicContent';
import { FormattedText } from '../content/FormattedText';
import { ArrowLeft } from '../icons';


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


interface TopicViewProps {
    section: Section;
    topic: Topic;
    onGoToSection: () => void;
}

export const TopicView: React.FC<TopicViewProps> = ({ section, topic, onGoToSection }) => {
    return (
        <div className="min-h-screen bg-amber-50">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="mb-6">
                    <button
                        onClick={onGoToSection}
                        className="w-full text-left p-3 rounded-md border border-amber-300 hover:bg-amber-200 text-amber-800 transition-colors flex items-start gap-2"
                    >
                        <ArrowLeft className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span className="flex-1 break-words">
                            Назад к разделу "{section.title}"
                        </span>
                    </button>
                </div>
                <article className="bg-amber-100 border border-amber-200 rounded-lg shadow-lg p-6 select-text">
                    <div className="mb-6">
                        <Image src={topic.image} alt={topic.title} width={800} height={400} className="w-full h-64 object-cover rounded-lg border-2 border-amber-300"/>
                    </div>
                    <div className="prose prose-lg max-w-none">
                        <h1 className="text-3xl font-bold mb-4 text-amber-900">{topic.title}</h1>
                        <div className="text-black-800 leading-relaxed p-6 rounded-lg border border-amber-200 relative overflow-hidden text-lg" style={{ background: `url('/images/back.jpg') center/cover no-repeat`, backgroundAttachment: 'fixed', backgroundColor: 'rgba(253, 230, 200, 0.85)', backdropFilter: 'blur(2px)', }}>
                            <div className="relative z-10">
                                <TopicContent topic={topic} />
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
};