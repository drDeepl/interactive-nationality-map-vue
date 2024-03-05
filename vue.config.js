const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: "http://94.241.169.172:8081/api/**",
    host: "94.241.169.172",
    allowedHosts: "all",
    port: 80,
  },
});
