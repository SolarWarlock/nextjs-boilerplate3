import React from 'react';
import Image from 'next/image';
import { Section, Quiz, Question, SingleChoiceQuestion, MultipleChoiceQuestion, TextAnswerQuestion, MatchingQuestion } from '../../lib/types';
import { checkAnswer } from '../../lib/quizUtils';
import { ArrowLeft, ArrowRight, CheckCircle, RotateCcw, XCircle } from '../icons';
import { SingleChoiceQuestionComponent } from '../quiz/SingleChoiceQuestionComponent';
import { MultipleChoiceQuestionComponent } from '../quiz/MultipleChoiceQuestionComponent';
import { TextAnswerQuestionComponent } from '../quiz/TextAnswerQuestionComponent';
import { MatchingQuestionComponent } from '../quiz/MatchingQuestionComponent';

interface QuizViewProps {
    section: Section;
    quiz: Quiz | null;
    loading: boolean;
    error: string | null;
    currentQuestion: number;
    userAnswers: any[];
    selectedAnswer: any;
    showResult: boolean;
    onExitQuiz: () => void;
    onRestartQuiz: () => void;
    onAnswerSelect: (answer: any) => void;
    onNextQuestion: () => void;
    onPrevQuestion: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
                                                      section,
                                                      quiz,
                                                      loading,
                                                      error,
                                                      currentQuestion,
                                                      userAnswers,
                                                      selectedAnswer,
                                                      showResult,
                                                      onExitQuiz,
                                                      onRestartQuiz,
                                                      onAnswerSelect,
                                                      onNextQuestion,
                                                      onPrevQuestion
                                                  }) => {

    // Вспомогательные функции

    const calculateScore = (quizData: Quiz) => {
        let correct = 0;
        userAnswers.forEach((answer, index) => {
            if (checkAnswer(quizData.questions[index], answer)) {
                correct++;
            }
        });
        return correct;
    };

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

    // --- Логика рендеринга ---

    if (loading) {
        return <div className="min-h-screen bg-amber-50 flex justify-center items-center"><div className="text-amber-700">Загрузка теста...</div></div>;
    }

    if (error || !quiz) {
        return (
            <div className="min-h-screen bg-amber-50 flex justify-center items-center">
                <div className="bg-red-100 border border-red-300 rounded-lg p-6 text-red-700 max-w-md text-center">
                    <h2 className="text-xl font-bold mb-2">Ошибка загрузки теста</h2>
                    <p>{error || 'Не удалось найти файл теста.'}</p>
                    <p className="text-sm mt-2">Файл: {section.quizFile}</p>
                    <button onClick={onExitQuiz} className="mt-4 px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700">Назад к разделу</button>
                </div>
            </div>
        );
    }

    const questions = quiz.questions;
    const currentQ = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    const isAnswerReady = () => {
        if (selectedAnswer === null || selectedAnswer === undefined) return false;
        if (currentQ.type === 'multiple' && selectedAnswer.length === 0) return false;
        if (currentQ.type === 'text' && selectedAnswer.trim() === '') return false;
        if (currentQ.type === 'matching' && selectedAnswer.length !== (currentQ as MatchingQuestion).leftColumn.length) return false;
        return true;
    };


    if (showResult) {
        const score = calculateScore(quiz);
        const percentage = Math.round((score / questions.length) * 100);
        return (
            <div className="min-h-screen bg-amber-50">
                <div className="container mx-auto px-4 py-8 max-w-4xl">
                    <div className="mb-6">
                        <button onClick={onExitQuiz} className="mb-4 flex items-center text-amber-800 hover:text-amber-900">
                            <ArrowLeft className="w-4 h-4 mr-2" />Назад к разделу
                        </button>
                    </div>
                    <div className="border border-amber-200 rounded-lg p-6 bg-amber-100 text-center">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <div className="p-3 bg-amber-200 rounded-lg">
                                <Image src={section.icon} alt={`${section.title} icon`} width={32} height={32}/>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-amber-900">Тест завершен!</h2>
                                <p className="text-amber-700">Раздел: {section.title}</p>
                            </div>
                        </div>
                        <div className="text-6xl mb-4">{percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '📚'}</div>
                        <div className="space-y-2">
                            <p className="text-amber-800">Ваш результат:</p>
                            <div className="flex items-center justify-center gap-2">
                                <span className="text-3xl font-semibold text-amber-900">{score}</span>
                                <span className="text-amber-700">из {questions.length}</span>
                                <span className={`px-2 py-1 rounded-full text-sm ${percentage >= 80 ? 'bg-green-200 text-green-800' : percentage >= 60 ? 'bg-yellow-200 text-yellow-800' : 'bg-red-200 text-red-800'}`}>
                                    {percentage}%
                                </span>
                            </div>
                        </div>
                        <p className="text-amber-700 mt-4">
                            {percentage >= 80 ? 'Отличный результат! Вы хорошо знаете этот исторический период.' : percentage >= 60 ? 'Хороший результат! Рекомендуем повторить материал.' : 'Стоит изучить материал более внимательно и попробовать еще раз.'}
                        </p>
                        <div className="space-y-3 mt-6">
                            {questions.map((question, index) => {
                                const userAnswer = userAnswers[index];
                                const isCorrect = checkAnswer(question, userAnswer);
                                return (
                                    <div key={question.id} className="text-left p-4 border border-amber-200 rounded-lg bg-amber-50">
                                        <div className="flex items-start gap-3 mb-2">
                                            {isCorrect ? (
                                                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                            ) : (
                                                <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                                            )}
                                            <div className="flex-1">
                                                <p className="mb-2 font-medium text-black">{question.question}</p>
                                                <p className="text-sm text-black">Ваш ответ: {formatUserAnswer(question, userAnswer)}</p>
                                                {!isCorrect && (
                                                    <p className="text-sm text-green-700 mt-1">Правильный ответ: {formatCorrectAnswer(question)}</p>
                                                )}
                                                <p className="text-sm text-black mt-2">{question.explanation}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-6">
                            <div className="flex flex-col sm:flex-row gap-3">
                                <button onClick={onRestartQuiz} className="px-4 py-2 border border-amber-300 text-amber-800 rounded-md hover:bg-amber-200 flex items-center justify-center transition-colors">
                                    <RotateCcw className="w-4 h-4 mr-2" />Пройти еще раз
                                </button>
                                <button onClick={onExitQuiz} className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors">
                                    Вернуться к разделу
                                </button>
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
                    <button onClick={onExitQuiz} className="mb-4 flex items-center text-amber-800 hover:text-amber-900">
                        <ArrowLeft className="w-4 h-4 mr-2" />Выйти из теста
                    </button>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-amber-900">Тест: {section.title}</h2>
                            <span className="px-2 py-1 bg-amber-200 text-amber-800 rounded-md text-sm">
                                Вопрос {currentQuestion + 1} из {questions.length}
                            </span>
                        </div>
                        <div className="w-full bg-amber-200 rounded-full h-2">
                            <div className="bg-amber-600 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                        </div>
                    </div>
                </div>
                <div className="border border-amber-200 rounded-lg p-6 bg-amber-100">
                    <h3 className="text-xl font-semibold mb-6 text-amber-900">{currentQ.question}</h3>

                    {currentQ.type === 'single' && (
                        <SingleChoiceQuestionComponent
                            question={currentQ}
                            selectedAnswer={selectedAnswer}
                            onAnswerSelect={onAnswerSelect}
                        />
                    )}
                    {currentQ.type === 'multiple' && (
                        <MultipleChoiceQuestionComponent
                            question={currentQ}
                            selectedAnswers={selectedAnswer}
                            onAnswerSelect={onAnswerSelect}
                        />
                    )}
                    {currentQ.type === 'text' && (
                        <TextAnswerQuestionComponent
                            question={currentQ}
                            answer={selectedAnswer}
                            onAnswerChange={onAnswerSelect}
                        />
                    )}
                    {currentQ.type === 'matching' && (
                        <MatchingQuestionComponent
                            question={currentQ}
                            matches={selectedAnswer}
                            onMatchesChange={onAnswerSelect}
                        />
                    )}

                    <div className="flex justify-between pt-6">
                        <button
                            onClick={onPrevQuestion}
                            disabled={currentQuestion === 0}
                            className={`px-6 py-2 rounded-md transition-colors flex items-center gap-2 ${
                                currentQuestion === 0
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-amber-500 text-white hover:bg-amber-600'
                            }`}
                        >
                            <ArrowLeft className="w-4 h-4" />Назад
                        </button>
                        <button
                            onClick={onNextQuestion}
                            disabled={!isAnswerReady()}
                            className={`px-6 py-2 rounded-md transition-colors flex items-center gap-2 ${
                                !isAnswerReady()
                                    ? 'bg-amber-300 text-amber-500 cursor-not-allowed'
                                    : 'bg-amber-600 text-white hover:bg-amber-700'
                            }`}
                        >
                            {currentQuestion === questions.length - 1 ? 'Завершить тест' : 'Далее'}
                            {currentQuestion < questions.length - 1 && <ArrowRight className="w-4 h-4" />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};