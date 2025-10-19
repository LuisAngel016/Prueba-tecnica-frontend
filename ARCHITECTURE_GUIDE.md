# 🏗️ Guía de Arquitectura del Proyecto

## 📋 Resumen Ejecutivo

Este proyecto frontend utiliza **Clean Architecture** con una organización modular por dominios de negocio. Cada módulo (como `projects`) es independiente y sigue la misma estructura de 4 capas bien definidas.

## 🎯 Principios Clave

### 1. **Separación por Capas**

Cada módulo se divide en 4 capas con responsabilidades específicas:

```
Domain (Dominio)
  ↓ usa
Application (Casos de Uso)
  ↓ implementa
Infrastructure (Implementaciones)
  ↓ usa
Presentation (UI)
```

### 2. **Independencia del Dominio**

El núcleo del negocio (Domain) **NO** depende de tecnologías específicas (React, HTTP, etc.). Esto permite:
- Cambiar tecnologías sin afectar la lógica de negocio
- Testear fácilmente
- Reutilizar lógica

### 3. **Contenedor IoC Compartido**

Existe un contenedor global (`src/shared/ioc/`) que proporciona dependencias compartidas (como el `httpClient`) a todos los módulos, evitando duplicación.

---

## 📂 Estructura de un Módulo

Ejemplo con `projects`:

```
src/projects/
│
├── domain/                    # 🎯 Núcleo del negocio
│   ├── entities/             # Modelos de datos (Project)
│   └── repositories/         # Interfaces (IProjectRepository)
│
├── application/              # 💼 Lógica de negocio
│   ├── get-all-projects.usecase.ts
│   ├── create-project.usecase.ts
│   └── ...
│
├── infrastructure/           # 🔧 Implementaciones técnicas
│   ├── hooks/               # useGetProjects, useCreateProject (TanStack Query)
│   ├── repositories/        # ProjectRepositoryImpl (hace peticiones HTTP)
│   ├── mappers/            # Transforma API ↔ Domain
│   └── dto/                # Formatos de la API
│
├── presentation/            # 🎨 Interfaz de usuario
│   ├── components/         # Componentes React
│   └── pages/             # ProjectsPage
│
└── IoC/                    # 🏭 Inyección de dependencias
    └── project.container.ts  # Conecta todas las piezas
```

---

## 🔄 Flujo de Datos Completo

**Usuario quiere ver la lista de proyectos:**

1. **Presentation**: `ProjectsPage` usa el hook `useGetProjects()`
2. **Infrastructure**: Hook llama a `getAllProjectsUseCase.execute()`
3. **Application**: Caso de uso ejecuta `repository.getAll()`
4. **Infrastructure**: Repositorio hace `GET /api/projects` con `httpClient`
5. **Respuesta**: Datos regresan por el mismo camino hasta el componente

```
Usuario → Component → Hook (TanStack Query) → Use Case → Repository → httpClient → API
```

---

## 📦 Las 4 Capas Explicadas

### 1️⃣ **Domain** - El Corazón del Negocio

**Qué contiene:**
- **Entities**: Modelos de datos (`Project` con id, name, description, etc.)
- **Repositories**: Solo **interfaces** que definen operaciones (getAll, create, update, delete)

**Regla de oro:** NO depende de nada externo. Sin imports de React, Axios, etc.

**Ejemplo:** La entidad `Project` define qué campos tiene un proyecto, sin saber cómo se obtiene de la base de datos.

---

### 2️⃣ **Application** - Qué Hace el Sistema

**Qué contiene:**
Casos de uso, cada uno representa una acción del usuario:
- `get-all-projects.usecase.ts`
- `create-project.usecase.ts`
- `update-project.usecase.ts`
- `delete-project.usecase.ts`

**Responsabilidad:** Contiene la lógica de negocio (validaciones, reglas, transformaciones).

**Ejemplo:** El caso de uso "Crear Proyecto" valida que el nombre no esté vacío y que las fechas sean coherentes antes de llamar al repositorio.

---

### 3️⃣ **Infrastructure** - Cómo se Implementa

**Qué contiene:**

- **Hooks**: Usan TanStack Query para manejar estado del servidor
  - `useGetProjects()` - Query
  - `useCreateProject()` - Mutation

- **Repositories**: Implementación real que hace peticiones HTTP
  - `ProjectRepositoryImpl` implementa `IProjectRepository`

- **Mappers**: Convierten datos entre API y Domain
  - `snake_case` → `camelCase`
  - `string` → `Date`

- **DTOs**: Estructuras exactas de la API

