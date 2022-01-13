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
    "url": "assets/Create.2c1e1e3f.css",
    "revision": "ee9232883367ba09a62f775f6386a3c0"
  }, {
    "url": "assets/Create.ae52eab2.js",
    "revision": "8d1fe2f5cacf029ca8d9aa90e709c245"
  }, {
    "url": "assets/Home.3644695a.js",
    "revision": "f2a47df62bdfa8e6bde6d9b8fdf15519"
  }, {
    "url": "assets/Home.5463b057.css",
    "revision": "ed52639c245c9c53b749658dbaf7c7ce"
  }, {
    "url": "assets/index.82e32e5c.css",
    "revision": "bd3cc3ad6f2f70a14b280b4d9ff05863"
  }, {
    "url": "assets/index.a40f8658.js",
    "revision": "68009c60b2c7f8ef2316ec1d02033bca"
  }, {
    "url": "assets/Play.763e39ec.css",
    "revision": "f7f6f4a714bb8e9a33233c7ce842a753"
  }, {
    "url": "assets/Play.f9c8f3b3.js",
    "revision": "9eba8d88e872eaa1da06331c3af65199"
  }, {
    "url": "assets/sweetalert2.314ae3be.js",
    "revision": "0b9eaca7c8de09dfa597d421f542c146"
  }, {
    "url": "assets/vendor.0df4e93f.js",
    "revision": "bbf7dbb5d885f88d61a9c445c315ec7a"
  }, {
    "url": "index.html",
    "revision": "39f9805597898a1892b28cc5b7e22af6"
  }, {
    "url": "registerSW.js",
    "revision": "1872c500de691dce40960bb85481de07"
  }, {
    "url": "favicon.ico",
    "revision": "1ba2ae710d927f13d483fd5d1e548c9b"
  }, {
    "url": "manifest.webmanifest",
    "revision": "66527ba2da17691d5d56d6f0a42ef96b"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));

}));
//# sourceMappingURL=sw.js.map
