import React from 'react';
import Image from 'next/image';
import { Section, Topic } from '../../lib/types';
import { ArrowLeft, Book, BookOpen, Brain } from '../icons';

interface SectionViewProps {
    section: Section;
    onGoToHome: () => void;
    onShowGlossary: () => void;
    onStartQuiz: () => void;
    onSelectTopic: (topic: Topic) => void;
}

export const SectionView: React.FC<SectionViewProps> = ({
                                                            section,
                                                            onGoToHome,
                                                            onShowGlossary,
                                                            onStartQuiz,
                                                            onSelectTopic
                                                        }) => {
    return (
        <div className="min-h-screen bg-amber-50">
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <div className="mb-8">
                    <button onClick={onGoToHome} className="mb-4 flex items-center text-amber-800 hover:text-amber-900">
                        <ArrowLeft className="w-4 h-4 mr-2" />Назад к разделам
                    </button>
                    <div className="flex flex-col gap-6 mb-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-amber-200 rounded-lg">
                                <Image src={section.icon} alt={`${section.title} icon`} width={32} height={32}/>
                            </div>
                            <div className="flex-1">
                                <h1 className="text-3xl font-bold mb-2 text-amber-900">{section.title}</h1>
                                <p className="text-amber-700">{section.description}</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={onShowGlossary} className="px-4 py-2 border border-amber-300 text-amber-800 rounded-md hover:bg-amber-200 flex items-center gap-2 transition-colors">
                                <BookOpen className="w-5 h-5" />Глоссарий
                            </button>
                            <button onClick={onStartQuiz} className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 flex items-center gap-2 transition-colors">
                                <Brain className="w-5 h-5" />Пройти тест
                            </button>
                        </div>
                    </div>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                    {section.topics.map((topic) => (
                        <div
                            key={topic.id}
                            className="cursor-pointer border border-amber-200 rounded-lg hover:shadow-lg transition-all duration-200 overflow-hidden bg-amber-100 hover:bg-amber-200"
                            onClick={() => onSelectTopic(topic)}
                        >
                            <div className="aspect-video relative overflow-hidden">
                                <Image src={topic.image} alt={topic.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300"/>
                                <div className="absolute top-3 right-3 bg-white bg-opacity-90 p-2 rounded-full shadow-sm">
                                    <Book className="w-4 h-4 text-amber-600" />
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-800  leading-tight">{topic.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};