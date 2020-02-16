importScripts(
  "/precache-manifest.e129490d68b604ffdb62f7c5b05e25cc.js",
  "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js"
);

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.core.setCacheNameDetails({
  prefix: "my-app",
  suffix: "v1",
  precache: "precache",
  runtime: "runtime"
});

self.addEventListener("install", event => {
  self.skipWaiting();
  const channel = new BroadcastChannel("sw-messages");
  channel.postMessage({ title: "update", features: "update khaled wiw" });
});

const bgSyncPlugin = new workbox.backgroundSync.Plugin("requests", {
  maxRetentionTime: 24 * 60 // Retry for max of 24 Hours (specified in minutes)
});

workbox.routing.registerRoute(
  new RegExp("/api/v1/graphql"),
  workbox.strategies.networkOnly({
    plugins: [bgSyncPlugin]
  }),
  "POST"
);

self.addEventListener("fetch", event => {
  console.log(event.request);
});

/*self.addEventListener("message", function(event) {
  var data = event.data;

  if (data.command == "oneWayCommunication") {
    console.log("Message the Page : ", data.message);
  }
});*/
