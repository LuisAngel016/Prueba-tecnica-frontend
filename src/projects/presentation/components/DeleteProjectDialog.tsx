"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/shared/components/ui/dialog"
import { Button } from "@/shared/components/ui/button"
import type { Project } from "@/projects/domain/entities/project.entity"
import { AlertTriangle, Trash2 } from "lucide-react"

interface DeleteProjectDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    project: Project | null
    onConfirm: () => void
    isDeleting?: boolean
}

export const DeleteProjectDialog = ({
    open,
    onOpenChange,
    project,
    onConfirm,
    isDeleting = false,
}: DeleteProjectDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[520px] font-poppins border-0 p-0 overflow-visible bg-white dark:bg-gray-800">
                <div className="relative">
                    {/* Header con gradiente sutil */}
                    <DialogHeader className="px-8 pt-8 pb-6 space-y-4 bg-gradient-to-b from-destructive/5 via-destructive/3 to-transparent dark:from-destructive/10 dark:via-destructive/5">
                        <div className="flex items-start gap-4">
                            {/* Icono con animación */}
                            <div className="relative flex-shrink-0">
                                <div className="absolute inset-0 bg-destructive/20 blur-xl rounded-full animate-pulse" />
                                <div className="relative p-3 rounded-2xl bg-gradient-to-br from-destructive/15 to-destructive/5 border-2 border-destructive/20 shadow-lg">
                                    <AlertTriangle className="h-6 w-6 text-destructive animate-pulse" />
                                </div>
                            </div>

                            <div className="flex-1 pt-1">
                                <DialogTitle className="text-2xl font-bold text-foreground dark:text-gray-100 mb-2">
                                    ¿Eliminar proyecto?
                                </DialogTitle>
                                <DialogDescription className="text-base text-muted-foreground dark:text-gray-400 leading-relaxed">
                                    {project && (
                                        <>
                                            Estás a punto de eliminar el proyecto{" "}
                                            <span className="font-semibold text-foreground dark:text-gray-100 inline-block px-2 py-0.5 bg-muted/50 dark:bg-gray-700 rounded">
                                                "{project.name}"
                                            </span>
                                            . Esta acción es permanente y no se puede deshacer.
                                        </>
                                    )}
                                </DialogDescription>
                            </div>
                        </div>

                    </DialogHeader>

                    {/* Footer con botones mejorados */}
                    <DialogFooter className="px-8 py-6 bg-muted/40 dark:bg-gray-900/60 border-t border-border/70 dark:border-gray-700">
                        <div className="flex gap-3 w-full sm:w-auto sm:flex-row-reverse">
                            <Button
                                type="button"
                                onClick={onConfirm}
                                disabled={isDeleting}
                                className="flex-1 sm:flex-none h-11 bg-gradient-to-r from-destructive to-destructive/90 hover:from-destructive/90 hover:to-destructive/80 text-destructive-foreground shadow-lg shadow-destructive/25 hover:shadow-destructive/40 transition-all duration-200 font-medium"
                            >
                                {isDeleting ? (
                                    <span className="flex items-center gap-2">
                                        <div className="h-4 w-4 border-2 border-destructive-foreground/30 border-t-destructive-foreground rounded-full animate-spin" />
                                        Eliminando...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <Trash2 className="h-4 w-4" />
                                        Eliminar proyecto
                                    </span>
                                )}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                                disabled={isDeleting}
                                className="flex-1 sm:flex-none h-11 font-medium border-2 border-border/70 hover:bg-accent hover:border-border dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100 transition-all duration-200"
                            >
                                Cancelar
                            </Button>
                        </div>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    )
}
