import { setConsoleFunction } from "three";

/**
 * three.js r183 deprecated `Clock`, but @react-three/fiber still constructs one per `<Canvas>`,
 * so every 3D slide logs a warning we can't fix here. Swallow exactly that message through
 * three's own logging hook and forward everything else. Remove once R3F moves to `THREE.Timer`.
 */
const SILENCED = /^THREE\.Clock: This module has been deprecated/;

let installed = false;

export function installThreeConsoleFilter() {
  if (installed) return;
  installed = true;
  setConsoleFunction((level: "log" | "info" | "warn" | "error", message: unknown, ...rest: unknown[]) => {
    if (level === "warn" && typeof message === "string" && SILENCED.test(message)) return;
    (console[level] ?? console.log)(message, ...rest);
  });
}
