# ProFact - Sistema de Facturación Electrónica Inteligente

Sistema web completo para gestión de inventario, facturación y administración empresarial.

## Stack Tecnológico

### Frontend
| Tecnología | Uso |
|------------|-----|
| React 19 | Framework UI (componentes `.jsx`) |
| JavaScript (JSX) | Lenguaje de programación |
| Vite 5 | Compilador y bundler |
| React Router 7 | Navegación SPA |
| Recharts | Gráficas y reportes |
| jsPDF | Generación de facturas PDF |

### Backend
| Tecnología | Uso |
|------------|-----|
| Spring Boot 3.3 | API REST |
| Java 21 | Lenguaje |
| Spring Security + JWT | Autenticación |
| H2 Database | BD embebida (desarrollo) |

### Integración Externa
| Tecnología | Uso |
|------------|-----|
| Firebase Authentication | Login/Registro de usuarios |
| Cloud Firestore | Base de datos de productos, categorías y usuarios |

---

## Funcionalidades

### 1. Landing Pages (HTML + CSS standalone)
- Páginas estáticas independientes: Inicio, Nosotros, Planes, Capacitación
- Navbar responsive con enlaces a páginas HTML
- Funcionan sin JavaScript ni backend

### 2. Login / Registro (React + Firebase)
- **Firebase Auth**: Login y registro con correo y contraseña
- **Spring Boot**: Login alternativo con JWT
- Credenciales locales: `root` / `12345`
- Roles: ADMIN, VENDEDOR, usuario

### 3. Dashboard Principal (React + Firestore)
- Métricas en tiempo real (productos, stock, alertas)
- Últimos productos registrados
- Conectado a Firestore

### 4. Inventario - CRUD Productos (React + Firestore)
- Crear, leer, actualizar y eliminar productos
- Gestión de categorías
- Control de stock con alertas

### 5. Usuarios (React + Firestore + Firebase Auth)
- Crear usuarios con credenciales de acceso
- Roles: administrador, vendedor, usuario
- Activar/desactivar usuarios

### 6. Compras (React + Spring Boot)
- Registro de compras con proveedor
- Detalle de productos y cantidades
- Cálculo automático de subtotal, IVA y total

### 7. Ventas (React + Spring Boot)
- Registro de ventas con cliente
- Generación de facturas PDF
- Historial de ventas

### 8. Reportes (React + Spring Boot)
- Gráficas de ventas y compras (Recharts)
- Productos más vendidos
- KPIs y métricas financieras

### 9. Clientes y Proveedores (React + Spring Boot)
- Gestión completa de clientes
- Gestión completa de proveedores

### 10. Configuración (React + Spring Boot)
- Parámetro global de IVA
- Conectado con Compras y Ventas

---

## Estructura del Proyecto

```
ProyectoFinal_Interfaces/
├── frontend/                              # React + Vite + JavaScript
│   ├── public/pages/                      # Landing pages HTML standalone
│   │   ├── inicio.html
│   │   ├── nosotros.html
│   │   ├── planes.html
│   │   └── capacitacion.html
│   ├── src/
│   │   ├── main.jsx                       # Punto de entrada React
│   │   ├── App.jsx                        # BrowserRouter root
│   │   ├── index.css                      # Estilos landing pages
│   │   ├── dashboard.css                  # Estilos dashboard (todos los módulos)
│   │   ├── core/
│   │   │   ├── config/firebase.config.js  # Configuración Firebase
│   │   │   ├── context/AuthContext.jsx     # Autenticación (Firebase + fallback)
│   │   │   ├── services/firestore.service.js  # Servicio CRUD Firestore
│   │   │   ├── api/api.js                 # Cliente HTTP (Spring Boot)
│   │   │   ├── components/                # Componentes reutilizables (Modal, HtmlRedirect)
│   │   │   ├── layouts/                   # Layouts (DashboardLayout, LandingLayout)
│   │   │   └── router/AppRouter.jsx       # Rutas de la aplicación
│   │   └── modules/
│   │       ├── landing/                   # Páginas de login
│   │       │   ├── pages/Sesion.jsx
│   │       │   └── components/ (Navbar, Footer)
│   │       └── dashboard/                 # Módulos del dashboard
│   │           ├── pages/                 # Compras, Ventas, Inventario, etc.
│   │           └── components/            # Sidebar, Topbar
│   ├── index.html                         # Entry HTML
│   ├── vite.config.js                     # Configuración Vite 5
│   └── package.json
│
├── backend/                               # Spring Boot + Java 21
│   ├── src/main/java/com/binasystem/profact/
│   │   ├── controller/                    # Endpoints REST
│   │   ├── service/                       # Lógica de negocio
│   │   ├── entity/                        # Entidades JPA
│   │   ├── dto/                           # Data Transfer Objects
│   │   ├── repository/                    # Repositorios Spring Data
│   │   ├── security/                      # JWT + Spring Security
│   │   ├── config/                        # Configuración CORS, datos
│   │   └── exception/                     # Manejo de errores
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
│
└── README.md
```

