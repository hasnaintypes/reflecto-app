import {
  userRouter,
  entryRouter,
  journalRouter,
  dreamRouter,
  highlightRouter,
  ideaRouter,
  wisdomRouter,
  noteRouter,
  tagRouter,
  personRouter,
  attachmentRouter,
  insightsRouter,
  preferencesRouter,
} from "@/server/api/routers";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  entry: entryRouter,
  journal: journalRouter,
  dream: dreamRouter,
  highlight: highlightRouter,
  idea: ideaRouter,
  wisdom: wisdomRouter,
  note: noteRouter,
  tag: tagRouter,
  person: personRouter,
  attachment: attachmentRouter,
  insights: insightsRouter,
  preferences: preferencesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 */
export const createCaller = createCallerFactory(appRouter);
