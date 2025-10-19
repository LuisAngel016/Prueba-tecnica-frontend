"use client"

import { useState } from "react"
import {
    type ColumnDef,
    type ColumnFiltersState,
    type SortingState,
    type VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/components/ui/table"

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/shared/components/ui/select"

import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { cn } from "@/shared/lib/utils"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export const DataTable = <TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) => {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [currentStatus, setCurrentStatus] = useState('all')
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    // Valores auxiliares para el selector y el texto de "mostrar X de Y"
    const filteredCount = table.getFilteredRowModel().rows.length
    const pageSize = table.getState().pagination.pageSize
    const selectValue = pageSize >= filteredCount ? "all" : String(pageSize)

    const handleStatusChange = (value: string) => {
        setCurrentStatus(value)
        const stateCol = table.getColumn("state")
        if (!stateCol) return
        stateCol.setFilterValue(value === "all" ? undefined : value)
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between py-2">
                <Input
                    placeholder="Filtrar por nombre..."
                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) => {
                        setCurrentStatus("all")
                        table.getColumn("state")?.setFilterValue(undefined)
                        table.getColumn("name")?.setFilterValue(event.target.value)
                    }}
                    className="w-full sm:max-w-sm"
                />
                <Select
                    value={currentStatus}
                    onValueChange={handleStatusChange}
                >
                    <SelectTrigger className="w-full sm:w-[200px]">
                        <SelectValue placeholder="Estado: Todos" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel className="font-poppins">Estado</SelectLabel>
                            <SelectItem className="font-poppins" value="all">Todos</SelectItem>
                            <SelectItem className="font-poppins" value="En progreso">En progreso</SelectItem>
                            <SelectItem className="font-poppins" value="Finalizado">Finalizado</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="sm:ml-auto">
                            Columnas
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter(
                                (column) => column.getCanHide()
                            )
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize font-poppins"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {(column.columnDef.meta as { displayName?: string })?.displayName || column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border overflow-x-auto">
                <Table className="min-w-[760px]">
                    <TableHeader className={cn("dark:bg-slate-800 dark:text-gray-100")}>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="bg-muted/40 dark:bg-transparent">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody className={cn("dark:bg-slate-800 dark:text-gray-200")}>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="bg-transparent dark:bg-transparent">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No hay resultados.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex flex-wrap items-center justify-end gap-2 py-2">
                <div className="text-muted-foreground flex-1 text-sm">
                    {/* {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected. */}
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Anterior
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Siguiente
                </Button>
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-3">
                <Select
                    value={selectValue}
                    onValueChange={(value) => {
                        if (value === "all") {
                            table.setPageSize(table.getFilteredRowModel().rows.length)
                        } else {
                            table.setPageSize(+value)
                        }
                    }}
                >
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="10 Rows" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel className="font-poppins">Filas por página</SelectLabel>
                            <SelectItem className="font-poppins" value="all">Todas las filas</SelectItem>
                            <SelectItem className="font-poppins" value="5">5 filas</SelectItem>
                            <SelectItem className="font-poppins" value="10">10 filas</SelectItem>
                            <SelectItem className="font-poppins" value="20">20 filas</SelectItem>
                            <SelectItem className="font-poppins" value="50">50 filas</SelectItem>
                            <SelectItem className="font-poppins" value="100">100 filas</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <span className="text-sm text-muted-foreground">
                    Mostrando {Math.min(pageSize, filteredCount)} de {filteredCount} filas
                </span>
            </div>
        </div>
    )
}