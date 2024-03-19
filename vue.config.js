const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: "http://localhost:3000/api/",
    // host: "85.209.9.101",
    // allowedHosts: "all",
    // port: 80,
  },
});
