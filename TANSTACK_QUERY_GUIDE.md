# 🏗️ Integración de TanStack Query con Arquitectura Limpia

## 📋 Resumen

Este proyecto implementa **TanStack Query** (React Query) siguiendo los principios de **Arquitectura Limpia**.

## 🎯 Principios Clave

### ✅ Lo que SÍ hacemos:
- Los **hooks** (con TanStack Query) están en la **capa de infraestructura**
- Los hooks llaman a los **casos de uso** de la capa de aplicación
- Los casos de uso llaman al **repositorio** (abstracción)
- El repositorio implementado usa el **adaptador HTTP**
- Todo está inyectado mediante el **contenedor IoC**

### ❌ Lo que NO hacemos:
- ❌ NO ponemos TanStack Query en los casos de uso
- ❌ NO ponemos llamadas HTTP directas en los hooks
- ❌ NO mezclamos lógica de negocio con infraestructura

## 📁 Estructura de Carpetas

\`\`\`
src/projects/
├── domain/                          # ✅ Núcleo - Sin dependencias externas
│   ├── entities/
│   │   └── project.entity.ts       # Entidades del dominio
│   └── repositories/
│       └── project.repository.ts   # Interfaces (contratos)
│
├── application/                     # ✅ Casos de Uso - Lógica de negocio
│   ├── get-all-projects.usecase.ts # ⭐ Nuevo
│   ├── get-project-by-id.usecase.ts
│   ├── create-project.usecase.ts
│   ├── update-project.usecase.ts
│   └── delete-project.usecase.ts
│
├── infrastructure/                  # ✅ Implementaciones técnicas
│   ├── hooks/                       # 🎣 Hooks con TanStack Query
│   │   ├── useGetProjects.tsx      # ⭐ Nuevo - Query
│   │   ├── useGetProjectById.tsx   # ⭐ Nuevo - Query
│   │   ├── useCreateProject.tsx    # ⭐ Nuevo - Mutation
│   │   ├── useUpdateProject.tsx    # ⭐ Nuevo - Mutation
│   │   ├── useDeleteProject.tsx    # ⭐ Nuevo - Mutation
│   │   └── index.ts                # ⭐ Exportación centralizada
│   ├── repositories/
│   │   └── project.repository.impl.ts
│   └── mappers/
│       └── project.mapper.ts
│
├── IoC/                             # ✅ Contenedor de dependencias
│   └── project.container.ts        # ⭐ Actualizado con todos los use cases
│
└── presentation/                    # ✅ UI - Componentes React
    ├── pages/
    │   └── ProjectsPage.tsx
    └── components/
        └── ...
\`\`\`

## 🔄 Flujo de Datos

\`\`\`
Componente React
    ↓ usa
Hook (useGetProjects)
    ↓ llama
Caso de Uso (GetAllProjectsUseCase)
    ↓ ejecuta
Repositorio (IProjectRepository)
    ↓ implementa
RepositoryImpl (ProjectRepositoryImpl)
    ↓ usa
HTTP Adapter (AxiosHttpAdapter)
    ↓ hace petición
API Backend
\`\`\`

## 📝 Ejemplos de Uso

### 1️⃣ Query - Obtener todos los proyectos

\`\`\`tsx
import { useGetProjects } from "@/projects/infrastructure/hooks";

export const ProjectsList = () => {
  const { data: projects, isLoading, error } = useGetProjects();

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {projects?.map((project) => (
        <li key={project.id}>{project.name}</li>
      ))}
    </ul>
  );
};
\`\`\`

### 2️⃣ Query - Obtener proyecto por ID

\`\`\`tsx
import { useGetProjectById } from "@/projects/infrastructure/hooks";

export const ProjectDetail = ({ id }: { id: string }) => {
  const { data: project, isLoading } = useGetProjectById(id);

  if (isLoading) return <div>Cargando...</div>;
  if (!project) return <div>No encontrado</div>;

  return (
    <div>
      <h1>{project.name}</h1>
      <p>{project.description}</p>
    </div>
  );
};
\`\`\`

### 3️⃣ Mutation - Crear proyecto

\`\`\`tsx
import { useCreateProject } from "@/projects/infrastructure/hooks";

export const CreateProjectForm = () => {
  const { mutate, isPending } = useCreateProject();

  const handleSubmit = (data: ProjectFormData) => {
    mutate(data, {
      onSuccess: (project) => {
        console.log("Creado:", project);
        // Redirigir o mostrar mensaje
      },
      onError: (error) => {
        console.error("Error:", error);
      },
    });
  };

  return (
    <form onSubmit={(e) => { 
      e.preventDefault();
      handleSubmit(/* datos del formulario */);
    }}>
      {/* campos del formulario */}
      <button disabled={isPending}>
        {isPending ? "Creando..." : "Crear"}
      </button>
    </form>
  );
};
\`\`\`

### 4️⃣ Mutation - Actualizar proyecto

\`\`\`tsx
import { useUpdateProject } from "@/projects/infrastructure/hooks";

export const EditProject = ({ projectId }: { projectId: string }) => {
  const { mutate, isPending } = useUpdateProject();

  const handleUpdate = (updatedData: Partial<Project>) => {
    mutate(
      { id: projectId, projectData: updatedData },
      {
        onSuccess: () => {
          alert("Proyecto actualizado!");
        },
      }
    );
  };

  return (
    <button onClick={() => handleUpdate({ name: "Nuevo nombre" })}>
      {isPending ? "Actualizando..." : "Actualizar"}
    </button>
  );
};
\`\`\`

### 5️⃣ Mutation - Eliminar proyecto

\`\`\`tsx
import { useDeleteProject } from "@/projects/infrastructure/hooks";

export const DeleteButton = ({ projectId }: { projectId: string }) => {
  const { mutate, isPending } = useDeleteProject();

  const handleDelete = () => {
    if (confirm("¿Eliminar proyecto?")) {
      mutate(projectId, {
        onSuccess: () => {
          alert("Proyecto eliminado!");
        },
      });
    }
  };

  return (
    <button onClick={handleDelete} disabled={isPending}>
      {isPending ? "Eliminando..." : "Eliminar"}
    </button>
  );
};
\`\`\`

## ⚙️ Configuración de TanStack Query

Ya está configurado en \`ProyectoApp.tsx\`:

\`\`\`tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export const ProyectoApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} /> {/* 🔍 DevTools */}
      <ThemeProvider>
        <RouterProvider router={appRouter} />
      </ThemeProvider>
    </QueryClientProvider>
  );
};
\`\`\`

## 🎨 Características de TanStack Query

### ✅ Automático en los Hooks

- **Caché automático** - Los datos se cachean por \`queryKey\`
- **Refetch automático** - Se actualiza en focus/reconexión
- **Stale time** - Configurable (5 min por defecto)
- **Invalidación** - Al mutar, se invalida automáticamente el cache
- **Estados** - \`isLoading\`, \`isPending\`, \`isError\`, \`isSuccess\`

### 🔄 Invalidación de Cache

Las mutaciones invalidan automáticamente:

\`\`\`tsx
// Al crear/actualizar/eliminar → se invalida "projects"
queryClient.invalidateQueries({ queryKey: ["projects"] });

// Al actualizar → también se invalida el proyecto específico
queryClient.invalidateQueries({ queryKey: ["project", id] });
\`\`\`

## 🏛️ Ventajas de esta Arquitectura

1. **Separación de responsabilidades**
   - UI: Solo presenta datos
   - Hooks: Manejo de estado asíncrono
   - Use Cases: Lógica de negocio
   - Repository: Abstracción de datos

2. **Testeable**
   - Puedes mockear fácilmente los casos de uso
   - Puedes mockear el repositorio
   - Cada capa es independiente

3. **Mantenible**
   - Si cambias de React Query a SWR → solo cambias los hooks
   - Si cambias de axios a fetch → solo cambias el adapter
   - Si cambias la API → solo cambias el repository

4. **Escalable**
   - Agregar nuevas features es consistente
   - El patrón se repite en todo el código

## 🔧 Comandos Útiles

\`\`\`bash
# Instalar dependencias
yarn install

# Iniciar desarrollo
yarn dev

# Build
yarn build
\`\`\`

## 📚 Referencias

- [TanStack Query Docs](https://tanstack.com/query/latest)
- [Clean Architecture - Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

---

**Nota**: Este README explica cómo usar TanStack Query respetando los principios de Arquitectura Limpia en este proyecto.
