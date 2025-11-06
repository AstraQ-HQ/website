import * as migration_20251106_080619_init from "./20251106_080619_init";

export const migrations = [
  {
    up: migration_20251106_080619_init.up,
    down: migration_20251106_080619_init.down,
    name: "20251106_080619_init",
  },
];
