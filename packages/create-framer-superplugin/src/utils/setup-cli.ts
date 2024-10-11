import { intro, outro, select, text, confirm } from "@clack/prompts";
import { red } from "kolorist";
import fs from "fs";

export const setupCli = async () => {
  intro("⚡ Framer Superplugins CLI ⚡");

  const pluginName = await text({
    message: "What's the name of your plugin?",
    placeholder: "my-super-plugin",
    validate(value: string) {
      if (!value) return "The plugin name cannot be empty.";
    },
  });

  if (fs.existsSync(String(pluginName))) {
    console.log(red(`Error: The folder ${String(pluginName)} already exists!`));
    process.exit(1);
  }

  const auth = await select({
    message: "Your plugin needs Authentication?",
    options: [
      { value: true, label: "Yes" },
      { value: false, label: "No" },
    ],
  });

  const tailwind = await select({
    message: "Do you want to use Tailwind CSS?",
    options: [
      { value: true, label: "Yes" },
      { value: false, label: "No" },
    ],
  });

  const description = await text({
    message: "Describe what your plugin does:",
    placeholder: "This plugin does...",
  });

  const confirmCreation = await confirm({
    message: `Create the ${String(
      pluginName
    )} project based on the selected scaffold?`,
    initialValue: true,
  });

  if (!confirmCreation) {
    outro(red("Plugin creation cancelled. See you next time!"));
    process.exit(0);
  }

  outro(`Creating ${String(pluginName)}...`);

  return { pluginName, auth, tailwind, description };
};
