import { createBrowserRouter } from "react-router";

import { ProjectsPage } from "@/projects";
import { GraphicsPage } from "@/graphics/presentation/pages/GraphicsPage";
import { AnalysisPage } from "@/analysis/presentation/pages/AnalysisPage";
import { AdminLayout } from "@/shared/layouts/AdminLayout";

export const appRouter = createBrowserRouter([
    // Main routes
    {
        path: "/",
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <ProjectsPage />
            },
            {
                path: "graphics",
                element: <GraphicsPage />
            },
            {
                path: "analysis",
                element: <AnalysisPage />
            }
        ]
    }
])
