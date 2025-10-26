'use client';
import { useState, useEffect } from 'react';
import { Section, Topic } from 'app/lib/types';

// Этот хук теперь управляет *только* навигацией по приложению
export const useAppNavigation = () => {
    const [currentSection, setCurrentSection] = useState<Section | null>(null);
    const [currentTopic, setCurrentTopic] = useState<Topic | null>(null);
    const [isQuizMode, setIsQuizMode] = useState(false);
    const [isGlossaryMode, setIsGlossaryMode] = useState(false);

    // Сброс прокрутки
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentSection, currentTopic, isQuizMode, isGlossaryMode]);

    const goToHome = () => {
        setCurrentSection(null);
        setCurrentTopic(null);
        setIsQuizMode(false);
        setIsGlossaryMode(false);
    };

    const goToSection = () => {
        setCurrentTopic(null);
        setIsQuizMode(false);
        setIsGlossaryMode(false);
    };

    const startQuiz = () => {
        setIsQuizMode(true);
        setIsGlossaryMode(false);
    };

    const exitQuiz = () => {
        setIsQuizMode(false);
        // Сброс состояния теста будет в useQuizState
    };

    const showGlossary = () => {
        setIsGlossaryMode(true);
        setIsQuizMode(false);
    };

    const exitGlossary = () => {
        setIsGlossaryMode(false);
    };

    const selectSection = (section: Section) => {
        setCurrentSection(section);
    };

    const selectTopic = (topic: Topic) => {
        setCurrentTopic(topic);
    };

    return {
        currentSection,
        currentTopic,
        isQuizMode,
        isGlossaryMode,
        goToHome,
        goToSection,
        startQuiz,
        exitQuiz,
        showGlossary,
        exitGlossary,
        selectSection,
        selectTopic
    };
};