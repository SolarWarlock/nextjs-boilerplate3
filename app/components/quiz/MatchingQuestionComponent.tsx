import React from 'react';
import { MatchingQuestion } from '../../lib/types';

export const MatchingQuestionComponent: React.FC<{
    question: MatchingQuestion;
    matches: { leftId: number; rightId: string }[];
    onMatchesChange: (matches: { leftId: number; rightId: string }[]) => void;
}> = ({ question, matches, onMatchesChange }) => {

    const getMatchForLeft = (leftId: number) => {
        return matches.find(match => match.leftId === leftId)?.rightId || '';
    };

    const handleMatchChange = (leftId: number, rightId: string) => {
        const newMatches = matches.filter(match => match.leftId !== leftId);
        if (rightId) {
            newMatches.push({ leftId, rightId });
        }
        onMatchesChange(newMatches);
    };

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <h4 className="font-semibold text-amber-900 mb-2">{question.leftTitle || 'Левый столбец'}</h4>
                    <div className="space-y-2">
                        {question.leftColumn.map((item) => (
                            <div key={item.id} className="p-3 bg-amber-100 rounded border border-amber-200 text-black">
                                {item.id}. {item.text}
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h4 className="font-semibold text-amber-900 mb-2">{question.rightTitle || 'Правый столбец'}</h4>
                    <div className="space-y-2">
                        {question.rightColumn.map((item) => (
                            <div key={item.id} className="p-3 bg-amber-100 rounded border border-amber-200 text-black">
                                {item.id}. {item.text}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="space-y-3">
                <h4 className="font-semibold text-amber-900">Установите соответствие:</h4>
                {question.leftColumn.map((leftItem) => (
                    <div key={leftItem.id} className="flex items-center gap-3">
                        <span className="font-medium w-8">{leftItem.id}.</span>
                        <span className="flex-1">{leftItem.text}</span>
                        <select
                            value={getMatchForLeft(leftItem.id)}
                            onChange={(e) => handleMatchChange(leftItem.id, e.target.value)}
                            className="p-2 border border-amber-300 rounded"
                        >
                            <option value="">...</option>
                            {question.rightColumn.map((rightItem) => (
                                <option key={rightItem.id} value={rightItem.id}>{rightItem.id}</option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>
            <div className="text-sm text-amber-600">
                Введите ответ в формате: {question.leftColumn.map(item => item.id).join('')} → {question.rightColumn.map(item => item.id).join('')}
            </div>
        </div>
    );
};