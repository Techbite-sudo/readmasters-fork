/**
 * This is a bun shell script
 * https://bun.sh/
 * 
 * run with > bun ./shscripts/run-c.ts
 */

import { $ } from "bun";

await $`docker run -p 3000:3000 wingi-internal-nextjs`
