import React from 'react';
import { TextAnswerQuestion } from '../../lib/types';

export const TextAnswerQuestionComponent: React.FC<{
    question: TextAnswerQuestion;
    answer: string;
    onAnswerChange: (answer: string) => void;
}> = ({ question, answer, onAnswerChange }) => {
    return (
        <div className="space-y-3">
            <input
                type="text"
                value={answer}
                onChange={(e) => onAnswerChange(e.target.value)}
                className="w-full p-4 border border-amber-300 rounded-md focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-black text-lg"
                placeholder="Введите ваш ответ..."
            />
            {!question.caseSensitive && (
                <p className="text-sm text-amber-600">Регистр букв не учитывается</p>
            )}
        </div>
    );
};