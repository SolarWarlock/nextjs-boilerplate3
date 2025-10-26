import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Section } from '../../lib/types';
import { QrCode } from '../icons';

interface HomeViewProps {
    sections: Section[];
    onSelectSection: (section: Section) => void;
    isTwa: boolean | null;
    isMobile: boolean | null;
}

export const HomeView: React.FC<HomeViewProps> = ({ sections, onSelectSection, isTwa, isMobile }) => {

    // Вложенный компонент кнопки, т.к. он используется только здесь
    const DownloadButton = () => {
        // Иконнка не рендерится, пока не определено окружение
        if (isTwa === null || isTwa === true) {
            return null;
        }

        // Если заходят с мобильного браузера -> прямая ссылка на скачивание
        if (isMobile) {
            return (
                <a
                    href="/KubanHistory.apk" //  Прямой путь к файлу в /public
                    download  // Этот атрибут указывает браузеру скачать файл
                    className="flex items-center px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
                >
                    <QrCode className="w-5 h-5 mr-2" />
                    Скачать приложение
                </a>
            );
        }

        // Если заходят с ПК браузера -> ссылка на страницу с QR-кодом
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
                        className="h-10 w-auto md:h-12"
                        priority
                    />

                    <div className="hidden sm:flex items-center">
                        <DownloadButton />
                    </div>

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
                        <div key={section.id} className="cursor-pointer border border-amber-200 rounded-lg p-6 hover:shadow-lg transition-all duration-200 bg-amber-100 hover:bg-amber-200" onClick={() => onSelectSection(section)}>
                            <div className="mb-4">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-amber-200 rounded-lg flex-shrink-0">
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
            <div className="mt-12 pb-6 px-4">
                <div className="container mx-auto">
                    <div className="text-center md:text-right">
                        <p className="text-amber-600 text-sm">
                            Емтыль З. Я.
                        </p>
                        <p className="text-amber-600 text-sm">
                            Хотина Ю.В.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};