import { log } from "@clack/prompts"
import { exec } from "child_process"

/**
 * Spawn a package manager installation based on user preference.
 *
 * @returns A Promise that resolves once the installation is finished.
 */
export async function install(
  /** Indicate which package manager to use. */
  packageManager: string,
  /** Indicate whether there is an active Internet connection.*/
  isOnline: boolean
): Promise<void> {
  const args = ["install"]
  
  if (!isOnline) {
    log.warn("You appear to be offline.\nFalling back to the local cache.")
    args.push("--offline")
  }
  /**
   * Return a Promise that resolves once the installation is finished.
   */
  return new Promise((resolve, reject) => {
    /**
     * Spawn the installation process.
     */
    const child = exec(`${packageManager} ${args.join(" ")}`, {
      env: {
        ...process.env,
        ADBLOCK: "1",
        // we set NODE_ENV to development as pnpm skips dev
        // dependencies when production
        NODE_ENV: "development",
        DISABLE_OPENCOLLECTIVE: "1",
      },
    })
    child.on("close", (code: number) => {
      if (code !== 0) {
        reject({ command: `${packageManager} ${args.join(" ")}` })
        return
      }
      resolve()
    })
  })
}
