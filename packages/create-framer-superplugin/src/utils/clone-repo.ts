import { outro } from "@clack/prompts";
import { execa } from "execa";
import { green, red } from "kolorist";

export const cloneGitRepo = async (pluginName: string, repo: string) => {
  try {
    // Executa o comando git clone
    await execa("git", ["clone", repo, pluginName]);
    outro(
      green(`\nProject ${pluginName} created successfully using the scaffold!`)
    );
  } catch (error) {
    outro(red(`Error cloning repository: ${error}`));
    process.exit(1);
  }
};
