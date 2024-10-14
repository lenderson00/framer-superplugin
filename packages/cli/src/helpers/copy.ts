import { glob } from "glob"
import path from "path"
import fs from "fs"

const identity = (x: string) => x

export const copy = async (src: string[], dest: string, { cwd, rename = identity, parents = true }: { cwd?: string, rename?: (name: string) => string, parents?: boolean } = {}) => {
    const source = typeof src === "string" ? [src] : src

    if (source.length === 0 || !dest) {
        throw new TypeError("`src` and `dest` are required")
    }

    const sourceFiles = await glob(source, {
        cwd,
        dot: true,
        absolute: false,
        stat: false,
    })

    const destRelativeToCwd = cwd ? path.resolve(cwd, dest) : dest

    return Promise.all(
        sourceFiles.map(async p => {
            const dirname = path.dirname(p)
            const basename = rename(path.basename(p))

            const from = cwd ? path.resolve(cwd, p) : p
            const to = parents
                ? path.join(destRelativeToCwd, dirname, basename)
                : path.join(destRelativeToCwd, basename)

            // Ensure the destination directory exists
            await fs.promises.mkdir(path.dirname(to), { recursive: true })

            const stat = await fs.promises.lstat(from)
            const localPath = path.dirname(from).replace(cwd ?? "", "")

            // Ignore directories and dev files
            if (stat.isDirectory()) return
            if (localPath.includes(".yarn")) return
            if (localPath.includes("node_modules")) return
            if (localPath.includes(".git")) return
            if (path.basename(from) === ".DS_Store") return
            if (path.basename(from) === "yarn.lock") return
            if (path.basename(from) === "package.json") return

            return fs.promises.copyFile(from, to)
        })
    )
}
