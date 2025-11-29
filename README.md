# StorePro - Modern E-commerce POC

Una aplicación de comercio electrónico de alto rendimiento construida con **Next.js**, enfocada en la velocidad, accesibilidad y una experiencia de usuario moderna.

![Lighthouse Score](https://img.shields.io/badge/Lighthouse-98%2F100-success?style=flat-square)
![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat-square)
![Zustand](https://img.shields.io/badge/State-Zustand-orange?style=flat-square)

## 🚀 Características Principales

- **Arquitectura Híbrida (ISR):** Generación estática incremental para un rendimiento óptimo y datos actualizados.
- **Gestión de Estado Global:** Carrito de compras persistente utilizando **Zustand** (se mantiene al recargar).
- **UI/UX Moderna:** Diseño totalmente responsivo implementado con **Tailwind CSS v4**.
- **Accesibilidad (a11y):** Cumplimiento de pautas WCAG AA (HTML semántico, gestión de foco, contraste de color y etiquetas ARIA).
- **Performance First:**
  - Optimización de imágenes con `next/image` y carga prioritaria (LCP < 2.5s).
  - Carga diferida (Lazy Loading) de componentes pesados como el Carrito.
  - Eliminación de JavaScript legado mediante configuración estricta de `browserslist`.

## 🛠️ Stack Tecnológico

- **Framework:** Next.js (Pages Router)
- **Estilos:** Tailwind CSS v4 + PostCSS
- **Estado:** Zustand + Middleware Persist
- **Iconos:** Lucide React
- **Fuente de Datos:** FakeStoreAPI

## 📦 Instalación y Uso

1. **Clonar el repositorio:**

   ```bash
   git clone <tu-repo-url>
   cd store-pro
   ```

2. **Instalar dependencias:**

   ```bash
   npm install
   ```

3. **Ejecutar en desarrollo:**

   ```bash
   npm run dev
   ```

4. **Construir para producción (Recomendado para ver performance real):**

   ```bash
   npm run build
   npm start
   ```

## 📈 Métricas de Rendimiento

El proyecto ha sido optimizado para alcanzar puntuaciones de "zona verde" en Google Lighthouse:

- **Performance:** 98-100
- **Accessibility:** 95+
- **Best Practices:** 100
- **SEO:** 100

## 📂 Estructura del Proyecto

```
/src
  ├── components/    # Componentes UI (Header, Footer, CartSidebar)
  ├── pages/         # Rutas y Vistas (Index, Product Detail)
  ├── store/         # Estado global (Zustand)
  └── styles/        # Configuración CSS global
```

---

Desarrollado como prueba de concepto técnica moderna.
