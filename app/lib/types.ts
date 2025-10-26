export interface BaseQuestion {
    id: string;
    question: string;
    explanation: string;
    type: 'single' | 'multiple' | 'text' | 'matching';
}
export interface SingleChoiceQuestion extends BaseQuestion {
    type: 'single';
    options: string[];
    correctAnswer: number;
}
export interface MultipleChoiceQuestion extends BaseQuestion {
    type: 'multiple';
    options: string[];
    correctAnswers: number[];
}
export interface TextAnswerQuestion extends BaseQuestion {
    type: 'text';
    correctAnswer: string;
    caseSensitive?: boolean;
}
export interface MatchingQuestion extends BaseQuestion {
    type: 'matching';
    leftColumn: { id: number; text: string }[];
    rightColumn: { id: string; text: string }[];
    correctMatches: { leftId: number; rightId: string }[];
    leftTitle?: string;
    rightTitle?: string;
}
export type Question = SingleChoiceQuestion | MultipleChoiceQuestion | TextAnswerQuestion | MatchingQuestion;

export interface Quiz {
    questions: Question[];
}

export interface GlossaryTerm {
    term: string;
    definition: string;
}

export interface Topic {
    id: string;
    title: string;
    image: string;
    contentFile: string;
}

export interface Section {
    id: string;
    title: string;
    description: string;
    icon: string;
    topics: Topic[];
    quizFile: string;
    glossaryFile: string;
}