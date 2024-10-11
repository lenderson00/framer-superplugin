import { command } from "cleye";

export const create = command(
  {
    name: "create",
    description: "Create a new Framer Superplugin",
  },
  async (args: any) => {
    const { name } = args;
    console.log(name);
  }
);
