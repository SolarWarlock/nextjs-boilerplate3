'use client';

import { useState, useEffect } from 'react';

// Данные
import { sections } from 'app/lib/data';

// Хуки
import { useQuiz } from 'app/hooks/useQuiz';
import { useGlossary } from 'app/hooks/useGlossary';
import { useAppNavigation } from 'app/hooks/useAppNavigation';
import { useQuizState } from 'app/hooks/useQuizState';

// Компоненты View
import { HomeView } from 'app/components/views/HomeView';
import { SectionView } from 'app/components/views/SectionView';
import { TopicView } from 'app/components/views/TopicView';
import { GlossaryView } from 'app/components/views/GlossaryView';
import { QuizView } from 'app/components/views/QuizView';

export default function Home() {
    // --- Состояние окружения ---
    const [isTwa, setIsTwa] = useState<boolean | null>(null);
    const [isMobile, setIsMobile] = useState<boolean | null>(null);

    useEffect(() => {
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
        setIsTwa(isStandalone);

        const userAgent = typeof window.navigator === "undefined" ? "" : navigator.userAgent;
        const mobile = Boolean(userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i));
        setIsMobile(mobile);
    }, []);


    // --- Хуки ---

    // 1. Хук Навигации
    const {
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
    } = useAppNavigation();

    // 2. Хуки Данных
    const { quiz, loading: quizLoading, error: quizError } = useQuiz(
        currentSection && isQuizMode ? currentSection.quizFile : null
    );
    const { glossary, loading: glossaryLoading, error: glossaryError } = useGlossary(
        currentSection && isGlossaryMode ? currentSection.glossaryFile : null
    );

    // 3. Хук Состояния Теста
    const {
        currentQuestion,
        userAnswers,
        selectedAnswer,
        showResult,
        handleAnswerSelect,
        nextQuestion,
        prevQuestion,
        restartQuiz
    } = useQuizState(quiz); // данные теста передаются в хук состояния


    // --- Эффект для кнопки "Назад" ---
    useEffect(() => {
        const handleBack = () => {
            // Обработка навигации в зависимости от текущего состояния
            if (isQuizMode && currentSection) {
                if (showResult) {
                    exitQuiz();
                } else if (currentQuestion > 0) {
                    prevQuestion();
                } else {
                    exitQuiz();
                }
            } else if (isGlossaryMode && currentSection) {
                exitGlossary();
            } else if (currentTopic && currentSection) {
                goToSection();
            } else if (currentSection) {
                goToHome();
            } else {
                return false; // На главной странице - стандартное поведение
            }
            return true; // Предотвращение стандартное поведение
        };

        // Обработчик для браузера
        const handlePopState = (event: PopStateEvent) => {
            if (handleBack()) {
                event.preventDefault();
                window.history.pushState(null, '', window.location.href);
            }
        };

        // Обработчик для приложения
        const handleBackButton = (event: Event) => {
            if (handleBack()) {
                event.preventDefault();
            }
        };

        window.addEventListener('popstate', handlePopState);
        if (isTwa) {
            document.addEventListener('backbutton', handleBackButton, false);
        }
        window.history.pushState(null, '', window.location.href);

        // Очистка
        return () => {
            window.removeEventListener('popstate', handlePopState);
            if (isTwa) {
                document.removeEventListener('backbutton', handleBackButton, false);
            }
        };
    }, [
        // Зависимости для логики "Назад"
        currentSection, currentTopic, isQuizMode, isGlossaryMode,
        currentQuestion, showResult, isTwa,
        exitQuiz, prevQuestion, exitGlossary, goToSection, goToHome
    ]);


    // --- Логика отображения (Маршрутизация) ---

    // 1. Показ теста
    if (currentSection && isQuizMode) {
        return (
            <QuizView
                section={currentSection}
                quiz={quiz}
                loading={quizLoading}
                error={quizError}
                currentQuestion={currentQuestion}
                userAnswers={userAnswers}
                selectedAnswer={selectedAnswer}
                showResult={showResult}
                onExitQuiz={() => {
                    exitQuiz();
                    restartQuiz();
                }}
                onRestartQuiz={restartQuiz}
                onAnswerSelect={handleAnswerSelect}
                onNextQuestion={nextQuestion}
                onPrevQuestion={prevQuestion}
            />
        );
    }

    // 2. Показ темы (статьи)
    if (currentTopic && currentSection) {
        return (
            <TopicView
                section={currentSection}
                topic={currentTopic}
                onGoToSection={goToSection}
            />
        );
    }

    // 3. Показ глоссария
    if (currentSection && isGlossaryMode) {
        return (
            <GlossaryView
                section={currentSection}
                glossary={glossary}
                loading={glossaryLoading}
                error={glossaryError}
                onExitGlossary={exitGlossary}
            />
        );
    }

    // 4. Показ раздела (списка тем)
    if (currentSection) {
        return (
            <SectionView
                section={currentSection}
                onGoToHome={goToHome}
                onShowGlossary={showGlossary}
                onStartQuiz={() => {
                    startQuiz();
                    // Сброс состояния теста на случай, если он был пройден
                    restartQuiz();
                }}
                onSelectTopic={selectTopic}
            />
        );
    }

    // 5. Показ главной страницы (Списка разделов)
    return (
        <HomeView
            sections={sections}
            onSelectSection={selectSection}
            isTwa={isTwa}
            isMobile={isMobile}
        />
    );
}