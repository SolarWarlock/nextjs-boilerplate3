'use client';

import { useState, useEffect } from 'react';

// Данные (используем @/ alias)
import { sections } from '@/lib/data';

// Хуки (используем @/ alias)
import { useQuiz } from '@/hooks/useQuiz';
import { useGlossary } from '@/hooks/useGlossary';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useQuizState } from '@/hooks/useQuizState';

// Компоненты View (используем @/ alias)
import { HomeView } from '@/components/views/HomeView';
import { SectionView } from '@/components/views/SectionView';
import { TopicView } from '@/components/views/TopicView';
import { GlossaryView } from '@/components/views/GlossaryView';
import { QuizView } from '@/components/views/QuizView';

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

    // 1. Хук Навигации (теперь простой)
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

    // 2. Хуки Данных (зависят от хука навигации)
    const { quiz, loading: quizLoading, error: quizError } = useQuiz(
        currentSection && isQuizMode ? currentSection.quizFile : null
    );
    const { glossary, loading: glossaryLoading, error: glossaryError } = useGlossary(
        currentSection && isGlossaryMode ? currentSection.glossaryFile : null
    );

    // 3. Хук Состояния Теста (зависит от хука данных)
    const {
        currentQuestion,
        userAnswers,
        selectedAnswer,
        showResult,
        handleAnswerSelect,
        nextQuestion,
        prevQuestion,
        restartQuiz
    } = useQuizState(quiz); // Передаем данные теста в хук состояния


    // --- Эффект для кнопки "Назад" ---
    // (Теперь он живет здесь, т.к. page.tsx знает обо всех состояниях)
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

    // 1. Показываем Тест
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
                    // Также сбрасываем состояние теста при выходе
                    restartQuiz();
                }}
                onRestartQuiz={restartQuiz}
                onAnswerSelect={handleAnswerSelect}
                onNextQuestion={nextQuestion}
                onPrevQuestion={prevQuestion}
            />
        );
    }

    // 2. Показываем Тему (Статью)
    if (currentTopic && currentSection) {
        return (
            <TopicView
                section={currentSection}
                topic={currentTopic}
                onGoToSection={goToSection}
            />
        );
    }

    // 3. Показываем Глоссарий
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

    // 4. Показываем Раздел (Список тем)
    if (currentSection) {
        return (
            <SectionView
                section={currentSection}
                onGoToHome={goToHome}
                onShowGlossary={showGlossary}
                onStartQuiz={() => {
                    startQuiz();
                    // Сбрасываем состояние теста на случай, если он был пройден
                    restartQuiz();
                }}
                onSelectTopic={selectTopic}
            />
        );
    }

    // 5. Показываем Главную страницу (Список разделов)
    return (
        <HomeView
            sections={sections}
            onSelectSection={selectSection}
            isTwa={isTwa}
            isMobile={isMobile}
        />
    );
}