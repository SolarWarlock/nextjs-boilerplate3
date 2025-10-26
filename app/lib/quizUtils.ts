import { Question, SingleChoiceQuestion, MultipleChoiceQuestion, TextAnswerQuestion, MatchingQuestion } from './types';

export const checkAnswer = (question: Question, userAnswer: any): boolean => {
    switch (question.type) {
        case 'single': return userAnswer === (question as SingleChoiceQuestion).correctAnswer;
        case 'multiple': return JSON.stringify([...(userAnswer || [])].sort()) === JSON.stringify([...(question as MultipleChoiceQuestion).correctAnswers].sort());
        case 'text': const textQuestion = question as TextAnswerQuestion; if (textQuestion.caseSensitive) { return (userAnswer || '').trim() === textQuestion.correctAnswer; } return (userAnswer || '').trim().toLowerCase() === textQuestion.correctAnswer.toLowerCase();
        case 'matching': return JSON.stringify([...(userAnswer || [])].sort((a: any, b: any) => a.leftId - b.leftId)) === JSON.stringify([...(question as MatchingQuestion).correctMatches].sort((a: any, b: any) => a.leftId - b.leftId));
        default: return false;
    }
};

export const getInitialAnswerState = (question: Question | null) => {
    if (!question) return null;
    switch (question.type) {
        case 'single': return null;
        case 'multiple': return [];
        case 'text': return '';
        case 'matching': return [];
        default: return null;
    }
};