# Build Configurator Project

## Overview

A Next.js application with Prisma and MongoDB for managing users and data.

## Folder Structure

```
/configurator
├── .env                      # Environment variables
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── seed.ts               # Optional seeding script
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── api/              # API Routes
│   │   └── page.tsx          # Home page
│   ├── components/           # React components
│   │   ├── ui/               # Reusable UI components
│   │   └── forms/            # Form components
│   ├── lib/                  # Utility libraries
│   │   ├── prisma.ts         # Prisma client
│   │   └── utils.ts          # Helper functions
│   ├── server/               # Server-only code
│   │   ├── actions/          # Server Actions
│   │   │   └── users.ts      # User-related actions
│   │   └── db/               # Database queries
│   │       └── user.ts       # User-specific database operations
│   └── types/                # TypeScript types
```

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set up your MongoDB connection in `.env`:

   ```
   DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
   ```

3. Push schema to database:

   ```bash
   npx prisma db push
   npx prisma generate --no-engine
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## Database Management

**Always run these commands after schema changes:**

```bash
npx prisma db push
npx prisma generate --no-engine
```

## Working with Server Actions

Server actions are located in `src/server/actions/` and can be imported in your client components:

```typescript
import { createUser } from "@/server/actions/users";

// Then use in a form or button handler
const handleSubmit = async (formData) => {
  await createUser({
    email: formData.get("email"),
    name: formData.get("name"),
  });
};
```

# Server Components, Server Actions & Prisma — Quick Guide

This project uses Next.js app/ directory with a mix of server components and client components. This README explains when to use server components vs server actions, and how to safely use Prisma types without bundling Prisma to the browser.

When to use a Server Component

- Server Components render HTML on the server and may import server-only modules (Prisma, Supabase service role, secrets).
- Omit `"use client"` to make a component server-only.
- Use for read-only data rendering and SEO-critical pages.

When to use a Server Action# Wanderland Configurator — Server Components, Server Actions & Forms

This repository uses Next.js app/ routing with a clear separation between:

- Server Components — render data on the server, import server-only modules (Prisma, Supabase service role etc.).
- Server Actions — server-only functions (mutations) callable from client components.
- Client Components & Context Providers — UI, hooks, local state, and interactivity.
- Forms — recommended stack: react-hook-form + zod; optional global draft state with Zustand.

Keep these rules in mind

- Server-only code (Prisma client, secrets, Supabase service role) must live only in:
  - Server Components (no `"use client"`)
  - Server Action modules (files starting with `"use server";`)
  - API routes
- Client components must not import runtime Prisma or other server-only modules. Use `import type` for Prisma types in client files.
- Server Actions let you call server logic directly from client components without writing manual API routes.

Quick setup

1. Install recommended packages:
   npm install react-hook-form zod @hookform/resolvers zustand

2. Generate Prisma client and restart dev server:
   npx prisma generate
   npm run dev

3. Ensure server env vars (not public):
   - DATABASE_URL
   - SUPABASE*SERVICE_ROLE_KEY (if using Supabase admin APIs)
     Do not prefix server secrets with NEXT_PUBLIC*.

When to use each piece

- Server Component

  - Use when you need to fetch and render data on the server, SEO-friendly pages, or to access server-only modules.
  - Omit `"use client"` at the top of the file.

- Server Action

  - Use for mutations (create, update, delete) that must run on the server and require secrets or DB access.
  - File must start with: `"use server";`
  - Can import Prisma and call DB directly.
  - Client components import the action and call it — Next runs it on the server.

- Client Component / Context Provider
  - Use `"use client"` for interactive UI, hooks, and local state.
  - Use Context (or Zustand) for global client-only state: UI toggles, multi-step form drafts, cart/selection state.

Forms & Validation (recommended)

- react-hook-form for efficient form state.
- zod for schema validation and to derive TS types.
- Zustand only if you need client-wide persistence/drafts for forms across pages.

Examples

Server action (already present at `src/actions/user.ts`)

```ts
// filepath: src/actions/user.ts
"use server";
import { prisma } from "@/db/prisma";
import { handleError } from "@/lib/utils";
import type { UserCreate } from "@/types/prisma";

