import React from 'react';
import Image from 'next/image';
import { Section, GlossaryTerm } from '../../lib/types';
import { ArrowLeft, BookOpen } from '../icons';

interface GlossaryViewProps {
    section: Section;
    glossary: GlossaryTerm[] | null;
    loading: boolean;
    error: string | null;
    onExitGlossary: () => void;
}

export const GlossaryView: React.FC<GlossaryViewProps> = ({
                                                              section,
                                                              glossary,
                                                              loading,
                                                              error,
                                                              onExitGlossary
                                                          }) => {

    const renderContent = () => {
        if (loading) {
            return <div className="text-center text-amber-700 col-span-full">Загрузка глоссария...</div>;
        }
        if (error || !glossary) {
            return (
                <div className="col-span-full bg-red-100 border border-red-300 rounded-lg p-6 text-red-700 text-center">
                    <h2 className="text-xl font-bold mb-2">Ошибка загрузки глоссария</h2>
                    <p>{error || 'Не удалось найти файл глоссария.'}</p>
                    <p className="text-sm mt-2">Файл: {section.glossaryFile}</p>
                </div>
            );
        }
        if (glossary.length === 0) {
            return <div className="text-center text-amber-700 col-span-full">В этом разделе пока нет терминов.</div>;
        }

        return glossary.map((term, index) => (
            <div key={index} className="border border-amber-200 rounded-lg p-6 bg-amber-100 hover:bg-amber-200 transition-colors">
                <h3 className="text-xl font-semibold flex items-center gap-3 mb-3 text-amber-900">
                    <BookOpen className="w-5 h-5 text-amber-700" />
                    {term.term}
                </h3>
                <p className="text-black text-lg leading-relaxed">{term.definition}</p>
            </div>
        ));
    };

    return (
        <div className="min-h-screen bg-amber-50">
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <div className="mb-8">
                    <button onClick={onExitGlossary} className="mb-4 flex items-center text-amber-800 hover:text-amber-900">
                        <ArrowLeft className="w-4 h-4 mr-2" />Назад к разделу
                    </button>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-amber-200 rounded-lg">
                            <Image src={section.icon} alt={`${section.title} icon`} width={32} height={32}/>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold mb-2 text-amber-900">Глоссарий: {section.title}</h1>
                            <p className="text-amber-700">Словарь основных терминов и понятий</p>
                        </div>
                    </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};