# simple frontend proxy

> Customizable frontend-proxy, supporting multiple handlers for input-urls

**Motivation** Our infrastructure may contain different media-services and on different environments. Having a set of nested widgets, libraries and applications they all access the same services within an environment. This frontend-proxy helps to open source applications, since internal ressources and behaviour can be configured, but its public api is consistent and has default handlers for the normal use-case.

`yarn add @technik-sde/foxy`


**Handler** A handler registers its methods for a specific request-object, containing a `source`-property. The handler will be selected for the exposed request-method, when its function `use(RequestObject):boolean` returns `true`.


## Usage

```js
import { Foxy, utils } from "technik-sde/foxy";

const proxy = new Foxy({
  handlers: [
  {
    use({ source }) {
      return myUrlFormat.test(source);
    },
    getImageURL({ source }) {
      return Promise.resolve(buildMyUrlScheme(source));
    },
    getImageInfo({ source }) {
      return utils.loadImage(buildMyUrlScheme(source))
    }
  }
  ]
});

const finalUrl = await proxy.getImageURL({ source: 1234 });
const imageMetadata = await proxy.getImageInfo({ source: 1234 });
```


Multiple handlers are supported and are resolved from first to last index. The first handler returning `true` on use, will be selected, if the given _method-name_ is defined:

```js
import { Foxy } from "technik-sde/foxy";

const proxy = new Foxy({
  handlers: [
  {
    use({ source }) {
      return myUrlFormat.test(source);
    },
    getImageURL({ source }) {
      return Promise.resolve(buildMyUrlScheme(source));
    }
  },
  {
    use: () => true,
    // overwrites default exception to always return false
    getImageURL({ source }) { return Promise.resolve(false); } 
  }
  ]
});

const finalUrl = await proxy.getImageURL({ source: "abc" }); // false, when not myUrlFormat
```


Per default the following methods are supported via api: `getImageURL`, `getImageInfo`, `getVideoURL`, `getVideoInfo`, 
`getURL` and `getJSON`. The generic method `get(methodName: string, requestData: AnyObject)` may be used to access any 
custom methods defined on handlers. e.g.

```js
import { Foxy } from "technik-sde/foxy";

const proxy = new Foxy({
  handlers: [
  {
    use({ source }) {
      return myUrlFormat.test(source);
    },
    getArticles({ source }) {
      return fetch(buildMyUrlScheme(source)).then(response => response.json().data);
    }
  }
  ]
});

const json = await proxy.get("getArticles", { source: "my-json-url" });
```


## Handlers

Currently three example handlers are exported with this module. They probably should not be used in production:

- unsplash: allowing modification of query params to load images from unsplash.com
- image: default image handler, to load image-urls and metadata
- video: crude video handler to get video-type, dimensions and duration as metadata

Import these handlers with

```js
import { handler } from "technik-sde/foxy";

// handler.unsplash
// handler.image
// handler.video
```
