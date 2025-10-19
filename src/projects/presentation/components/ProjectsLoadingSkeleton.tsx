import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";

export const ProjectsLoadingSkeleton = () => {
    return (
        <div className="p-4 sm:p-6 space-y-6 bg-gray-50 dark:bg-slate-800 min-h-screen">
            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <Skeleton className="h-8 w-64 mb-2" />
                    <Skeleton className="h-4 w-72" />
                </div>
                <div className="flex items-center gap-2">
                    <Button disabled className="w-full sm:w-auto opacity-70">
                        <Skeleton className="h-4 w-40" />
                    </Button>
                </div>
            </div>

            {/* Table skeleton */}
            <Card className="overflow-hidden bg-gradient-to-br from-white/80 to-slate-100/80 dark:from-slate-800/70 dark:to-slate-900/70 border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="border-b px-4 py-3">
                    <Skeleton className="h-5 w-40" />
                </div>
                <div className="p-4">
                    <div className="grid grid-cols-6 gap-4 mb-3">
                        {[...Array(6)].map((_, i) => (
                            <Skeleton key={i} className="h-4 w-full" />
                        ))}
                    </div>
                    <div className="space-y-3">
                        {[...Array(6)].map((_, rowIdx) => (
                            <div key={rowIdx} className="grid grid-cols-6 gap-4">
                                {[...Array(6)].map((_, colIdx) => (
                                    <Skeleton key={colIdx} className="h-4 w-full" />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </Card>
        </div>
    );
};
