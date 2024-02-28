import { defineConfig, presetIcons, presetUno } from "unocss";
import transformerDirectives from "@unocss/transformer-directives";

export default defineConfig({
    // ...UnoCSS options
    transformers: [transformerDirectives()],
    shortcuts: {
        button: "rounded-md border-solid border border-gray-600 px-4 py-2 text-lg font-medium text-white bg-gray-800 hover:border-gray-700 font-sans font-bold cursor-pointer",
        info: "bg-blue-100 dark:bg-blue-800 dark:text-blue-100",
        success: "bg-green-100 dark:bg-green-800 dark:text-green-100",
        warning: "bg-orange-100 dark:bg-orange-800 dark:text-orange-100",
        error: "bg-red-100 dark:bg-red-700 dark:text-red-100",
        closeButton:
            "w-4 h-4 mx-3 items-center justify-center text-gray-400 dark:text-gray-200 hover:text-gray-900 rounded-md focus:ring-2 focus:ring-gray-300 inline-flex dark:hover:text-white",
    },
    presets: [presetIcons(), presetUno()],
});
