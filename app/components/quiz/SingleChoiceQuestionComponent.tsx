import React from 'react';
import { SingleChoiceQuestion } from '../../lib/types';

export const SingleChoiceQuestionComponent: React.FC<{
    question: SingleChoiceQuestion;
    selectedAnswer: number | null;
    onAnswerSelect: (answer: number) => void;
}> = ({ question, selectedAnswer, onAnswerSelect }) => {
    return (
        <div className="space-y-3">
            {question.options.map((option, index) => (
                <button
                    key={index}
                    className={`w-full text-left p-4 rounded-md border transition-all ${
                        selectedAnswer === index
                            ? 'border-amber-600 bg-amber-200 text-black'
                            : 'border-amber-300 hover:border-amber-400 hover:bg-amber-200 text-black'
                    }`}
                    onClick={() => onAnswerSelect(index)}
                >
                    <span className="font-semibold mr-3">{String.fromCharCode(65 + index)}.</span>{option}
                </button>
            ))}
        </div>
    );
};