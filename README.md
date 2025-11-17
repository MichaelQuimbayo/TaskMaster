# TaskMaster - Prueba Técnica (Ionic + Capacitor)


TaskMaster es una app demo en Ionic/Angular que implementa una lista de tareas con:
- Crear, editar y eliminar tareas
- Categorías (crear, editar, asignar, filtrar)
- Marcar tareas como completadas
- Almacenamiento local (localStorage)

Nota: La prueba originalmente solicitaba configurar el proyecto con Cordova, pero debido a incompatibilidades con las versiones actualSes de Android y herramientas modernas de compilación, opte por Capacitor, que es el stack oficial y recomendado por Ionic.

La aplicación está organizada siguiendo una arquitectura modular y escalable, inspirada en principios de Clean Architecture, dividiendo responsabilidades en capas claras:

src/
└── app/
    ├── core/
    │   └── storage/
    │       └── local-storage.service.ts    # Abstracción centralizada para manejar LocalStorage.
    │
    ├── data/
    │   ├── remote/                         # (Preparado para integrar APIs o Firebase si se desea)
    │   └── repositories/
    │       ├── task.repository.ts          # Lógica de acceso a datos de tareas.
    │       └── category.repository.ts      # Lógica de acceso a datos de categorías.
    │
    ├── domain/
    │   └── models/
    │       ├── task.model.ts               # Modelos tipados para tareas.
    │       └── category.model.ts           # Modelos tipados para categorías.
    │
    ├── modules/
    │   ├── home/                           # Pantalla principal (lista + filtro).
    │   ├── category/                       # Gestión de categorías.
    │   ├── new-category/                   # Crear/editar categoría.
    │   └── new-task/                       # Crear/editar tareas.
    │
    ├── services/
    │   ├── task.service.ts                 # Reglas de negocio de tareas.
    │   └── category.service.ts             # Reglas de negocio de categorías.
    │
    └── shared/
        └── components/
            ├── task-card/                  # Card reutilizable para mostrar tareas.
            ├── category-filters/           # Filtros reutilizables por categoría.
            └── task-modal/                 # Modal reutilizable para acciones rápidas.



## Estructura del repositorio
