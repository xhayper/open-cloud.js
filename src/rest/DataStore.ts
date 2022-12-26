import type { OpenCloudError } from "../types/Error";
import { robloxMD5 } from "../Utility";
import { AxiosError } from "axios";
import { Client } from "../Client";
import type {
    DataStoreDeleteEntryParams,
    DataStoreGetEntryParams,
    DataStoreGetEntryResponse,
    DataStoreGetEntryVersionParams,
    DataStoreIncrementEntryParams,
    DataStoreIncrementEntryResponse,
    DataStoreListEntriesParams,
    DataStoreListEntriesResponse,
    DataStoreListEntryVersionsParams,
    DataStoreSetEntryParams,
    EntryVersion
} from "../types/DataStore";

type RemoveDataStoreName<Type> = {
    [Property in keyof Type as Exclude<Property, "datastoreName">]: Type[Property];
};

export class DataStoreInstance {
    client: Client;

    readonly name: string;
    readonly createdAt?: Date;

    constructor(client: Client, name: string, createdTime?: string) {
        this.client = client;
        this.name = name;

        this.createdAt = createdTime ? new Date(createdTime) : undefined;
    }

    /**
     * Returns a list of entry keys within a data store.
     */
    async listEntries(
        options: RemoveDataStoreName<DataStoreListEntriesParams> = {}
    ): Promise<{ keys: string[]; nextPageCursor?: string } | OpenCloudError> {
        const respond = await this.client.REST.get(
            `/datastores/v1/universes/${this.client.universeId}/standard-datastores/datastore/entries`,
            {
                params: { datastoreName: this.name, ...options }
            }
        ).catch((res) => res);

        if (respond instanceof AxiosError) {
            return respond.response?.data;
        } else {
            return respond.data;
        }
    }

    /**
     * Returns the value and metadata associated with an entry.
     */
    async getEntry<R = any>(options: RemoveDataStoreName<DataStoreGetEntryParams>): Promise<void | R | OpenCloudError> {
        const respond = await this.client.REST.get(
            `/datastores/v1/universes/${this.client.universeId}/standard-datastores/datastore/entries/entry`,
            {
                params: { datastoreName: this.name, ...options }
            }
        ).catch((res) => res);

        if (respond instanceof AxiosError) {
            return respond.response?.data;
        } else {
            return respond.data;
        }
    }

    /**
     * Sets the value, metadata and user IDs associated with an entry.
     */
    async setEntry(
        options: RemoveDataStoreName<DataStoreSetEntryParams> & {
            content: string;
            attribute?: string;
            userIds?: string;
        }
    ): Promise<EntryVersion | OpenCloudError> {
        const content = options.content;
        // @ts-expect-error
        delete options.content;

        const headers: any = {
            "content-type": "application/json",
            "content-md5": this.client.hashContent ? robloxMD5(content) : undefined,
            "roblox-entry-attributes": options.attribute,
            "roblox-entry-userids": options.userIds
        };
        delete options.attribute;
        delete options.userIds;

        if (!headers["content-md5"]) delete headers["content-md5"];

        const respond = await this.client.REST.post(
            `/datastores/v1/universes/${this.client.universeId}/standard-datastores/datastore/entries/entry`,
            content,
            {
                params: { datastoreName: this.name, ...options },
                headers: headers as any
            }
        ).catch((res) => res);

        if (respond instanceof AxiosError) {
            return respond.response?.data;
        } else {
            return respond.data;
        }
    }

    /**
     * Marks the entry as deleted by creating a tombstone version. Entries are deleted permanently after 30 days.
     */
    async deleteEntry(options: RemoveDataStoreName<DataStoreDeleteEntryParams>): Promise<void | OpenCloudError> {
        const respond = await this.client.REST.delete(
            `/datastores/v1/universes/${this.client.universeId}/standard-datastores/datastore/entries/entry`,
            {
                params: { datastoreName: this.name, ...options }
            }
        ).catch((res) => res);

        if (respond instanceof AxiosError) {
            return respond.response?.data;
        }
    }

    /**
     * Increments the value for an entry by a given amount, or create a new entry with that amount.
     */
    async incrementEntry(
        options: RemoveDataStoreName<DataStoreIncrementEntryParams> & {
            attribute?: string;
            userIds?: string;
        }
    ): Promise<DataStoreIncrementEntryResponse | OpenCloudError> {
        const headers: any = {
            "roblox-entry-attributes": options.attribute,
            "roblox-entry-userids": options.userIds
        };
        delete options.attribute;
        delete options.userIds;

        const respond = await this.client.REST.post(
            `/datastores/v1/universes/${this.client.universeId}/standard-datastores/datastore/entries/entry/increment`,
            "",
            {
                params: { datastoreName: this.name, ...options },
                headers: headers as any
            }
        ).catch((res) => res);

        if (respond instanceof AxiosError) {
            return respond.response?.data;
        } else {
            return respond.data;
        }
    }

    /**
     * Returns the value and metadata of a specific version of an entry.
     */
    async getEntryVersion(
        options: RemoveDataStoreName<DataStoreGetEntryVersionParams>
    ): Promise<DataStoreGetEntryVersionParams | OpenCloudError> {
        const respond = await this.client.REST.get(
            `/datastores/v1/universes/${this.client.universeId}/standard-datastores/datastore/entries/entry/versions/version`,
            {
                params: { datastoreName: this.name, ...options }
            }
        ).catch((res) => res);

        if (respond instanceof AxiosError) {
            return respond.response?.data;
        } else {
            return respond.data;
        }
    }

    /**
     * Returns a list of data stores belonging to an experience.
     */
    async listEntryVersion(
        options: RemoveDataStoreName<DataStoreListEntryVersionsParams>
    ): Promise<DataStoreListEntriesResponse | OpenCloudError> {
        const respond = await this.client.REST.get(
            `/datastores/v1/universes/${this.client.universeId}/standard-datastores/datastore/entries/entry/versions`,
            {
                params: { datastoreName: this.name, ...options }
            }
        ).catch((res) => res);

        if (respond instanceof AxiosError) {
            return respond.response?.data;
        } else {
            return respond.data;
        }
    }
}

export class DataStore {
    client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    createInstance(name: string): DataStoreInstance {
        return new DataStoreInstance(this.client, name);
    }

    /**
     * Returns a list of data stores belonging to an experience.
     */
    async getDatastores(
        options: {
            /**
             * Provide to request the next set of data. See [Cursors](https://create.roblox.com/docs/reference/cloud/data-stores-handling-requests#cursors).
             */
            cursor?: string;
            /**
             * The maximum number of items to return.
             */
            limit?: number;
            /**
             * Provide to return only data stores with this prefix.
             */
            prefix?: string;
        } = {}
    ): Promise<DataStoreInstance[] | OpenCloudError> {
        const respond = await this.client.REST.get(
            `/datastores/v1/universes/${this.client.universeId}/standard-datastores`,
            {
                params: options
            }
        ).catch((res) => res);

        if (respond instanceof AxiosError) {
            return respond.response?.data;
        } else {
            const datastoreList = respond.data.datastores;
            return datastoreList.map(
                (datastore: any) => new DataStoreInstance(this.client, datastore.name, datastore.createdTime)
            );
        }
    }
}
