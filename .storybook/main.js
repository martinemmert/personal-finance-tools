const path = require("path");
const { loadConfigFromFile, mergeConfig } = require("vite");

module.exports = {
  stories:  [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|ts)"
  ],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  framework: "@storybook/vue3",
  core: {
    builder: "storybook-builder-vite",
  },
  async viteFinal(config, { configType }) {
    const { config: userConfig } = await loadConfigFromFile(
      path.resolve(__dirname, "../vite.config.ts")
    );

    return mergeConfig(config, {
      ...userConfig,
      // manually specify plugins to avoid conflict
      plugins: [],
    });
  },
};
