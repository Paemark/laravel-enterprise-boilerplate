# 🚀 Laravel 13 + Filament 5 + Next.js 16 Enterprise Boilerplate

> A production-grade monorepo boilerplate combining a headless **Laravel 13** API, an elegant **Filament 5** admin panel, and a lightning-fast **Next.js 16** (React 19) frontend — all wired together with stateful cookie authentication via **Laravel Sanctum** and fine-grained access control through **Spatie Roles & Permissions**.

![Laravel](https://img.shields.io/badge/Laravel-13-FF2D20?style=flat-square&logo=laravel)
![Filament](https://img.shields.io/badge/Filament-5-FDA4AF?style=flat-square&logo=laravel)
![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![PHP](https://img.shields.io/badge/PHP-8.4-777BB4?style=flat-square&logo=php)
![Node](https://img.shields.io/badge/Node-22-339933?style=flat-square&logo=node.js)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## ✨ Features

- 🔐 **Stateful Cookie Authentication** — Laravel Sanctum SPA auth (no JWTs, no tokens in localStorage)
- 🛡️ **Role & Permission Management** — Spatie `laravel-permission` with seeders for default roles
- 🎨 **Filament 5 Admin Panel** — Pre-configured resources, dashboards, and user management
- ⚡ **Next.js 16 App Router** — Server Components, React 19, Turbopack, and streaming SSR
- 🧪 **Testing Suite** — Pest for backend, Vitest + Playwright for frontend
- 📦 **Monorepo Friendly** — Clean separation between `backend/` and `frontend/`
- 🐳 **Docker Ready** — Sail + Docker Compose configurations included
- 📝 **OpenAPI Spec** — Auto-generated Swagger docs via `scribe`
- 🌐 **i18n Ready** — Multi-language support out of the box
- 🎯 **CI/CD Pipelines** — GitHub Actions for linting, testing, and deployment

---

## 🏗️ Architecture Overview

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│   Next.js 16    │──────▶│  Laravel 13     │◀──────│   Filament 5    │
│   (Frontend)    │  SPA  │   (API + Auth)  │       │   (Admin UI)    │
│   React 19      │◀──────│   Sanctum       │       │   TALL Stack    │
└─────────────────┘       └─────────────────┘       └─────────────────┘
         │                          │
         ▼                          ▼
   [Browser Cookies]         [MySQL / PostgreSQL]
   (httpOnly, secure)        [Redis Cache/Queue]
```

**Authentication Flow:**
1. Frontend calls `/sanctum/csrf-cookie` to obtain the CSRF token
2. User submits credentials to `/login`
3. Laravel sets an `httpOnly` session cookie
4. Subsequent requests include the cookie automatically (same-site)
5. Middleware verifies session + permissions via Spatie guards

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

| Tool | Version | Installation |
|------|---------|--------------|
| PHP | ≥ 8.4 | [php.net](https://www.php.net/) |
| Composer | ≥ 2.7 | [getcomposer.org](https://getcomposer.org/) |
| Node.js | ≥ 22 LTS | [nodejs.org](https://nodejs.org/) |
| npm| ≥ 9 | `npm install -g pnpm` |
| MySQL / PostgreSQL | ≥ 8.0 / 15 | Local or Docker |
| Redis | ≥ 7.0 | Local or Docker |
| Git | ≥ 2.40 | [git-scm.com](https://git-scm.com/) |

> 💡 **Tip:** The easiest way to satisfy all requirements is via [Laravel Herd](https://herd.laravel.com/) (macOS/Windows) or [Laravel Sail](https://laravel.com/docs/sail) (Docker).

---

## 🚀 Getting Started

### Step 1 — Clone the Repository

```bash
git clone https://github.com/your-org/laravel-nextjs-boilerplate.git
cd laravel-nextjs-boilerplate
```

### Step 2 — Backend Setup (Laravel 13 + Filament 5)

```bash
# Navigate to the backend directory
cd backend

# Install PHP dependencies
composer install

# Copy the environment file
cp .env.example .env

# Generate the application key
php artisan key:generate

# Configure your database in .env (see Step 4)

# Run database migrations + seeders
php artisan migrate --seed

# Install Filament panel assets
php artisan filament:install --panels

# Link the storage directory
php artisan storage:link


```

### Step 3 — Frontend Setup (Next.js 16)

```bash
# From the repository root, navigate to frontend
cd ../frontend

# Install Node dependencies with pnpm
npm install

# Copy environment variables
cp .env.example .env.local
```

### Step 4 — Environment Configuration

#### Backend `.env` (backend/.env)

```env
APP_NAME="Enterprise Boilerplate"
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://127.0.0.1:8000
APP_FRONTEND_URL=http://127.0.0.1:3000

# Database
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=boilerplate
DB_USERNAME=root
DB_PASSWORD=

# Redis (cache, sessions, queues)
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

# Sanctum
SANCTUM_STATEFUL_DOMAINS=127.0.0.1:3000
FRONTEND_URL=http://127.0.0.1:3000

SESSION_DOMAIN=null
SESSION_DRIVER=database
SESSION_LIFETIME=120
SESSION_ENCRYPT=false
SESSION_PATH=/

# Mail (use Mailtrap or Mailhog locally)
MAIL_MAILER=smtp
MAIL_HOST=127.0.0.1
MAIL_PORT=1025
```

#### Frontend `.env.local` (frontend/.env.local)

```env
NEXT_PUBLIC_BACKEND_URL=http://127.0.0.1:8000
```

> ⚠️ **Important:** `SANCTUM_STATEFUL_DOMAINS` and `SESSION_DOMAIN` must match your frontend URL exactly, or cookie authentication will fail.

### Step 5 — Start the Development Servers

Open **three terminal windows**:

**Terminal 1 — Laravel API + Filament:**
```bash
cd backend
php artisan serve
# → http://127.0.0.1:8000
# → Admin panel: http://127.0.0.1:8000/admin
```

**Terminal 2 — Queue Worker:**
```bash
cd backend
php artisan queue:work
```

**Terminal 3 — Next.js Frontend:**
```bash
cd frontend
npm dev
# → http://127.0.0.1:3000
```

---

## 🔑 Default Credentials

After running the seeders, the following accounts are available:

| Role | Email | Password | Access |
|------|-------|----------|--------|
| Super Admin | `admin@boilerplate.com` | `password` | Full access to Filament + API |

> 🔒 **Change these credentials immediately in production!**

---

## 🛡️ Roles & Permissions

Roles and permissions are managed via **Spatie Laravel Permission** and seeded in `RolesPermissionsSeeder`:

```php
// Default permissions
Permission::create(['name' => 'view users']);
Permission::create(['name' => 'create users']);
Permission::create(['name' => 'edit users']);
Permission::create(['name' => 'delete users']);
Permission::create(['name' => 'manage roles']);

// Default roles
$admin = Role::create(['name' => 'super-admin']);
$admin->givePermissionTo(Permission::all());

$manager = Role::create(['name' => 'manager']);
$manager->givePermissionTo(['view users', 'edit users']);
```

### Checking Permissions in Laravel

```php
// In controllers
if (auth()->user()->can('edit users')) { ... }

// In middleware
Route::middleware('permission:edit users')->group(...);

// In Filament resources
public static function canView(Model $record): bool
{
    return auth()->user()->can('view users');
}
```

### Checking Permissions in Next.js

```tsx
import { useAuth } from '@/lib/auth';

export default function AdminButton() {
  const { user, can } = useAuth();

  if (!can('edit users')) return null;

  return <button>Edit</button>;
}
```

---

## 🚢 Production Deployment

### Backend

```bash
cd backend
composer install --optimize-autoloader --no-dev
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan migrate --force
```

### Frontend

```bash
cd frontend
npm run build
npm run dev
# Or deploy to Vercel / Netlify / Cloudflare Pages
```

### Recommended Stack

| Component | Recommendation |
|-----------|----------------|
| Hosting (Backend) | Laravel Forge + DigitalOcean |
| Hosting (Frontend) | Vercel |
| Database | PlanetScale / AWS RDS |
| Cache/Queue | Upstash Redis |
| CDN | Cloudflare |
| Monitoring | Sentry + Flare |

---

## 📚 Useful Commands

```bash
# Backend
php artisan make:filament-resource Post --generate
php artisan make:policy PostPolicy --model=Post
php artisan permission:show
php artisan sanctum:prune-expired --hours=24

# Frontend
npm run lint
npm run format
npm run type-check
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

We follow [Conventional Commits](https://www.conventionalcommits.org/) and enforce linting via pre-commit hooks.

---

## 📄 License

This project is open-sourced software licensed under the [MIT license](LICENSE).

---

## 🙏 Acknowledgments

- [Laravel](https://laravel.com) — The PHP framework for web artisans
- [Filament](https://filamentphp.com) — The TALL stack admin panel
- [Next.js](https://nextjs.org) — The React framework for the web
- [Spatie](https://spatie.be) — For the excellent permission package
- [shadcn/ui](https://ui.shadcn.com) — Beautiful, accessible components

---

<p align="center">
  Made with ❤️ by Paemark Designers for the Laravel, React & Next.js community
</p>
