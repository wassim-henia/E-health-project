module.exports = {
  outputDir: "./dist-server/public",
  devServer: {
    proxy: {
      "/api/v1/graphql": {
        target: "http://localhost:5000"
      },
      "/api/v1/medecin/patients": {
        target: "http://localhost:5000"
      },
      "/api/v1/patient/getscans": {
        target: "http://localhost:5000"
      },
      "/api/v1/medecin/notes": {
        target: "http://localhost:5000"
      },
      "/api/v1/medecin/sendnote": {
        target: "http://localhost:5000"
      },
      "/api/v1/upload": {
        target: "http://localhost:5000"
      }
    }
  },
  pwa: {
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "src/service-worker.js"
    }
  },
  configureWebpack: {
    optimization: {
      runtimeChunk: "single",
      splitChunks: {
        chunks: "all"
      }
    }
  },
  transpileDependencies: ["vuetify"]
};
