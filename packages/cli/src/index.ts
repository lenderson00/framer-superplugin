#!/usr/bin/env node

import { log, outro, spinner } from "@clack/prompts";
import { cli } from "cleye";
import { blue, cyan, red, bold } from "kolorist";
import { commandName, version } from "./helpers/constants";
import { setupCli } from "./helpers/setup-cli";
import fs from "node:fs";
import { getOnline } from "./helpers/is-online";
import { setTimeout as sleep } from 'node:timers/promises';
import url from "node:url";
import path from "node:path";
import { getPackageManager } from "./helpers/get-package-manger";
import { isInRepository, tryGitInit } from "./helpers/git";
import { copy } from "./helpers/copy";
import { titleCase } from "./helpers/title-case";
import os from "node:os";
import crypto from "node:crypto";
import { install } from "./helpers/install";

process.on("SIGTERM", () => process.exit(0));

const originalEmit = process.emitWarning;

const checkmark = process.platform === "win32" ? "√" : "✔"

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

  const cwd = process.cwd()
  const packagerManager = getPackageManager()

  const copySource = ["**"]

  const __filename = url.fileURLToPath(import.meta.url)
  const templatePath = path.join(path.dirname(__filename), "..", "templates", template)

  log.step(cyan("Setting up project..."))

  await copy(copySource, pluginPath, {
    parents: true,
    cwd: templatePath,
    rename(name) {
      switch (name) {
        case "gitignore":
        case "eslintrc.json": {
          return `.${name}`
        }
        default: {
          return name
        }
      }
    },
  })

  await writePackageJson(pluginPath, pluginName)
  await writeHtmlIndex(pluginPath, pluginName)
  await writeFramerJson(pluginPath, pluginName)

  if (packagerManager === "yarn") {
    await fs.promises.writeFile(path.join(pluginPath, "yarn.lock"), "")
  }

  log.step(cyan("Initializing a git repository..."))
  if (tryGitInit(pluginPath)) {
    log.success("Initialized a git repository.")
  }

  if (isInRepository()) {
    log.warn("Already in git repository. Skipping git init.")
  } else {
    const didInitGit = tryGitInit(pluginPath)
    if (!didInitGit) {
      log.warning(`${bold("Warning")}: git repo not initialized.`)
    }
  }
  process.chdir(pluginPath)
  spinner().start("Installing dependencies...")

  await install(packagerManager, isOnline)

  spinner().stop("Dependencies installed")
  process.chdir(cwd)

  log.success(`Created Framer Super Plugin: “${bold(pluginName)}”`)

  log.info(
    `View the Framer Docs: ${cyan("https://framer.com/developers/plugins")}`
  )

  log.info(`View the Superplugins Docs: ${cyan("https://superplugins.framer.website")}`)


  log.message(`${bold("Just run:")}`)

  if (pluginPath !== process.cwd()) {
    log.warn(`  cd ${pluginName}`)
  }

  switch (packagerManager) {
    case "yarn":
      log.info("  yarn install")
      log.info("  yarn dev")
      break
    default:
      log.info(`  ${packagerManager} install`)
      log.info(`  ${packagerManager} run dev`)
      break
  }

  outro(`${red(blue("Enjoy your Superplugin!"))}`)

  await sleep(1000);
})



async function writePackageJson(pluginPath: string, pluginName: string) {
  const packageJson = {
    name: pluginName,
    private: true,
    version: "0.0.1",
    type: "module",
    scripts: {
      dev: "vite",
      build: "vite build",
      lint: "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
      preview: "vite preview",
      pack: "npx framer-plugin-tools@latest pack",
    },
    dependencies: {
      "@number-flow/react": "^0.2.0",
      "@radix-ui/react-accordion": "^1.2.1",
      "@radix-ui/react-alert-dialog": "^1.1.2",
      "@radix-ui/react-context-menu": "^2.2.2",
      "@radix-ui/react-icons": "^1.3.0",
      "@radix-ui/react-scroll-area": "^1.2.0",
      "@radix-ui/react-select": "^2.1.2",
      "@radix-ui/react-slider": "^1.2.1",
      "@radix-ui/react-slot": "^1.1.0",
      "@radix-ui/react-toggle": "^1.1.0",
      "@radix-ui/react-toggle-group": "^1.1.0",
      "@radix-ui/react-tooltip": "^1.1.3",
      "@tanstack/query-sync-storage-persister": "^5.59.13",
      "@tanstack/react-query": "^5.59.15",
      "@tanstack/react-query-persist-client": "^5.59.15",
      "class-variance-authority": "^0.7.0",
      "clsx": "^2.1.1",
      "cmdk": "^1.0.0",
      "embla-carousel-react": "^8.3.0",
      "framer-motion": "^11.11.9",
      "framer-plugin": "^1",
      "jotai": "^2.10.1",
      "lenis": "^1.1.14",
      "lucide-react": "^0.453.0",
      "react": "^18",
      "react-aria-components": "^1.4.1",
      "react-dom": "^18",
      "react-error-boundary": "^4.0.13",
      "react-router-dom": "^6.27.0",
      "tailwind-merge": "^2.5.4",
      "tailwindcss-animate": "^1.0.7",
      "usehooks-ts": "^3.1.0",
      "vite-plugin-mkcert": "^1"
    },
    devDependencies: {
      "@eslint/js": "^9",
      "@types/react": "^18",
      "@types/react-dom": "^18",
      "@vitejs/plugin-react": "^4.3.1",
      "@vitejs/plugin-react-swc": "^3",
      "autoprefixer": "^10.4.20",
      "eslint": "^9.9.0",
      "eslint-plugin-react-hooks": "^5.1.0-rc.0",
      "eslint-plugin-react-refresh": "^0.4.9",
      "globals": "^15.9.0",
      "postcss": "^8.4.47",
      "tailwindcss": "^3.4.14",
      "tailwindcss-motion": "^0.3.0-beta",
      "typescript": "^5.3",
      "typescript-eslint": "^8.0.1",
      "vite": "^5",
      "vite-plugin-framer": "^1"
    }
  }

  await fs.promises.writeFile(path.join(pluginPath, "package.json"), JSON.stringify(packageJson, null, 2) + os.EOL)
}

async function writeHtmlIndex(pluginPath: string, pluginName: string) {
  const indexHtml = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <link rel="icon" type="image/svg+xml" href="/icon.svg" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${titleCase(pluginName)}</title>
    </head>
    <body>
      <div id="root"></div>
      <script type="module" src="/src/main.tsx"></script>
    </body>
  </html>
  `

  await fs.promises.writeFile(path.join(pluginPath, "index.html"), indexHtml + os.EOL)
}

function shortId() {
  return crypto.randomBytes(3).toString("hex")
}

async function writeFramerJson(pluginPath: string, pluginName: string) {
  const framerJSON = {
    id: shortId(),
    name: titleCase(pluginName),
    modes: ["canvas"],
    icon: "/icon.svg",
  }

  await fs.promises.writeFile(path.join(pluginPath, "framer.json"), JSON.stringify(framerJSON, null, 2) + os.EOL)
}

