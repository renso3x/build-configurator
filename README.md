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
