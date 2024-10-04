import { parseArgs } from "util";
const { values } = parseArgs({
  args: Bun.argv,
  options: {
    dry: {
      type: "boolean",
    },
  },
  strict: true,
  allowPositionals: true,
});

export const args = values;
