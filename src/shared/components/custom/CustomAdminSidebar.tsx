import { Link, useLocation } from 'react-router';
import {
    ChevronLeft,
    ChevronRight,
    LayoutDashboard,
    CalendarCheck,
    TrendingUp,
} from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { CustomLogo } from './CustomLogo';
// import { useAuthStore } from '@/auth/store/auth.store';

interface SidebarProps {
    isCollapsed: boolean;
    onToggle: () => void;
    isMobileOpen?: boolean;
    onMobileClose?: () => void;
}

export const CustomAdminSidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle, isMobileOpen = false, onMobileClose }) => {

    const { pathname } = useLocation();

    //   const { user } = useAuthStore();

    const menuItems = [
        { icon: CalendarCheck, label: 'Proyectos', to: '/' },
        { icon: LayoutDashboard, label: 'Gráficos', to: '/graphics' },
        { icon: TrendingUp, label: 'Análisis', to: '/analysis' },
    ];

    const isActiveRoute = (to: string) => {

        if (pathname.includes('/admin/products/') && to === '/admin/products') return true;

        return pathname === to;
    }

    // const getInitials = (fullName: string) => {
    //     if (!fullName) return;
    //     return fullName
    //         .split(" ")
    //         .map(word => word[0].toUpperCase())
    //         .join("");
    // }

    // Mobile overlay
    const MobileSheet = (
        <div className={`fixed inset-0 z-40 md:hidden ${isMobileOpen ? 'block' : 'hidden'}`}>
            <div className="absolute inset-0 bg-black/40" onClick={onMobileClose} />
            <div className="absolute inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-xl p-0">
                {/* Header mobile */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between h-18">
                    <CustomLogo />
                    <button onClick={onMobileClose} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300">✕</button>
                </div>
                {/* Navigation mobile */}
                <nav className="flex-1 p-4 overflow-y-auto">
                    <ul className="space-y-2">
                        {menuItems.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <li key={index}>
                                    <Link
                                        to={item.to || '/'}
                                        onClick={onMobileClose}
                                        className={`flex items-center p-2 rounded-lg transition-all duration-300 group ${isActiveRoute(item.to || '/')
                                            ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold'
                                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                                            }`}
                                    >
                                        <Icon size={22} className="flex-shrink-0" />
                                        <span className="ml-3 font-medium">{item.label}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </div>
    );

    return (
        <>
            {MobileSheet}
            <div className={`hidden md:flex bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-500 ease-in-out flex-col ${isCollapsed ? 'w-18' : 'w-64'}`}>
                {/* Header */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between h-18">
                    <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
                        <CustomLogo />
                    </div>
                    <button
                        onClick={onToggle}
                        className={cn("p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300 transition-all duration-300")}
                    >
                        {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4">
                    <ul className="space-y-2">
                        {menuItems.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <li key={index}>
                                    <Link
                                        to={item.to || '/admin'}
                                        className={`flex md:gap-1.5 items-center p-2 rounded-lg transition-all duration-300 group ${isActiveRoute(item.to || '/')
                                            ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold'
                                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                                            }`}
                                    >
                                        <Icon size={22} className="flex-shrink-0" />
                                        <span className={`font-medium whitespace-nowrap transition-all duration-300 ease-in-out overflow-hidden ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
                                            }`}>
                                            {item.label}
                                        </span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </>
    );
};
