import React from 'react';
import { Bell, MessageSquare, Settings, Sun, Moon, Menu } from 'lucide-react';
import { useThemeContext } from '@/shared/hooks/use-theme-context';

interface HeaderProps {
    onMenuClick?: () => void;
}

export const CustomAdminHeader: React.FC<HeaderProps> = ({ onMenuClick }) => {

    const { toggleTheme } = useThemeContext();

    return (
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 md:px-6 py-3 md:py-4 h-16 md:h-18">
            <div className="flex items-center justify-between gap-3">
                {/* Mobile menu button */}
                <button
                    onClick={onMenuClick}
                    className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300"
                    aria-label="Abrir menú"
                >
                    <Menu size={22} />
                </button>

                <div className="flex-1 max-w-md" />

                {/* Actions */}
                <div className="flex items-center gap-2 md:gap-4">
                    <button
                        onClick={toggleTheme}
                        className="relative p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                        <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                        <Moon className="absolute top-2 left-2 h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                    </button>
                    <button className="relative p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <Bell size={20} />
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                    </button>

                    <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <MessageSquare size={20} />
                    </button>

                    <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <Settings size={20} />
                    </button>

                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm cursor-pointer hover:shadow-lg transition-shadow">
                        JD
                    </div>
                </div>
            </div>
        </header>
    );
};
