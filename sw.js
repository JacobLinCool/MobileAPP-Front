/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-e172ad1d'], (function (workbox) { 'use strict';

  /**
  * Welcome to your Workbox-powered service worker!
  *
  * You'll need to register this file in your web app.
  * See https://goo.gl/nhQhGp
  *
  * The rest of the code is auto-generated. Please don't update this file
  * directly; instead, make changes to your Workbox build configuration
  * and re-run your build process.
  * See https://goo.gl/2aRDsh
  */

  self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    }
  });
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */

  workbox.precacheAndRoute([{
    "url": "assets/api.a6e8cdff.js",
    "revision": "afe9597fc7fa66ebf9114292eeb60003"
  }, {
    "url": "assets/Create.6e9da2dc.js",
    "revision": "8f2a0f69ba98721bcf7e0fea30916cac"
  }, {
    "url": "assets/Create.7feb3a1c.css",
    "revision": "dd7bece12bbdcfd833dcf3359c8bef46"
  }, {
    "url": "assets/Home.3eb4ca8d.js",
    "revision": "62b5ea25e6217a9ff53a0e6a4f1c6e20"
  }, {
    "url": "assets/Home.c13e0ff5.css",
    "revision": "e367aa5e8df730ba03c8311c1d16ddbd"
  }, {
    "url": "assets/index.3300764c.css",
    "revision": "69bd5b6fa4b65e0507cf796c888c4331"
  }, {
    "url": "assets/index.77b72fb4.js",
    "revision": "a293419a0a7e20927b5e336a8eae9b70"
  }, {
    "url": "assets/Play.2c51cbfd.css",
    "revision": "c659af7078e74925de225b8e2432781f"
  }, {
    "url": "assets/Play.f90e5118.js",
    "revision": "5ad0616049d9aea7b5dab38f606e5597"
  }, {
    "url": "assets/Ranking.608ace10.css",
    "revision": "dbd68d835f22ae3d9a7bae4fb61c8e58"
  }, {
    "url": "assets/Ranking.a1e5f110.js",
    "revision": "8f9f5be11ebc9079cd3701e684545f1a"
  }, {
    "url": "assets/sweetalert2.314ae3be.js",
    "revision": "0b9eaca7c8de09dfa597d421f542c146"
  }, {
    "url": "assets/vendor.8a3ab317.js",
    "revision": "e7b93d3ed382ead5be1a874beec3671c"
  }, {
    "url": "index.html",
    "revision": "f293fe0405a93a9354c2dd5076090389"
  }, {
    "url": "registerSW.js",
    "revision": "1872c500de691dce40960bb85481de07"
  }, {
    "url": "favicon.ico",
    "revision": "1ba2ae710d927f13d483fd5d1e548c9b"
  }, {
    "url": "icon/192x192.png",
    "revision": "044dac4f541d8551fcf911a60e1ede19"
  }, {
    "url": "manifest.webmanifest",
    "revision": "66527ba2da17691d5d56d6f0a42ef96b"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));

}));
//# sourceMappingURL=sw.js.map
