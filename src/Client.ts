import { PlacePublishing } from "./rest/PlacePublishing";
import axios, { type AxiosInstance } from "axios";
import { DataStore } from "./rest/DataStore";
import { Messaging } from "./rest/Messaging";

export interface ClientOptions {
    /**
     * The API key that you can get from [here](https://create.roblox.com/credentials).
     */
    apiKey: string;

    /**
     * The identifier of the experience. You can [copy your experience's Universe ID](https://create.roblox.com/docs/reference/cloud/place-publishing-usage-guide) on **Creator Dashboard**.
     */
    universeId: string;

    /**
     * Should we hash the content with MD5 before sending it to the server? This can prevent datastore corruption.
     * @default true
     */
    hashContent?: boolean;
}

export class Client {
    apiKey: string;
    universeId: string;
    hashContent: boolean;

    readonly REST: AxiosInstance;

    readonly DataStore: DataStore;
    readonly PlacePublishing: PlacePublishing;
    readonly Messaging: Messaging;

    constructor(options: ClientOptions) {
        this.universeId = options.universeId;
        this.apiKey = options.apiKey;
        this.hashContent = options.hashContent ?? true;

        this.REST = axios.create({
            baseURL: "https://apis.roblox.com/"
        });

        // Automatically add the API key to the request headers.
        this.REST.interceptors.request.use((config) => {
            config.headers ??= {};
            config.headers["User-Agent"] = "open-cloud.js (https://github.com/xhayper/open-cloud.js, v1.0.0)";
            config.headers["X-Api-Key"] = this.apiKey;
            return config;
        });

        this.DataStore = new DataStore(this);
        this.PlacePublishing = new PlacePublishing(this);
        this.Messaging = new Messaging(this);
    }
}
