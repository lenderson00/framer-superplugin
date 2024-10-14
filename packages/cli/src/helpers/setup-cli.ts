import { intro, outro,  text, confirm,  isCancel } from "@clack/prompts";
import { red } from "kolorist";
import fs from "fs";
import { getCurrentPath } from "./get-current-path";
import path from "path";
import { isWriteable } from "./is-writable";

type SetupCliArgs = {};

export const setupCli = async (args?: SetupCliArgs) => {
  intro("⚡ Framer Superplugins CLI ⚡");

  const currentPath = getCurrentPath();

  let pluginName = await text({
    message: "What's the name of your plugin?",
    placeholder: "my-super-plugin",
    defaultValue: "my-super-plugin",
    initialValue: "my-super-plugin",
    validate(value: string) {
      const newValue = !value ? "my-super-plugin" : value;
      const pluginPath = path.join(currentPath, String(newValue));

      if (fs.existsSync(pluginPath)) {
        return `The folder ${newValue} already exists!`;
      }

      if (!isWriteable(path.dirname(pluginPath))) {
        return `The folder ${newValue} is not writable! It is likely you do not have write permissions for this folder.`;
      }
    },

  });

  if(isCancel(pluginName)) {
    outro(red("Plugin creation cancelled. See you next time!"));
    process.exit(1);
  }

  pluginName = typeof pluginName === "string" ? pluginName : "";

  const confirmCreation = await confirm({
    message: `Can I create the superplugin for Framer?`,
    initialValue: false,
    active: "Yes",
    inactive: "No",
  });

  if (!confirmCreation || isCancel(confirmCreation)) {
    outro(red("Plugin creation cancelled. See you next time!"));
    process.exit(1);
  }

  const pluginPath = path.join(currentPath, String(pluginName));

  return { pluginName, pluginPath };
};

