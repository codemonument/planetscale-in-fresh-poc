import { Options } from "$fresh/plugins/twind.ts";
import { apply, css } from "twind";

// Twind config: https://twind.dev/handbook/configuration.html#frontmatter-title

export default {
  selfURL: import.meta.url,

  // can disable opinionated style reset of twind
  preflight: (preflight, { theme }) => ({
    ...preflight,
    h1: apply`text-2xl`,
    input:
      apply`rounded-md border border-gray-300 text-gray-900  focus:ring-blue-500 focus:border-blue-500`,
    button: apply`rounded-md `,
  }),
} as Options;
