const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.plugin("define").tap((definitions) => {
      definitions[0]["process.env"]["__VUE_OPTIONS_API__"] = true;
      definitions[0]["process.env"]["__VUE_PROD_DEVTOOLS__"] = false;
      definitions[0]["process.env"][
        "__VUE_PROD_HYDRATION_MISMATCH_DETAILS__"
      ] = true;
      return definitions;
    });
  },
});
