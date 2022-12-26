<!-- markdownlint-disable -->
<div align="center">
    <br />
    <h3>open-cloud.js</h3>
    <br />
    <p>
        <a href="https://www.npmjs.com/package/open-cloud.js" target="_blank"><img src="https://img.shields.io/npm/v/open-cloud.js.svg" alt="npm version"/></a>
        <a href="https://discord.com/invite/xTAR8nUs2g" target="_blank"><img src="https://img.shields.io/discord/965168309731487805.svg" alt="discord"/></a>
        <a href="/LICENSE" target="_blank"><img src="https://img.shields.io/github/license/xhayper/open-cloud.js.svg" alt="license"/></a>
    </p>
</div>
<!-- markdownlint-enable -->

## About

`open-cloud.js` is a wrapper around [Roblox's Open Cloud API](https://create.roblox.com/docs/reference/cloud).

### Example

```ts
import { Client } from "open-cloud.js";

const client = new Client({
    apiKey: "",
    universeId: ""
});

(async () => {
    const dataStoreInstance = client.DataStore.createInstance("Cash");

    // Give "Roblox" 750 cash
    console.log(
        await dataStoreInstance.setEntry({
            entryKey: "1",
            content: "750"
        })
    );
    /*
    Respond:
    {
        version: '', // The entry version
        deleted: false, // Is it deleted?
        contentLength: 3, // The number is 3 letter long!
        createdTime: '', // The time when you set the cash amount
        objectCreatedTime: '' // The time when the key was created
    }
    */

    console.log(
        await dataStoreInstance.getEntry({
            entryKey: "1"
        })
    );
    // Oh hey! Roblox still have 750 cash!

    console.log(await dataStoreInstance.listEntries());
    /*
    {
        // Oh hey! only roblox have the cash!
        keys: [ { key: '1' } ],
        nextPageCursor: ''
    }
    */
})();
```
