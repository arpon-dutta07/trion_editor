---
description: Repository Information Overview
alwaysApply: true
---

# Trion Editor Information

## Summary
A modern Next.js web application bootstrapped with `create-next-app`, featuring authentication via NextAuth, MongoDB database integration with Prisma ORM, and a comprehensive UI component library built with Radix UI and shadcn/ui. The project implements role-based access control with protected routes and a middleware-based authentication system.

## Structure
- **`/app`** - Next.js App Router with route groups: `(root)` for public pages, `(auth)` for authentication pages, and `/api` for backend routes
- **`/components`** - Reusable shadcn/ui components in `/components/ui` directory
- **`/features`** - Feature modules including `auth`, `home`, and `test` with organized components and actions
- **`/hooks`** - Custom React hooks like `use-mobile`
- **`/lib`** - Utilities, database client, and helper functions
- **`/prisma`** - Database schema with User and Account models for NextAuth integration
- **`/public`** - Static assets (SVGs, images)

## Language & Runtime
**Language**: TypeScript 5  
**Runtime**: Node.js (via Next.js)  
**Framework**: Next.js 15.5.9 with React 19, React DOM 19  
**Build System**: Next.js with Turbopack  
**Package Manager**: npm

## Dependencies

**Main Dependencies**:
- **Frontend**: React 19, React DOM 19, Next.js 15.5.9
- **Styling**: Tailwind CSS 4, @tailwindcss/postcss 4
- **UI Components**: Radix UI (20+ component primitives), shadcn/ui components
- **Authentication**: NextAuth 5.0.0-beta.30, @auth/prisma-adapter 2.11.1
- **Database**: Prisma Client 6.10.0, MongoDB via Prisma
- **Forms & Validation**: react-hook-form 7.68.0, @hookform/resolvers 5.2.2, Zod 4.2.0
- **Icons**: Lucide React 0.561.0
- **Utilities**: clsx 2.1.1, class-variance-authority 0.7.1, tailwind-merge 3.4.0, date-fns 4.1.0
- **Charts**: Recharts 2.15.4
- **Notifications**: Sonner 2.0.7
- **Layout**: react-resizable-panels 3.0.6, embla-carousel-react 8.6.0

**Development Dependencies**:
- TypeScript 5, @types/node 20, @types/react 19, @types/react-dom 19
- ESLint 9, eslint-config-next 15.3.4
- Prisma CLI 6.10.0
- Tailwind CSS 4, @tailwindcss/postcss 4

## Build & Installation

```bash
npm install
npm run dev          # Development server with Turbopack (http://localhost:3000)
npm run build        # Production build
npm start            # Production server
npm run lint         # ESLint linting
```

## Docker
No Docker configuration found in the repository.

## Main Files & Resources

**Entry Points**:
- `app/layout.tsx` - Root layout with SessionProvider integration
- `app/(root)/page.tsx` - Home page with authenticated content
- `app/(auth)/auth/sign-in/page.tsx` - Sign-in page
- `app/api/auth/[...nextauth]/route.ts` - NextAuth dynamic route handler

**Configuration Files**:
- `next.config.ts` - Next.js configuration
- `tsconfig.json` - TypeScript configuration with path aliases (@/*)
- `eslint.config.mjs` - ESLint with Next.js and TypeScript rules
- `postcss.config.mjs` - PostCSS with Tailwind CSS plugin
- `components.json` - shadcn/ui configuration
- `auth.ts` - NextAuth setup with sign-in callbacks, JWT, and session handling
- `auth.config.ts` - Authentication provider configuration
- `middleware.ts` - Route protection middleware with public/protected route logic
- `routes.ts` - Route definitions for auth, public, and protected routes
- `prisma/schema.prisma` - Database schema with User (id, name, email, image, role, timestamps) and Account (OAuth provider data)

## Database
**Provider**: MongoDB  
**ORM**: Prisma 6.10.0  
**Models**:
- **User**: id (CUID), name, email (unique), image, role (enum: ADMIN/USER/PREMIUM_USER), createdAt, updatedAt
- **Account**: OAuth provider data for NextAuth, linked to User via userId

## Authentication
**Strategy**: NextAuth v5 with JWT session strategy  
**Provider Integration**: Supports multiple OAuth providers via Account model  
**Adapter**: Prisma Adapter  
**Session Management**: JWT-based with user role and account data enrichment

## Testing & Validation
**Linting**: ESLint 9 with next/core-web-vitals and next/typescript rules  
**Code Quality**: No test framework currently configured

**Run Command**:
```bash
npm run lint
```

## Environment & Configuration
- **Target**: ES2017 (TypeScript compiled target)
- **Strict Mode**: TypeScript strict mode enabled
- **Path Aliases**: `@/*` maps to root directory
- **Font Optimization**: Geist font family from next/font/google
