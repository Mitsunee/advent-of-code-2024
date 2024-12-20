import { createColors } from "picocolors";
export const col = createColors(process.stdout?.hasColors?.()); // Dear picocolors, pls fix
