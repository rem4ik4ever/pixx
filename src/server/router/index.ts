// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./example";
import { subscribeRouter } from "./subscribe";
import { testimonialRouter } from './testimonial'

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('public.', subscribeRouter)
  .merge('public.', testimonialRouter)

// export type definition of API
export type AppRouter = typeof appRouter;