**Responsabilidad:** Aquí SÍ usamos tecnologías específicas (Axios, TanStack Query).

---

### 4️⃣ **Presentation** - La Interfaz

**Qué contiene:**
- **Components**: Componentes React reutilizables (tablas, modales, formularios)
- **Pages**: Páginas completas (`ProjectsPage`)

**Responsabilidad:** 
- Renderizar UI
- Usar hooks de infrastructure
- Capturar eventos del usuario
- Mostrar loading y errores

**NO hace:** Lógica de negocio ni peticiones HTTP directas.

---

## ⚡ TanStack Query - Estado del Servidor

Los hooks de infrastructure usan **TanStack Query** para:

- ✅ **Cache automático**: No hace peticiones innecesarias
- ✅ **Loading states**: `isLoading`, `isPending`
- ✅ **Error handling**: `isError`, `error`
- ✅ **Revalidación**: Actualiza datos automáticamente
- ✅ **Invalidación**: Al crear/modificar, refresca la lista automáticamente

**Ventaja:** Los componentes no se preocupan por manejar cache, loading o errores.

---

## 🏭 Contenedor IoC - El Ensamblador

**Archivo:** `src/projects/IoC/project.container.ts`

**Qué hace:**
1. Importa el `httpClient` del contenedor global
2. Crea el repositorio con ese httpClient
3. Crea los casos de uso con el repositorio
4. Exporta los casos de uso para que los hooks los usen

**Ejemplo simplificado:**
```typescript
import { container } from "@/shared/ioc";

const projectRepository = new ProjectRepositoryImpl(container.httpClient);

export const getAllProjectsUseCase = new GetAllProjectsUseCase(projectRepository);
export const createProjectUseCase = new CreateProjectUseCase(projectRepository);
```

---

## 🌐 Contenedor Global (Shared)

**Archivo:** `src/shared/ioc/container.ts`

**Para qué sirve:** 
Proporciona una **única instancia** del `httpClient` (Axios) que todos los módulos comparten.

**Ventajas:**
- ✅ Configuración centralizada (baseURL, headers, interceptors)
- ✅ Eficiente (una sola instancia para toda la app)
- ✅ Fácil de testear (mockeas el contenedor)

---

## 🎨 Convenciones de Nombres

| Tipo | Patrón | Ejemplo |
|------|--------|---------|
| Entidades | `<nombre>.entity.ts` | `project.entity.ts` |
| Casos de Uso | `<acción>-<entidad>.usecase.ts` | `create-project.usecase.ts` |
| Hooks Query | `useGet<Entidades>.tsx` | `useGetProjects.tsx` |
| Hooks Mutation | `use<Acción><Entidad>.tsx` | `useCreateProject.tsx` |
| Páginas | `<Entidad>Page.tsx` | `ProjectsPage.tsx` |

---

## ✅ Reglas de Dependencia

**Prohibido:**
- ❌ Domain importa de Application o Infrastructure
- ❌ Application importa de Infrastructure
- ❌ Un módulo importa directamente de otro módulo

**Permitido:**
- ✅ Presentation usa Infrastructure
- ✅ Infrastructure implementa Domain
- ✅ Application usa Domain
- ✅ Todos usan shared

---

## 🚀 Agregar un Nuevo Módulo

Para crear un módulo `users`:

1. Crea la estructura de carpetas (domain, application, infrastructure, presentation, IoC)
2. Define la entidad `User` y la interface `IUserRepository`
3. Crea los casos de uso
4. Implementa el repositorio usando `container.httpClient`
5. Crea hooks con TanStack Query
6. Crea el contenedor IoC
7. Crea componentes React

**Siempre el mismo patrón.**

---

## 💡 Ventajas de Esta Arquitectura

| Beneficio | Descripción |
|-----------|-------------|
| **Testeable** | Cada capa se testea independientemente |
| **Mantenible** | Código organizado y predecible |
| **Escalable** | Agregar módulos es consistente |
| **Flexible** | Cambiar tecnologías sin romper el negocio |
| **Comprensible** | Patrón repetible y documentado |

---

## 📚 Documentación Detallada

- **Código completo**: Ver carpeta `src/projects/` como ejemplo de referencia
- **TanStack Query**: Ver `TANSTACK_QUERY_GUIDE.md` para queries y mutations
- **Sistema IoC**: Ver `IOC_ARCHITECTURE.md` para contenedores a profundidad

---

**Resumen:** Clean Architecture + Módulos por Dominio + TanStack Query + IoC Compartido = Código mantenible y escalable.
