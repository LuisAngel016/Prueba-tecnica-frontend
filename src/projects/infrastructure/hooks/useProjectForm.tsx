import type { Project } from "@/projects/domain/entities/project.entity"
import { useState } from "react"
import { useCreateProject } from "./useCreateProject"
import { useUpdateProject } from "./useUpdateProject"
import { useForm } from "react-hook-form"
import { useGetProjects } from "./useGetProjects"
import { toast } from "sonner"

/**
 * Hook personalizado para manejar el estado y lógica del formulario de proyectos
 * Utiliza react-hook-form para una gestión eficiente del formulario
 * @returns Estado y funciones para manejar el formulario de proyectos
 */

export interface ProjectFormData {
    name: string
    description: string
    state: string
    // En el formulario normalmente trabajamos con strings para inputs de fecha
    startDate: string
    endDate: string
}

export const useProjectForm = () => {

    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editingProject, setEditingProject] = useState<Project | null>(null)
    const toLocalDate = (dateStr: string): Date => {
        const [y, m, d] = dateStr.split("-").map(Number)
        return new Date(y, (m || 1) - 1, d || 1)
    }

    const {
        register,
        control,
        handleSubmit: handleFormSubmit,
        formState: { errors, isSubmitting },
        reset,
        watch,
        setValue,
    } = useForm<ProjectFormData>({
        defaultValues: {
            name: "",
            description: "",
            state: "",
            startDate: "",
            endDate: "",
        },
    })

    /**
     * Maneja el envío del formulario
     */
    const toYMD = (date: Date): string => {
        const y = date.getFullYear()
        const m = String(date.getMonth() + 1).padStart(2, "0")
        const d = String(date.getDate()).padStart(2, "0")
        return `${y}-${m}-${d}`
    }


    // Mutaciones y consulta de proyectos
    const { mutateAsync: createProject, isPending: isCreating } = useCreateProject()
    const { mutateAsync: updateProject, isPending: isUpdating } = useUpdateProject()
    const { data: projectsData } = useGetProjects()

    const onSubmit = async (data: ProjectFormData) => {
        try {
            // Validar que el nombre de proyecto sea único (case-insensitive, ignora espacios)
            const normalizedName = data.name.trim().toLowerCase()
            const existing = projectsData?.data?.find(
                p => p.name.trim().toLowerCase() === normalizedName && (!editingProject || p.id !== editingProject.id)
            )
            if (existing) {
                toast.error("El nombre del proyecto ya existe", {
                    description: `Ya existe un proyecto con el nombre "${data.name}". Por favor, elige otro nombre.`
                })
                return
            }
            // Validar que la fecha de fin no sea menor a la de inicio
            if (data.startDate && data.endDate) {
                const start = toLocalDate(data.startDate)
                const end = toLocalDate(data.endDate)
                if (end < start) {
                    toast.error("La fecha de fin no puede ser menor a la fecha de inicio", {
                        description: "Por favor, selecciona una fecha de fin igual o posterior a la de inicio."
                    })
                    return
                }
            }
            // Construir fechas como Date locales para evitar desfase por TZ
            const payload = {
                name: data.name,
                description: data.description,
                state: data.state,
                startDate: data.startDate ? toLocalDate(data.startDate) : undefined,
                endDate: data.endDate ? toLocalDate(data.endDate) : undefined,
            } as unknown as Omit<Project, "id"> // cast para satisfacer tipos del use case

            if (editingProject) {
                await updateProject({ id: editingProject.id, projectData: payload })
                toast.success("Proyecto actualizado exitosamente", {
                    description: `El proyecto "${data.name}" ha sido actualizado correctamente.`,
                })
            } else {
                await createProject(payload)
                toast.success("Proyecto creado exitosamente", {
                    description: `El proyecto "${data.name}" ha sido creado correctamente.`,
                })
            }

            // Cerrar el modal y resetear el formulario
            setIsDialogOpen(false)
            reset()
        } catch (error) {
            console.error("Error al guardar el proyecto:", error)
            toast.error("Error al guardar el proyecto", {
                description: editingProject
                    ? "No se pudo actualizar el proyecto. Por favor, intenta nuevamente."
                    : "No se pudo crear el proyecto. Por favor, intenta nuevamente.",
            })
        }
    }

    /**
     * Abre el modal del formulario para crear un nuevo proyecto
     */
    const openDialog = () => {
        setEditingProject(null)
        reset()
        setIsDialogOpen(true)
    }

    /**
     * Abre el modal del formulario para editar un proyecto existente
     */
    const openEditDialog = (project: Project) => {
        setEditingProject(project)
        setValue("name", project.name)
        setValue("description", project.description)
        setValue("state", project.state)
        // Normalizar siempre a yyyy-MM-dd (aunque vengan como string o Date)
        setValue("startDate", project.startDate ? toYMD(new Date(project.startDate as unknown as Date)) : "")
        setValue("endDate", project.endDate ? toYMD(new Date(project.endDate as unknown as Date)) : "")
        setIsDialogOpen(true)
    }

    /**
     * Cierra el modal del formulario
     */
    const closeDialog = () => {
        setIsDialogOpen(false)
        setEditingProject(null)
        reset()
    }

    return {
        isDialogOpen,
        openDialog,
        openEditDialog,
        closeDialog,
        setIsDialogOpen,
        register,
        handleSubmit: handleFormSubmit(onSubmit),
        errors,
        isSubmitting: isSubmitting || isCreating || isUpdating,
        control,
        reset,
        watch,
        editingProject,
    }
}