export async function createUser(data: UserCreate) {
  try {
    await prisma.user.create({ data });
    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
}
```

Client form (react-hook-form + zod, calls server action)

```tsx
// example usage in a client component (src/app/page.tsx)
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, type UserFormValues } from "@/lib/schemas/user";
import { createUser } from "@/actions/user"; // server action
import type { UserCreate } from "@/types/prisma";

export default function UserForm() {
  const { register, handleSubmit, formState, reset } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
  });

  async function onSubmit(values: UserFormValues) {
    // cast to the Prisma/user create shape or map fields accordingly
    const data = values as unknown as UserCreate;
    const res = await createUser(data);
    if (res?.errorMessage) {
      // handle error
      return;
    }
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} />
      <input {...register("firstName")} />
      <input {...register("lastName")} />
      <button type="submit" disabled={formState.isSubmitting}>
        Create
      </button>
    </form>
  );
}
```

Context provider pattern (client-only)

```tsx
// filepath: src/context/SpecContext.tsx
"use client";
import React, { createContext, useContext, useState } from "react";

export function SpecProvider({ children }: { children: React.ReactNode }) {
  const [selections, setSelections] = useState<Record<string, string>>({});
  const setSelection = (subId: string, optionId: string) =>
    setSelections((prev) => ({ ...prev, [subId]: optionId }));
  return (
    <SpecContext.Provider value={{ selections, setSelection }}>
      {children}
    </SpecContext.Provider>
  );
}
```

Type usage in client code

- Use Prisma types safely with type-only imports:
  import type { UserCreate } from "@/types/prisma";
- Type-only imports are erased at compile time and do not bundle Prisma runtime.

Common pitfalls & fixes

- PrismaClient in browser error:
  - Caused by importing the Prisma client inside a client component or module that is bundled to the browser.
  - Fix: move DB usage to server components, server actions, or API routes.
- RLS / Supabase permissions:
  - If listing auth.users, use Supabase service role from server only.
- If you change Prisma schema run:
  npx prisma generate
  restart dev

Want help?

- I can scan the repo to find accidental Prisma imports in client files and convert them to server actions.
- I can add starter zod schemas and a react-hook-form example wired to your existing createUser server action.

````// filepath: /Users/romeoenso/Desktop/code/project/wanderland/configurator/README.md
# Wanderland Configurator — Server Components, Server Actions & Forms

This repository uses Next.js app/ routing with a clear separation between:
- Server Components — render data on the server, import server-only modules (Prisma, Supabase service role etc.).
- Server Actions — server-only functions (mutations) callable from client components.
- Client Components & Context Providers — UI, hooks, local state, and interactivity.
- Forms — recommended stack: react-hook-form + zod; optional global draft state with Zustand.

Keep these rules in mind
- Server-only code (Prisma client, secrets, Supabase service role) must live only in:
  - Server Components (no `"use client"`)
  - Server Action modules (files starting with `"use server";`)
  - API routes
- Client components must not import runtime Prisma or other server-only modules. Use `import type` for Prisma types in client files.
- Server Actions let you call server logic directly from client components without writing manual API routes.

Quick setup
1. Install recommended packages:
   npm install react-hook-form zod @hookform/resolvers zustand

2. Generate Prisma client and restart dev server:
   npx prisma generate
   npm run dev

3. Ensure server env vars (not public):
   - DATABASE_URL
   - SUPABASE_SERVICE_ROLE_KEY (if using Supabase admin APIs)
   Do not prefix server secrets with NEXT_PUBLIC_.

When to use each piece

- Server Component
  - Use when you need to fetch and render data on the server, SEO-friendly pages, or to access server-only modules.
  - Omit `"use client"` at the top of the file.

- Server Action
  - Use for mutations (create, update, delete) that must run on the server and require secrets or DB access.
  - File must start with: `"use server";`
  - Can import Prisma and call DB directly.
  - Client components import the action and call it — Next runs it on the server.

- Client Component / Context Provider
  - Use `"use client"` for interactive UI, hooks, and local state.
  - Use Context (or Zustand) for global client-only state: UI toggles, multi-step form drafts, cart/selection state.

Forms & Validation (recommended)
- react-hook-form for efficient form state.
- zod for schema validation and to derive TS types.
- Zustand only if you need client-wide persistence/drafts for forms across pages.

Examples

Server action (already present at `src/actions/user.ts`)
```ts
// filepath: src/actions/user.ts
"use server";
import { prisma } from "@/db/prisma";
import { handleError } from "@/lib/utils";
import type { UserCreate } from "@/types/prisma";

