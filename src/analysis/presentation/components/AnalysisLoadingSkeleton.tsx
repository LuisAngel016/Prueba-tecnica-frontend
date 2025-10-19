import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";

export const AnalysisLoadingSkeleton = () => {
    return (
        <div className="p-4 sm:p-6 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
            {/* Header */}
            <div>
                <Skeleton className="h-8 w-64 mb-2" />
                <Skeleton className="h-4 w-96" />
            </div>

            {/* Stat cards */}
            <div className="grid gap-4 md:grid-cols-3">
                {[1, 2, 3].map((i) => (
                    <Card key={i}>
                        <CardHeader>
                            <Skeleton className="h-5 w-40" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-10 w-24 mb-2" />
                            <Skeleton className="h-3 w-32" />
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Summary header */}
            <Card>
                <CardHeader>
                    <Skeleton className="h-7 w-56 mb-2" />
                    <Skeleton className="h-4 w-80" />
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {[...Array(6)].map((_, idx) => (
                            <Skeleton key={idx} className="h-4 w-full" />
                        ))}
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
