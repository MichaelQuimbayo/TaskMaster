# TaskMaster - Prueba Técnica (Ionic + Capacitor)


✔️ Estado de Requerimientos — Prueba Técnica Mobile (Ionic)

A continuación se presenta una tabla con todos los requerimientos de la prueba técnica, especificando cuáles fueron realizados dentro del alcance del proyecto:

1. Versionamiento de la Aplicación

| Subtarea                                         | Estado      |
| ------------------------------------------------ | ----------- |
| Creación de repositorio público y commit inicial |  Realizado |
| Subida de la aplicación base al repositorio      |  Realizado |

2. Estructura Base para Aplicación Híbrida

| Subtarea                                           | Estado                                                                                 |
| -------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Configurar proyecto para compilar en Android e iOS |  Parcial — Se implementó con **Capacitor**, no Cordova. Compilación iOS no generada. |
| Instrucciones claras para compilar y ejecutar      |  Realizado                                                                            |

3. Firebase & Remote Config

| Subtarea                                     | Estado                                                   |
| -------------------------------------------- | -------------------------------------------------------- |
| Configurar Firebase en la app                |  Parcial — Firebase configurado, sin integración total |
| Implementar Feature Flag con Remote Config   |  No realizado                                           |
| Demostración de cómo afecta la funcionalidad |  No realizado                                           |

4. Funcionalidad Base (To-Do)

| Subtarea                                | Estado      |
| --------------------------------------- | ----------- |
| Crear tareas                            |  Realizado |
| Editar tareas                           |  Realizado |
| Eliminar tareas                         |  Realizado |
| Marcar tareas como completadas          |  Realizado |
| Guardar estado con almacenamiento local |  Realizado |

5. Sistema de Categorías

| Subtarea                     | Estado      |
| ---------------------------- | ----------- |
| Crear categorías             |  Realizado |
| Editar categorías            |  Realizado |
| Eliminar categorías          |  Realizado |
| Asignar categoría a tareas   |  Realizado |
| Filtrar tareas por categoría |  Realizado |

6. Optimización de Rendimiento

| Subtarea                                         | Estado                              |
| ------------------------------------------------ | ----------------------------------- |
| Optimizar carga inicial de la app                |  Parcial — Optimizaciones básicas |
| Manejo eficiente de grandes cantidades de tareas |  Parcial                          |
| Minimizar uso de memoria                         |  Parcial                          |

7. Exportación de Binarios

| Subtarea              | Estado         |
| --------------------- | -------------- |
| Generar APK funcional |  Realizado    |
| Generar IPA para iOS  |  No realizado |

8. Entrgables

| Subtarea                           | Estado              |
| ---------------------------------- | --------------------|
| README documentado                 |  Realizado          |
| Capturas, GIF o video demostrativo |  Realizado          |
| Respuestas a preguntas finales     |  Realizado          |
| Subir APK exportado                |  Realizado          |

10. Preguntas Finales

1. ¿Cuáles fueron los principales desafíos que enfrentaste al implementar las nuevas funcionalidades?
 - Compatibilidad y configuración de Capacitor, especialmente con Gradle y versiones de Java necesarias para compilar el APK
 - Manejo del almacenamiento local, garantizando que tareas y categorías se mantuvieran sincronizadas y persistentes.
 - Diferencias visuales entre Web y Android, ya que algunos estilos se renderizan distinto en WebView, sin embargo falto ese ajuste

2. ¿Qué técnicas de optimización de rendimiento aplicaste y por qué?

 - Minimizar operaciones de escritura en localStorage, guardando únicamente cuando es necesario

3. ¿Cómo aseguraste la calidad y mantenibilidad del código?

 - Separación clara por capas: componentes, servicios, modelos y almacenamiento
 - Servicios reutilizables para manejo de tareas, categorías y almacenamiento
 - Arquitectura limpia y modular, evitando dependencias cruzadas


Nota: La prueba originalmente solicitaba configurar el proyecto con Cordova, pero debido a incompatibilidades con las versiones actuales de Android y herramientas modernas de compilación, opte por Capacitor, que es el stack oficial y recomendado por Ionic.

Video Demostrtico TaskMaster:





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


Instalar dependencia:

- npm install

Ejecutar en modo desarrollo web

- ionic serve

Compilacion para android

- ionic build

- npx cap sync android

Abrir Android Studio

- npx cap open android

Generar APK | En Andorid Studio 

Build > Build Bundle(s) / APK(s) > Build APK(s)

Ubicacion del APK

android/app/build/outputs/apk/release/

LiNK DESCARGA APK

https://drive.google.com/file/d/1c7z-TeTYkCkFcQ1a9Rge2zC3h_SdHPtU/view?usp=sharing

