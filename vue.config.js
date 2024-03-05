const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: "http://85.209.9.101:8081/api/**",
    host: "85.209.9.101",
    // allowedHosts: "all",
    // port: 80,
  },
});
