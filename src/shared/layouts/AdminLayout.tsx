import { CustomAdminHeader, CustomAdminSidebar } from "@/shared/components/custom";
import { useState } from "react";
import { Outlet } from "react-router";


export const AdminLayout = () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [sidebarOpenMobile, setSidebarOpenMobile] = useState(false);
    return (
        <div className="font-poppins min-h-screen bg-gray-50 dark:bg-gray-900 flex animate-fade animate-duration-[2000ms] animate-delay-100">
            {/* Sidebar: off-canvas en móvil, colapsable en desktop */}
            <CustomAdminSidebar
                isCollapsed={sidebarCollapsed}
                onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
                isMobileOpen={sidebarOpenMobile}
                onMobileClose={() => setSidebarOpenMobile(false)}
            />

            <div className="flex-1 flex flex-col min-w-0">
                <CustomAdminHeader onMenuClick={() => setSidebarOpenMobile(true)} />

                <main className="flex-1 min-w-0">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
