#!/usr/bin/env node

import { log, outro } from "@clack/prompts";
import { cli } from "cleye";
import { red } from "kolorist";
import { commandName, version } from "./helpers/constants";
import { setupCli } from "./helpers/setup-cli";
import fs from "node:fs";
import { getOnline } from "./helpers/is-online";
import url from "node:url";
import path from "node:path";

process.on("SIGTERM", () => process.exit(0));

const originalEmit = process.emitWarning;

process.emitWarning = function (...args) {
  const [warning] = args;
  const warningString = warning.toString();
  // Ignore annoying "punnycode is deprecated" warning that comes
  // from one of our dependencies
  if (warningString.includes("punnycode")) return;
  return originalEmit.apply(process, args as any);
};

cli({
  name: commandName,
  version: version,
  flags: {},
  commands: [],
  help: {
    description: "CLI to create Framer Superplugins",
    examples: [
      "npx create-framer-superplugins",
      "pnpm create framer-superplugins",
      "bunx --bun create framer-superplugins",
    ],
  },
  ignoreArgv: () => {
    if (process.argv.length > 2) {
      outro(red("This CLI does not accept arguments, flags, or commands."));
      process.exit(1);
    }
    return false;
  },
}, async () => {

  console.log("")
  const { pluginName, pluginPath } = await setupCli();

  fs.mkdirSync(pluginPath, { recursive: true });
  log.success(`The folder ${pluginName} has been created.`);

  const isOnline = await getOnline();

  const template = "default"

  const __filename = url.fileURLToPath(import.meta.url)
  const templatePath = path.join(path.dirname(__filename), "templates", template)

  
})

process.on("SIGINT", () => {
  console.log("\n");
  outro(red("Stopping."));
  console.log("\n");
  process.exit();
});
