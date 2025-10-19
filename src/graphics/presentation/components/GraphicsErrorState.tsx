import { Card, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";

export const GraphicsErrorState = () => {
    return (
        <div className="p-4 sm:p-6 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="flex items-center justify-center min-h-[400px]">
                <Card className="max-w-md w-full">
                    <CardHeader>
                        <CardTitle className="text-destructive">
                            Error al cargar datos
                        </CardTitle>
                        <CardDescription>
                            No se pudieron cargar las estadísticas. Por favor, intenta nuevamente.
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        </div>
    );
};
