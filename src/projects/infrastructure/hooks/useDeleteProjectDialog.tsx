import { useState } from "react";
import { toast } from "sonner";
import type { Project } from "../../domain/entities/project.entity";
import { useDeleteProject } from "./useDeleteProject";

export const useDeleteProjectDialog = () => {
    const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const { mutateAsync: deleteProject, isPending: isDeleting } = useDeleteProject();

    const handleDeleteClick = (project: Project) => {
        setProjectToDelete(project);
        setIsDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!projectToDelete?.id) return;

        try {
            await deleteProject(projectToDelete.id);
            toast.success("Proyecto eliminado exitosamente", {
                description: `El proyecto "${projectToDelete.name}" ha sido eliminado correctamente.`,
            });
            setIsDeleteDialogOpen(false);
            setProjectToDelete(null);
        } catch (error) {
            console.error("Error al eliminar el proyecto:", error);
            toast.error("Error al eliminar el proyecto", {
                description: "No se pudo eliminar el proyecto. Por favor, intenta nuevamente.",
            });
        }
    };

    return {
        projectToDelete,
        setProjectToDelete,
        isDeleteDialogOpen,
        setIsDeleteDialogOpen,
        handleDeleteClick,
        handleConfirmDelete,
        isDeleting,
    } as const;
};
