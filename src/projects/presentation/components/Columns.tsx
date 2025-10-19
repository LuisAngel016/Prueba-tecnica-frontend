/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
"use client"

import { Badge } from "@/shared/components/ui/badge"
import type { ColumnDef, FilterFn, Row, SortDirection } from "@tanstack/react-table"
import { ChevronDown, ChevronUp, Pencil, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/shared/components/ui/button"
import type { Project } from "@/projects/domain/entities/project.entity"

const myCustomFilterFn: FilterFn<Partial<Project>> = (
  row: Row<Partial<Project>>,
  _columnId: string,
  filterValue: string
) => {
  const value = (filterValue ?? "").toString().toLowerCase();
  const filterParts = value.split(" ").filter(Boolean);
  const name = row.original.name ?? "";
  const description = row.original.description ?? "";
  const state = row.original.state ?? "";
  const rowValues = `${name} ${description} ${state}`.toLowerCase();

  return filterParts.every(part => rowValues.includes(part));
}

const SortedIcon = ({ isSorted }: { isSorted: false | SortDirection }) => {
  if (isSorted === "asc") {
    return <ChevronUp className="h-4 w-4" />
  }
  if (isSorted === "desc") {
    return <ChevronDown className="h-4 w-4" />
  }
  return null
}


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const createColumns = (
  onEdit: (project: Project) => void,
  onDelete: (project: Project) => void
): ColumnDef<Partial<Project>>[] => [
    {
      accessorKey: "name",
      meta: {
        displayName: "Nombre"
      },
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nombre
            <SortedIcon isSorted={column.getIsSorted()} />
          </Button>
        )
      },
    },
    {
      accessorKey: "description",
      meta: {
        displayName: "Descripción"
      },
      header: "Descripción",
      cell: ({ row }) => {
        const description = row.getValue("description") as string
        const formatted = description.length > 50 ? description.slice(0, 50) + "..." : description
        return <div className="font-medium">{formatted}</div>
      },
    },
    {
      accessorKey: "state",
      meta: {
        displayName: "Estado"
      },
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Estado
            <SortedIcon isSorted={column.getIsSorted()} />
          </Button>
        )
      },
      cell: ({ row }) => {
        const state = row.getValue("state") as string
        const variant = {
          "En progreso": "info",
          Finalizado: "success",
        }[state] ?? ("default") as any

        return <Badge variant={variant} capitalize>{state}</Badge>
      },
    },
    {
      accessorKey: "startDate",
      meta: {
        displayName: "Fecha de Inicio"
      },
      filterFn: myCustomFilterFn,
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Fecha de Inicio
            <SortedIcon isSorted={column.getIsSorted()} />
          </Button>
        )
      },
      cell: ({ row }) => {
        const startDate = row.getValue("startDate") as string
        return <div>{new Date(startDate).toLocaleDateString('es-ES').replace(/\//g, '-')}</div>
      }
    },
    {
      accessorKey: "endDate",
      meta: {
        displayName: "Fecha de Fin"
      },
      filterFn: myCustomFilterFn,
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Fecha de Fin
            <SortedIcon isSorted={column.getIsSorted()} />
          </Button>
        )
      },
      cell: ({ row }) => {
        const endDate = row.getValue("endDate") as string
        return <div>{new Date(endDate).toLocaleDateString('es-ES').replace(/\//g, '-')}</div>
      }
    },
    {
      id: "actions",
      meta: {
        displayName: "Acciones"
      },
      header: "Acciones",
      cell: ({ row }) => {
        const project = row.original

        return (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => {
                if (project.id) {
                  onEdit(project as Project)
                } else {
                  toast.error('No se puede editar este proyecto', {
                    position: 'bottom-right'
                  })
                }
              }}
            >
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Editar proyecto</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => {
                if (project.id) {
                  onDelete(project as Project)
                } else {
                  toast.error('No se puede eliminar este proyecto', {
                    position: 'bottom-right'
                  })
                }
              }}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Eliminar proyecto</span>
            </Button>
          </div>
        )
      },
    },
  ]

// Exportar una versión por defecto para compatibilidad (sin funcionalidad de edición/eliminación)
export const Columns = createColumns(() => { }, () => { })