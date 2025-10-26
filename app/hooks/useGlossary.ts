import { useState, useEffect } from 'react';
import { GlossaryTerm } from '../lib/types';

export const useGlossary = (glossaryFile: string | null) => {
    const [glossary, setGlossary] = useState<GlossaryTerm[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!glossaryFile) {
            setGlossary(null);
            return;
        }

        const loadGlossary = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(glossaryFile);
                if (!response.ok) {
                    throw new Error(`Failed to load glossary: ${response.status}`);
                }
                const data: { glossary: GlossaryTerm[] } = await response.json();
                setGlossary(data.glossary);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
                setGlossary(null);
            } finally {
                setLoading(false);
            }
        };

        loadGlossary();
    }, [glossaryFile]);

    return { glossary, loading, error };
};