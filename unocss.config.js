import { defineConfig } from "unocss";
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
  // ...UnoCSS options
  transformers: [
    transformerDirectives(),
  ],
  shortcuts: {
    button: "rounded-md border-transparent border px-4 py-2 text-lg font-medium text-white bg-gray-800 hover:border-gray-700"
  }
});
