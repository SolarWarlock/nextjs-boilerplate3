import { useState, useEffect } from 'react';

export const useTopicContent = (contentFile: string | null) => {
    const [content, setContent] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!contentFile) {
            setContent('');
            return;
        }

        const loadContent = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(contentFile);
                if (!response.ok) {
                    throw new Error(`Failed to load content: ${response.status}`);
                }
                const text = await response.text();
                setContent(text);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
                setContent('');
            } finally {
                setLoading(false);
            }
        };

        loadContent();
    }, [contentFile]);

    return { content, loading, error };
};