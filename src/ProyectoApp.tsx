import { RouterProvider } from "react-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from './shared/contexts/ThemeProvider'
import { appRouter } from "./routes/app.router"
import { Toaster } from "sonner"

const queryClient = new QueryClient();

export const ProyectoApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ThemeProvider>
        <RouterProvider router={appRouter} />
        <Toaster position="top-right" richColors />
      </ThemeProvider>
    </QueryClientProvider>
  )
}