export async function createUser(data: UserCreate) {
  try {
    await prisma.user.create({ data });
    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
}
````

Client form (react-hook-form + zod, calls server action)

```tsx
// example usage in a client component (src/app/page.tsx)
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, type UserFormValues } from "@/lib/schemas/user";
import { createUser } from "@/actions/user"; // server action
import type { UserCreate } from "@/types/prisma";

export default function UserForm() {
  const { register, handleSubmit, formState, reset } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
  });

  async function onSubmit(values: UserFormValues) {
    // cast to the Prisma/user create shape or map fields accordingly
    const data = values as unknown as UserCreate;
    const res = await createUser(data);
    if (res?.errorMessage) {
      // handle error
      return;
    }
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} />
      <input {...register("firstName")} />
      <input {...register("lastName")} />
      <button type="submit" disabled={formState.isSubmitting}>
        Create
      </button>
    </form>
  );
}
```

Context provider pattern (client-only)

```tsx
// filepath: src/context/SpecContext.tsx
"use client";
import React, { createContext, useContext, useState } from "react";

export function SpecProvider({ children }: { children: React.ReactNode }) {
  const [selections, setSelections] = useState<Record<string, string>>({});
  const setSelection = (subId: string, optionId: string) =>
    setSelections((prev) => ({ ...prev, [subId]: optionId }));
  return (
    <SpecContext.Provider value={{ selections, setSelection }}>
      {children}
    </SpecContext.Provider>
  );
}
```

Type usage in client code

- Use Prisma types safely with type-only imports:
  import type { UserCreate } from "@/types/prisma";
- Type-only imports are erased at compile time and do not bundle Prisma runtime.

Common pitfalls & fixes

- PrismaClient in browser error:
  - Caused by importing the Prisma client inside a client component or module that is bundled to the browser.
  - Fix: move DB usage to server components, server actions, or API routes.
- RLS / Supabase permissions:
  - If listing auth.users, use Supabase service role from server only.
- If you change Prisma schema run:
  npx prisma generate
  restart dev

Want help?

- I can scan the repo to find accidental Prisma imports in client files and convert them to server actions.
- I can add starter zod schemas and a react-hook-form example wired to your existing createUser server action.

- Use server actions for mutations triggered from client UI (form submits, button actions).
- Server actions must live in a server module (start file with `"use server";`) and may import Prisma at runtime.
- Client components can import and call server actions; Next handles the network round-trip.

Prisma types in client code (safe pattern)

1. Generate Prisma client:
2. Create a small types re-export for client usage:

- `src/types/prisma.ts` (see repo)
- Import types only in client code: `import type { UserCreate } from "@/types/prisma";`
- Type-only imports are erased at compile time — Prisma runtime is not bundled.

Server action example (server-only)

- File must start with `"use server";`
- Can import `prisma` at runtime

Client usage example

- Client component marked `"use client"` imports the action and calls it directly.

Common pitfalls

- Do NOT import the Prisma client into any file that has `"use client"` or is used by client components.
- Use `import type` for Prisma types in client code.
- Store DB/service keys in server env (no NEXT*PUBLIC*).

If you want, I can:

- Scan the repo for accidental Prisma imports in client files and convert them to server actions or API routes.
- Add or update `src/types/prisma.ts` to match your schema fields.
