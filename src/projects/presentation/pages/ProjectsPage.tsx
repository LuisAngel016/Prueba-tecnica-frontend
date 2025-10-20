import { Button } from "@/shared/components/ui/button"
import { Plus } from "lucide-react"
import { ProjectModal } from "../components/ProjectModal";
import { useProjectForm } from "@/projects/infrastructure/hooks/useProjectForm";
import { DataTable } from "../components/DataTable";
import { ProjectsLoadingSkeleton } from "../components/ProjectsLoadingSkeleton";
import { useGetProjects, useDeleteProject } from "@/projects/infrastructure/hooks";
import { createColumns } from "../components/Columns";
import { useMemo, useState } from "react";
import { DeleteProjectModal } from "../components/DeleteProjectModal";
import type { Project } from "@/projects/domain/entities/project.entity";
import { toast } from "sonner";

export const ProjectsPage = () => {
    const [projectToDelete, setProjectToDelete] = useState<Project | null>(null)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

    const {
        isDialogOpen,
        openDialog,
        openEditDialog,
        setIsDialogOpen,
        register,
        handleSubmit,
        errors,
        isSubmitting,
        control,
        editingProject,
    } = useProjectForm();

    const { data, isLoading } = useGetProjects();
    const { mutateAsync: deleteProject, isPending: isDeleting } = useDeleteProject();

    const handleDeleteClick = (project: Project) => {
        setProjectToDelete(project)
        setIsDeleteDialogOpen(true)
    }

    const handleConfirmDelete = async () => {
        if (!projectToDelete?.id) return

        try {
            await deleteProject(projectToDelete.id)
            toast.success("Proyecto eliminado exitosamente", {
                description: `El proyecto "${projectToDelete.name}" ha sido eliminado correctamente.`,
            })
            setIsDeleteDialogOpen(false)
            setProjectToDelete(null)
        } catch (error) {
            console.error("Error al eliminar el proyecto:", error)
            toast.error("Error al eliminar el proyecto", {
                description: "No se pudo eliminar el proyecto. Por favor, intenta nuevamente.",
            })
        }
    }

    const columns = useMemo(() => createColumns(openEditDialog, handleDeleteClick), [openEditDialog]);

    console.log(data)

    if (isLoading) {
        return <ProjectsLoadingSkeleton />;
    }

    return (
        <div className="p-4 sm:p-6 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen animate-fade-up animate-duration-[800ms] animate-delay-100">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-foreground dark:text-gray-100">Proyectos</h1>
                    <p className="text-muted-foreground dark:text-gray-400 mt-1">Gestión de proyectos</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button onClick={openDialog} className="w-full sm:w-auto">
                        <Plus className="h-4 w-4 mr-2" />
                        Nuevo proyecto
                    </Button>
                </div>
            </div>

            <DataTable columns={columns} data={data?.data || []} />

            <ProjectModal
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                register={register}
                control={control}
                errors={errors}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                editingProject={editingProject}
            />

            <DeleteProjectModal
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
                project={projectToDelete}
                onConfirm={handleConfirmDelete}
                isDeleting={isDeleting}
            />
        </div>
    )
}