---

## Configuración

### Requisitos previos
- Node.js 18+
- Java 21+
- Cuenta de Firebase (gratis)

### Paso 1: Configurar Firebase

1. Ir a [Firebase Console](https://console.firebase.google.com/)
2. Crear proyecto (ej: `profact-web`)
3. Habilitar **Authentication** > **Email/Password**
4. Crear **Cloud Firestore** > **Start in test mode**
5. Ir a **Configuración del proyecto** > **Tus apps** > ícono **Web** `</>`
6. Copiar la configuración

### Paso 2: Crear archivo `.env`

En `frontend/.env`:
```
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu_proyecto
VITE_FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

### Paso 3: Reglas de Firestore

En Firestore > **Reglas**, pegar:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```
Click **Publicar**.

### Paso 4: Instalar dependencias

**Frontend:**
```bash
cd frontend
npm install
```

**Backend:**
No requiere instalación manual, Maven descarga las dependencias automáticamente.

### Paso 5: Ejecutar

Abrir **dos terminales**:

**Terminal 1 - Backend:**
```bash
cd backend
.\mvnw.cmd spring-boot:run
```
El backend corre en `http://localhost:8081`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
El frontend corre en `http://localhost:5173`

---

## Base de Datos Firebase (Firestore)

### Colección `usuarios`
```json
{
  "nombre": "string",
  "email": "string",
  "rol": "admin | user",
  "activo": true
}
```

### Colección `productos`
```json
{
  "nombre": "string",
  "descripcion": "string",
  "precio": 0.00,
  "stock": 0,
  "stockMinimo": 0,
  "categoriaId": "string",
  "categoriaNombre": "string",
  "activo": true
}
```

### Colección `categorias`
```json
{
  "nombre": "string",
  "descripcion": "string"
}
```

---

## Rutas

### Landing Pages (HTML standalone)
| Ruta | Archivo |
|------|---------|
| `/` | Redirect → `public/pages/inicio.html` |
| `/nosotros` | Redirect → `public/pages/nosotros.html` |
| `/planes` | Redirect → `public/pages/planes.html` |
| `/capacitacion` | Redirect → `public/pages/capacitacion.html` |

### React (requieren JavaScript)
| Ruta | Descripción | Backend |
|------|-------------|---------|
| `/sesion` | Login / Registro | Firebase Auth |
| `/dashboard` | Dashboard principal | Firestore |
| `/dashboard/inventario` | CRUD Productos | Firestore |
| `/dashboard/usuarios` | CRUD Usuarios | Firestore + Auth |
| `/dashboard/compras` | CRUD Compras | Spring Boot |
| `/dashboard/ventas` | CRUD Ventas | Spring Boot |
| `/dashboard/reportes` | Reportes y gráficas | Spring Boot |
| `/dashboard/clientes` | CRUD Clientes | Spring Boot |
| `/dashboard/proveedores` | CRUD Proveedores | Spring Boot |
| `/dashboard/configuracion` | Configuración IVA | Spring Boot |

---

## Notas

- **Landing pages** son HTML + CSS standalone, funcionan sin backend ni Firebase
- **Inventario y Usuarios** usan Firestore (no necesitan Spring Boot)
- **Compras, Ventas, Reportes, Clientes, Proveedores, Configuración** usan Spring Boot
- Si Spring Boot no está corriendo, esas páginas mostrarán error de conexión
- La base de datos H2 del backend se crea automáticamente al iniciar
