#!/usr/bin/env node
import { outro } from "@clack/prompts";
import { cli } from "cleye";
import { red } from "kolorist";
import { setupCli } from "./utils/setup-cli";
import { create } from "./commands/create";

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
  name: "framer-superplugins",
  commands: [create],
});

process.on("SIGINT", () => {
  console.log("\n");
  outro(red("Stopping."));
  console.log("\n");
  process.exit();
});
