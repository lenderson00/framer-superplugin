import { outro } from "@clack/prompts";
import { red, yellow, cyan, green } from "kolorist";

export const logger = {
  error(...args: unknown[]) {
    outro(red(args.join(" ")));
  },
  warn(...args: unknown[]) {
    outro(yellow(args.join(" ")));
  },
  info(...args: unknown[]) {
    outro(cyan(args.join(" ")));
  },
  success(...args: unknown[]) {
    outro(green(args.join(" ")));
  },
};
