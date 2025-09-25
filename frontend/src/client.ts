import { treaty } from "@elysiajs/eden";
import type { BackendApi } from "../../backend/index.ts";
export const client = treaty<BackendApi>("http://localhost:3001");
