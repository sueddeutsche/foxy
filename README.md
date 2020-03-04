# simple frontend proxy

> Customizable frontend-proxy, supporting multiple handlers for input-urls

**Motivation** Our infrastructure may contain different media-services and on different environments. Having a set of nested widgets, libraries and applications they all access the same services within an environment. This frontend-proxy helps to open source applications, since internal ressources and behaviour can be configured, but its public api is consistent and has default handlers for the normal use-case.

`yarn add @technik-sde/foxy`


**Handler** A handler registers its methods for a specific request-object, containing an url-property. The handler will be selected for the exposed request-method, when its function `use(RequestObject):boolean` returns `true`.


## Usage

```js
import { Foxy, utils } from "technik-sde/foxy";

const proxy = new Foxy({
  handlers: [
    {
      use({ url }) {
        return myUrlFormat.test(url);
      },
      getImageURL({ url }) {
        return Promise.resolve(buildMyUrlScheme(url));
      },
      getImageInfo({ url }) {
        return utils.loadImage(buildMyUrlScheme(url))
      }
    }
  ]
});

const finalUrl = await proxy.getImageURL({ url: 1234 });
const imageMetadata = await proxy.getImageInfo({ url: 1234 });
```


Multiple handlers are supported and are resolved from first to last index. The first handler returning `true` on use, will be selected, if the given _method-name_ is defined:

```js
import { Foxy } from "technik-sde/foxy";

const proxy = new Foxy({
  handlers: [
    {
      use({ url }) {
        return myUrlFormat.test(url);
      },
      getImageURL({ url }) {
        return Promise.resolve(buildMyUrlScheme(url));
      }
    },
    {
      use: () => true,
      // overwrites default exception to always return false
      getImageURL({ url }) { return Promise.resolve(false); } 
    }
  ]
});

const finalUrl = await proxy.getImageURL({ url: "abc" }); // false, when not myUrlFormat
```


Per default the following methods are supported via api: `getImageURL`, `getImageInfo`, `getVideoURL`, `getVideoInfo`. The 
generic method `get(methodName: string, requestData: AnyObject)` may be used to access any custom methods defined on
handlers. e.g.

```js
import { Foxy } from "technik-sde/foxy";

const proxy = new Foxy({
  handlers: [
    {
      use({ url }) {
        return myUrlFormat.test(url);
      },
      getJSON({ url }) {
        return fetch(buildMyUrlScheme(url)).then(response => response.json());
      }
    }
  ]
});

const json = await proxy.get("getJSON", { url: "my-json-url" });
```




