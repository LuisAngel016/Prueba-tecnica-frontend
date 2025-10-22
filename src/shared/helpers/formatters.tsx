import type { JSX } from 'react/jsx-runtime';
import { FileText, TrendingUp, Target, Lightbulb, BarChart3 } from 'lucide-react';

export const removeSurroundingAsterisks = (text: string) => {
    // Remueve ** al inicio y fin si existen
    if (!text) return text;
    return text.replace(/\*\*(.*?)\*\*/g, '$1');
};

export const formatInlineText = (text: string) => {
    const parts: JSX.Element[] = [];
    let remaining = text;
    let key = 0;

    while (remaining.length > 0) {
        const boldMatch = remaining.match(/\*\*([^*]+?)\*\*(:?)/);
        if (boldMatch) {
            const matchIndex = typeof boldMatch.index === 'number' ? boldMatch.index : remaining.indexOf(boldMatch[0]);
            const before = remaining.substring(0, matchIndex);
            if (before) parts.push(<span key={key++}>{before}</span>);

            parts.push(
                <span key={key++} className="font-semibold text-gray-900 dark:text-white">
                    {boldMatch[1]}{boldMatch[2]}
                </span>
            );
            remaining = remaining.substring(matchIndex + boldMatch[0].length);
        } else {
            parts.push(<span key={key++}>{remaining}</span>);
            break;
        }
    }

    return parts.length > 1 ? parts : text;
};

export const getIconForSection = (text: string) => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('temas') || lowerText.includes('principales')) {
        return <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />;
    }
    if (lowerText.includes('patron') || lowerText.includes('común')) {
        return <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
    }
    if (lowerText.includes('área') || lowerText.includes('enfoque')) {
        return <Target className="h-5 w-5 text-green-600 dark:text-green-400" />;
    }
    if (lowerText.includes('recomendacion')) {
        return <Lightbulb className="h-5 w-5 text-amber-600 dark:text-amber-400" />;
    }
    return <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />;
};
