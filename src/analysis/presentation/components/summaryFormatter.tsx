import type { JSX } from 'react/jsx-runtime';
import { removeSurroundingAsterisks, formatInlineText, getIconForSection } from '@/shared/helpers/formatters';

export const formatSummary = (text: string) => {
    const lines = text.split('\n');
    const elements: JSX.Element[] = [];
    let currentList: (string | JSX.Element[])[] = [];

    const flushList = () => {
        if (currentList.length > 0) {
            elements.push(
                <ul key={`list-${elements.length}`} className="space-y-3 my-4 ml-6">
                    {currentList.map((item, idx) => (
                        <li key={idx} className="relative pl-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                            <span className="absolute left-0 top-2 w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                            {item}
                        </li>
                    ))}
                </ul>
            );
            currentList = [];
        }
    };

    lines.forEach((line, index) => {
        const trimmed = line.trim();

        // Headers
        if (trimmed.startsWith('###')) {
            flushList();
            const text = removeSurroundingAsterisks(trimmed.replace(/^###\s*/, '').trim());
            const icon = getIconForSection(text);
            elements.push(
                <div key={index} className="flex items-center gap-3 mt-8 mb-4 pb-3 border-b-2 border-purple-200 dark:border-purple-800">
                    {icon}
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        {formatInlineText(text)}
                    </h3>
                </div>
            );
        } else if (trimmed.startsWith('##')) {
            flushList();
            const text = removeSurroundingAsterisks(trimmed.replace(/^##\s*/, '').trim());
            elements.push(
                <h2 key={index} className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-10 mb-5">
                    {formatInlineText(text)}
                </h2>
            );
        }
        else if (trimmed.startsWith('####')) {
            flushList();
            const text = removeSurroundingAsterisks(trimmed.replace(/^####\s*/, '').trim());
            elements.push(
                <h4 key={index} className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">
                    {formatInlineText(text)}
                </h4>
            );
        }
        // List items
        else if (trimmed.match(/^[*-]\s+/)) {
            const content = removeSurroundingAsterisks(trimmed.replace(/^[*-]\s+/, '').trim());
            currentList.push(formatInlineText(content));
        } else if (trimmed.match(/^\d+\.\s+/)) {
            const content = removeSurroundingAsterisks(trimmed.replace(/^\d+\.\s+/, '').trim());
            currentList.push(formatInlineText(content));
        }
        // Empty lines or dividers
        else if (trimmed === '' || trimmed === '---') {
            flushList();
            if (trimmed === '---') {
                elements.push(<div key={index} className="my-8 border-t border-gray-200 dark:border-gray-700" />);
            }
        }
        // Regular paragraphs
        else if (trimmed.length > 0) {
            flushList();
            const content = removeSurroundingAsterisks(trimmed);
            elements.push(
                <p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 text-base">
                    {formatInlineText(content)}
                </p>
            );
        }
    });

    flushList();
    return elements;
};