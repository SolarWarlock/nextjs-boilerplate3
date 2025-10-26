'use client';
import { useState, useEffect } from 'react';
import { Quiz, Question } from 'app/lib/types';
import { getInitialAnswerState } from 'app/lib/quizUtils';

// Этот хук будет управлять состоянием *во время* прохождения теста
export const useQuizState = (quiz: Quiz | null) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswers, setUserAnswers] = useState<any[]>([]);
    const [selectedAnswer, setSelectedAnswer] = useState<any>(null);
    const [showResult, setShowResult] = useState(false);
    const [quizCompleted, setQuizCompleted] = useState(false);

    const handleAnswerSelect = (answer: any) => {
        setSelectedAnswer(answer);
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setUserAnswers([]);
        setSelectedAnswer(getInitialAnswerState(quiz?.questions[0] || null));
        setShowResult(false);
        setQuizCompleted(false);
    };

    // Сбрасываем состояние, если пользователь начал *другой* тест
    // (т.е. если сам объект 'quiz' изменился)
    useEffect(() => {
        resetQuiz();
    }, [quiz]);

    const nextQuestion = () => {
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

    const prevQuestion = () => {
        if (currentQuestion > 0 && quiz) {
            const newAnswers = [...userAnswers];
            newAnswers[currentQuestion] = selectedAnswer;
            setUserAnswers(newAnswers);

            setCurrentQuestion(currentQuestion - 1);
            setSelectedAnswer(newAnswers[currentQuestion - 1] || getInitialAnswerState(quiz.questions[currentQuestion - 1]));
        }
    };

    return {
        currentQuestion,
        userAnswers,
        selectedAnswer,
        showResult,
        quizCompleted,
        handleAnswerSelect,
        nextQuestion,
        prevQuestion,
        restartQuiz: resetQuiz
    };
};