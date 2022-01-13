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
    "url": "assets/Create.0bb47368.js",
    "revision": "5ce7aae0533e0923a9008fc7de61d06d"
  }, {
    "url": "assets/Create.7feb3a1c.css",
    "revision": "dd7bece12bbdcfd833dcf3359c8bef46"
  }, {
    "url": "assets/Home.2330c095.js",
    "revision": "b20dad55864242e7bac1c26abd6e5516"
  }, {
    "url": "assets/Home.acbe76fe.css",
    "revision": "c4e577260f3e5aa14b63deb3ced04f08"
  }, {
    "url": "assets/index.3300764c.css",
    "revision": "69bd5b6fa4b65e0507cf796c888c4331"
  }, {
    "url": "assets/index.daebbcbd.js",
    "revision": "090dd9d093bf0ed29c0511513d3b1e1e"
  }, {
    "url": "assets/Play.180136bf.js",
    "revision": "15dd12d3dced1e5ca5c2d7e3bc4ffadd"
  }, {
    "url": "assets/Play.2c51cbfd.css",
    "revision": "c659af7078e74925de225b8e2432781f"
  }, {
    "url": "assets/Ranking.4a2aced8.css",
    "revision": "c5c3ac82116cfec743afb8f5943dba84"
  }, {
    "url": "assets/Ranking.80e0a12f.js",
    "revision": "ce44d6fb86acb5f9efcfc89353fc6086"
  }, {
    "url": "assets/sweetalert2.314ae3be.js",
    "revision": "0b9eaca7c8de09dfa597d421f542c146"
  }, {
    "url": "assets/vendor.8a3ab317.js",
    "revision": "e7b93d3ed382ead5be1a874beec3671c"
  }, {
    "url": "index.html",
    "revision": "8abe42758e222c6a65b3f865aa04fcad"
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
