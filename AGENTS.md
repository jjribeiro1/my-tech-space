# AGENTS.md - Development Guidelines for My Tech Space

## Project Overview

A Next.js 16 application for organizing and sharing developer knowledge. Uses App Router, React 19, TypeScript 5.9, Tailwind CSS 4, and Drizzle ORM with PostgreSQL.

## Build/Lint/Test Commands

```bash
# Development (uses Turbopack)
pnpm dev

# Production build
pnpm build

# Lint with ESLint
pnpm lint

# Format code with Prettier (TSX files only)
pnpm format

# Database commands
pnpm db:generate  # Generate Drizzle migrations
pnpm db:migrate   # Run Drizzle migrations
```

**Note**: No test framework is currently configured in this project.

## Code Style Guidelines

### TypeScript

- Use **strict mode** enabled
- Prefer `type` over `interface` for object shapes
- Export types with PascalCase names (e.g., `SigninInput`, `ActionResponse`)
- Use path alias `@/*` for imports from `src/`

### Naming Conventions

| Type              | Convention                | Example                            |
| ----------------- | ------------------------- | ---------------------------------- |
| Components        | PascalCase                | `LoginForm`, `Button`              |
| Files/folders     | kebab-case                | `login-form.tsx`, `auth-client.ts` |
| Database tables   | snake_case                | `users`, `email_verified`          |
| Database columns  | snake_case                | `created_at`, `updated_at`         |
| Server actions    | camelCase + Action suffix | `deleteCollectionAction`           |
| Zod schemas       | camelCase + Schema suffix | `signinSchema`                     |
| TypeScript types  | PascalCase + descriptive  | `SigninInput`, `ActionResponse`    |
| Hooks             | camelCase + use prefix    | `useSession`                       |
| Utility functions | camelCase                 | `slugify`, `cn`                    |

### Imports & Exports

```typescript
// 1. React/Next imports
import * as React from "react";
import { useState } from "react";
import Link from "next/link";

// 2. Third-party libraries
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// 3. Absolute imports with @/ alias
import { Button } from "@/components/ui/button";
import { db } from "@/db";

// 4. Relative imports (same feature)
import { signinSchema } from "../schemas/signin-schema";
```

### Component Structure

```typescript
// shadcn/ui components use this pattern:
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Feature components use:
("use client"); // if needed
import { useState } from "react";
// ... other imports

export default function ComponentName() {
  // Component logic
}
```

### Server Actions

```typescript
"use server";
import "server-only";
import { db } from "@/db";
import { ActionResponse } from "@/types/action";

export async function actionName(data: InputType): Promise<ActionResponse> {
  try {
    // Logic here
    return { success: true, message: "Success message" };
  } catch (err) {
    console.error(err);
    return { success: false, message: "Error message" };
  }
}
```

### Database (Drizzle)

```typescript
import * as t from "drizzle-orm/pg-core";
import { timestamps } from "../helper";

export const tableName = t.pgTable("table_name", {
  id: t.text().primaryKey(),
  // other columns
  ...timestamps, // Always include timestamps
});
```

### Error Handling

- Use try/catch in server actions
- Return `ActionResponse` type: `{ success: boolean; message: string }`
- Log errors with `console.error()`
- Redirect to auth pages when session is invalid

### Styling (Tailwind CSS)

- Use `cn()` utility from `@/lib/utils` for conditional classes
- Tailwind classes are auto-sorted by Prettier plugin
- Use shadcn/ui component patterns for consistency
- CSS variables for theming are defined in `globals.css`

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (authenticated)/    # Auth-required routes
│   ├── (public)/           # Public routes
│   └── api/                # API routes
├── components/ui/          # shadcn/ui components
├── db/
│   ├── schema/             # Drizzle table definitions
│   ├── index.ts            # DB connection
│   └── helper.ts           # Timestamp helper
├── features/               # Feature-based organization
│   ├── auth/
│   ├── collection/
│   ├── landing-page/
│   └── resources/
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions
└── types/                  # Shared TypeScript types
```

## Key Dependencies

- **UI**: shadcn/ui (New York style), Radix UI, Lucide icons
- **Forms**: React Hook Form, Zod validation
- **Auth**: better-auth
- **Database**: Drizzle ORM, Neon PostgreSQL
- **Date**: dayjs
- **Notifications**: sonner (toast)

## Rules

1. Always use `cn()` for Tailwind class merging
2. Always include timestamps in database tables
3. Use `"use server"` + `import "server-only"` for server actions
4. Use `"use client"` only when necessary (forms, interactivity)
5. Prefer server components by default
6. Use path aliases (`@/`) for imports outside current directory
7. Follow shadcn/ui patterns for UI components
8. Use Zod for all form validation schemas
9. Return `ActionResponse` from all server actions
10. Never use `redirect()` inside try catch block
