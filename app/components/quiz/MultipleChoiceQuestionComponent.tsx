import React from 'react';
import { MultipleChoiceQuestion } from '../../lib/types';

export const MultipleChoiceQuestionComponent: React.FC<{
    question: MultipleChoiceQuestion;
    selectedAnswers: number[];
    onAnswerSelect: (answers: number[]) => void;
}> = ({ question, selectedAnswers, onAnswerSelect }) => {

    const toggleAnswer = (index: number) => {
        const newAnswers = selectedAnswers.includes(index)
            ? selectedAnswers.filter(i => i !== index)
            : [...selectedAnswers, index];
        onAnswerSelect(newAnswers);
    };

    return (
        <div className="space-y-3">
            {question.options.map((option, index) => (
                <button
                    key={index}
                    className={`w-full text-left p-4 rounded-md border transition-all ${
                        selectedAnswers.includes(index)
                            ? 'border-amber-600 bg-amber-200 text-black'
                            : 'border-amber-300 hover:border-amber-400 hover:bg-amber-200 text-black'
                    }`}
                    onClick={() => toggleAnswer(index)}
                >
                    <span className="font-semibold mr-3">{String.fromCharCode(65 + index)}.</span>{option}
                </button>
            ))}
        </div>
    );
};