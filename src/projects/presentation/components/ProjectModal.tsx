"use client"

import { Button } from "@/shared/components/ui/button"
import { CalendarIcon, FolderKanban, FileText, Workflow } from "lucide-react"
import { Calendar as DatePicker } from "@/shared/components/ui/calendar"
import { format, parse } from "date-fns"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/shared/components/ui/dialog"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { Textarea } from "@/shared/components/ui/textarea"
import type { UseFormRegister, FieldErrors, Control } from "react-hook-form"
import { Controller } from "react-hook-form"
// removed duplicate import of format; using the one above with parse
import { useState, useRef, useEffect } from "react"
import type { ProjectFormData } from "@/projects/infrastructure/hooks/useProjectForm"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"

interface ProjectModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    register: UseFormRegister<ProjectFormData>
    control: Control<ProjectFormData>
    errors: FieldErrors<ProjectFormData>
    onSubmit: () => void
    isSubmitting?: boolean
    editingProject?: { id: string } | null
}

export const ProjectModal = ({
    open,
    onOpenChange,
    register,
    control,
    errors,
    onSubmit,
    isSubmitting = false,
    editingProject = null,
}: ProjectModalProps) => {
    const [openStartDate, setOpenStartDate] = useState(false)
    const [openEndDate, setOpenEndDate] = useState(false)
    const startDateWrapperRef = useRef<HTMLDivElement | null>(null)
    const endDateWrapperRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        function onDoc(e: MouseEvent) {
            if (startDateWrapperRef.current && e.target instanceof Node && !startDateWrapperRef.current.contains(e.target)) {
                setOpenStartDate(false)
            }
            if (endDateWrapperRef.current && e.target instanceof Node && !endDateWrapperRef.current.contains(e.target)) {
                setOpenEndDate(false)
            }
        }
        document.addEventListener("mousedown", onDoc)
        return () => document.removeEventListener("mousedown", onDoc)
    }, [])

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[650px] font-poppins border-0 p-0 overflow-visible bg-white dark:bg-gray-800">
                <div className="relative">
                    <DialogHeader className="px-8 pt-8 pb-6 space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-primary shadow-lg shadow-primary/20">
                                <FolderKanban className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <DialogTitle className="text-2xl font-bold text-foreground dark:text-gray-100">
                                {editingProject ? "Editar Proyecto" : "Nuevo Proyecto"}
                            </DialogTitle>
                        </div>
                        <DialogDescription className="text-base text-muted-foreground dark:text-gray-400">
                            {editingProject ? "Modifica los datos del proyecto" : "Completa los datos para crear un nuevo proyecto"}
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={onSubmit}>
                        <div className="px-8 pb-6 space-y-6">
                            {/* Nombre del Proyecto */}
                            <div className="space-y-2.5">
                                <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                                    <div className="p-1 rounded-md bg-primary/10">
                                        <FolderKanban className="h-3.5 w-3.5 text-primary" />
                                    </div>
                                    Nombre del Proyecto
                                </Label>
                                <Input
                                    id="name"
                                    placeholder="Ej: Proyecto de Desarrollo Web"
                                    className="h-11 font-thin border-border/70 focus:border-primary transition-all duration-200 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-400"
                                    {...register("name", {
                                        required: "El nombre del proyecto es requerido",
                                        minLength: {
                                            value: 3,
                                            message: "El nombre debe tener al menos 3 caracteres",
                                        },
                                    })}
                                />
                                {errors.name && (
                                    <p className="text-xs text-red-500 flex items-center gap-1 animate-in slide-in-from-top-1">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>

                            {/* Fecha de Inicio y Fecha de Fin */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2.5" ref={startDateWrapperRef}>
                                    <Label htmlFor="startDate" className="text-sm font-medium flex items-center gap-2">
                                        <div className="p-1 rounded-md bg-primary/10">
                                            <CalendarIcon className="h-3.5 w-3.5 text-primary" />
                                        </div>
                                        Fecha de Inicio
                                    </Label>
                                    <Controller
                                        control={control}
                                        name="startDate"
                                        defaultValue=""
                                        rules={{ required: "La fecha de inicio es requerida" }}
                                        render={({ field }) => (
                                            <div className="relative">
                                                <Button
                                                    type="button"
                                                    onClick={() => setOpenStartDate((v) => !v)}
                                                    className="w-full h-11 font-thin text-left pl-4 pr-3 rounded-lg border border-border/70 bg-white dark:bg-gray-700 dark:border-gray-600 text-sm flex hover:bg-accent hover:border-primary/50 text-foreground dark:text-gray-100 items-center justify-between transition-all duration-200"
                                                >
                                                    <span className={!field.value ? "text-gray-400 dark:text-gray-400" : ""}>
                                                        {(() => {
                                                            if (typeof field.value === "string" && field.value) {
                                                                const parsed = parse(field.value, "yyyy-MM-dd", new Date())
                                                                return isNaN(parsed.getTime()) ? "Seleccionar fecha" : format(parsed, "PPP")
                                                            }
                                                            return "Seleccionar fecha"
                                                        })()}
                                                    </span>
                                                    <CalendarIcon className="ml-2 h-4 w-4 opacity-60" />
                                                </Button>
                                                {openStartDate && (
                                                    <div className="absolute left-0 mt-2 z-50 w-auto p-3 bg-popover dark:bg-gray-800 rounded-xl shadow-2xl border border-border/70 dark:border-gray-700 animate-in fade-in-0 zoom-in-95">
                                                        <DatePicker
                                                            mode="single"
                                                            selected={(typeof field.value === "string" && field.value) ? (() => { const p = parse(field.value, "yyyy-MM-dd", new Date()); return isNaN(p.getTime()) ? undefined : p })() : undefined}
                                                            onSelect={(d) => {
                                                                field.onChange(d ? format(d, "yyyy-MM-dd") : "")
                                                                setOpenStartDate(false)
                                                            }}
                                                            captionLayout="dropdown"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    />
                                    {errors.startDate && (
                                        <p className="text-xs text-red-500 flex items-center gap-1 animate-in slide-in-from-top-1">
                                            {errors.startDate.message}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2.5" ref={endDateWrapperRef}>
                                    <Label htmlFor="endDate" className="text-sm font-medium flex items-center gap-2">
                                        <div className="p-1 rounded-md bg-primary/10">
                                            <CalendarIcon className="h-3.5 w-3.5 text-primary" />
                                        </div>
                                        Fecha de Fin
                                    </Label>
                                    <Controller
                                        control={control}
                                        name="endDate"
                                        defaultValue=""
                                        rules={{ required: "La fecha de fin es requerida" }}
                                        render={({ field }) => (
                                            <div className="relative">
                                                <Button
                                                    type="button"
                                                    onClick={() => setOpenEndDate((v) => !v)}
                                                    className="w-full h-11 font-thin text-left pl-4 pr-3 rounded-lg border border-border/70 bg-white dark:bg-gray-700 dark:border-gray-600 text-sm flex hover:bg-accent hover:border-primary/50 text-foreground dark:text-gray-100 items-center justify-between transition-all duration-200"
                                                >
                                                    <span className={!field.value ? "text-gray-400 dark:text-gray-400" : ""}>
                                                        {(() => {
                                                            if (typeof field.value === "string" && field.value) {
                                                                const parsed = parse(field.value, "yyyy-MM-dd", new Date())
                                                                return isNaN(parsed.getTime()) ? "Seleccionar fecha" : format(parsed, "PPP")
                                                            }
                                                            return "Seleccionar fecha"
                                                        })()}
                                                    </span>
                                                    <CalendarIcon className="ml-2 h-4 w-4 opacity-60" />
                                                </Button>
                                                {openEndDate && (
                                                    <div className="absolute left-0 mt-2 z-50 w-auto p-3 bg-popover dark:bg-gray-800 rounded-xl shadow-2xl border border-border/70 dark:border-gray-700 animate-in fade-in-0 zoom-in-95">
                                                        <DatePicker
                                                            mode="single"
                                                            selected={(typeof field.value === "string" && field.value) ? (() => { const p = parse(field.value, "yyyy-MM-dd", new Date()); return isNaN(p.getTime()) ? undefined : p })() : undefined}
                                                            onSelect={(d) => {
                                                                field.onChange(d ? format(d, "yyyy-MM-dd") : "")
                                                                setOpenEndDate(false)
                                                            }}
                                                            captionLayout="dropdown"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    />
                                    {errors.endDate && (
                                        <p className="text-xs text-red-500 flex items-center gap-1 animate-in slide-in-from-top-1">
                                            {errors.endDate.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Estado del Proyecto */}
                            <div className="space-y-2.5">
                                <Label htmlFor="state" className="text-sm font-medium flex items-center gap-2">
                                    <div className="p-1 rounded-md bg-primary/10">
                                        <Workflow className="h-3.5 w-3.5 text-primary" />
                                    </div>
                                    Estado del Proyecto
                                </Label>
                                <Controller
                                    control={control}
                                    name="state"
                                    defaultValue=""
                                    rules={{ required: "El estado es requerido" }}
                                    render={({ field }) => (
                                        <Select
                                            value={(field.value as string) ?? ""}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger size="lg" className="w-full font-thin border border-border/70 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 data-[placeholder]:text-gray-400 dark:data-[placeholder]:text-gray-400">
                                                <SelectValue placeholder="Selecciona el estado..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem className="font-poppins" value="En progreso">En progreso</SelectItem>
                                                    <SelectItem className="font-poppins" value="Finalizado">Finalizado</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.state && (
                                    <p className="text-xs text-red-500 flex items-center gap-1 animate-in slide-in-from-top-1">
                                        {errors.state.message}
                                    </p>
                                )}
                            </div>

                            {/* Descripción */}
                            <div className="space-y-2.5">
                                <Label htmlFor="description" className="text-sm font-medium flex items-center gap-2">
                                    <div className="p-1 rounded-md bg-primary/10">
                                        <FileText className="h-3.5 w-3.5 text-primary" />
                                    </div>
                                    Descripción
                                </Label>
                                <Textarea
                                    id="description"
                                    placeholder="Describe los objetivos y alcance del proyecto..."
                                    rows={4}
                                    className="resize-none font-thin border-border/70 focus:border-primary transition-all duration-200 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-400"
                                    {...register("description", {
                                        required: "La descripción es requerida",
                                        minLength: {
                                            value: 10,
                                            message: "La descripción debe tener al menos 10 caracteres",
                                        },
                                    })}
                                />
                                {errors.description && (
                                    <p className="text-xs text-red-500 flex items-center gap-1 animate-in slide-in-from-top-1">
                                        {errors.description.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <DialogFooter className="px-8 py-6 bg-muted/30 dark:bg-gray-900/50 border-t border-border/70 dark:border-gray-700">
                            <div className="flex gap-3 w-full sm:w-auto">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => onOpenChange(false)}
                                    disabled={isSubmitting}
                                    className="flex-1 sm:flex-none h-11 font-thin border-border/70 hover:bg-accent dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100 transition-all duration-200"
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 sm:flex-none h-11 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all duration-200"
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center gap-2">
                                            <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                            Guardando...
                                        </span>
                                    ) : (
                                        editingProject ? "Actualizar Proyecto" : "Guardar Proyecto"
                                    )}
                                </Button>
                            </div>
                        </DialogFooter>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}
