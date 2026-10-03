#!/usr/bin/env node
/** Cross-platform (Windows/Mac/Linux) static build: sets STATIC_EXPORT=1 and runs `next build`. */
import { spawnSync } from "node:child_process";
const r = spawnSync("npx", ["next", "build"], { stdio: "inherit", shell: true, env: { ...process.env, STATIC_EXPORT: "1" } });
process.exit(r.status ?? 1);
