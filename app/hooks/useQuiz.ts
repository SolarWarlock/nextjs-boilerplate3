import { useState, useEffect } from 'react';
import { Quiz } from '../lib/types';

export const useQuiz = (quizFile: string | null) => {
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!quizFile) {
            setQuiz(null);
            return;
        }

        const loadQuiz = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(quizFile);
                if (!response.ok) {
                    throw new Error(`Failed to load quiz: ${response.status}`);
                }
                const data: Quiz = await response.json();
                setQuiz(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
                setQuiz(null);
            } finally {
                setLoading(false);
            }
        };

        loadQuiz();
    }, [quizFile]);

    return { quiz, loading, error };
};