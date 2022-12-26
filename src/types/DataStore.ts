export interface BaseDataStoreParams {
    /**
     * The name of the data store.
     */
    datastoreName: string;
    /**
     * The value is `global` by default.. See [Scopes](https://create.roblox.com/docs/scripting/data/data-stores#scopes).
     */
    scope?: string;
}

export interface BaseDataStoreEntryParams extends BaseDataStoreParams {
    /**
     * The key identifing the entry.
     */
    entryKey: string;
}

//////////////////////////////////////////////////////

export interface DataStore {
    /**
     * The name of your data store.
     */
    name: string;
    /**
     * The timestamp of when the data store was created in the ISO time format.
     */
    createdTime: string;
}

export interface EntryVersion {
    /**
     * The version name of the qualifying entry.
     */
    version: string;
    /**
     * Indicates whether the entry has been deleted.
     */
    deleted: boolean;
    /**
     * The length of the content.
     */
    contentLength: number;
    /**
     * The timestamp of when the version was created in the ISO time format.
     */
    createdTime: string;
    /**
     * The timestamp of when the data store was created in the ISO time format.
     */
    objectCreatedTime: string;
}

//////////////////////////////////////////////////////

export interface DataStoreListDataStoreParams {
    cursor?: string;
    limit?: number;
    prefix?: string;
}

export interface DataStoreListEntriesParams extends BaseDataStoreParams {
    allScopes?: boolean;
    prefix?: string;
    cursor?: string;
    limit?: number;
}

export interface DataStoreGetEntryParams extends BaseDataStoreEntryParams {}

export interface DataStoreSetEntryParams extends BaseDataStoreEntryParams {
    /**
     * Provide to update only if the current version matches this.
     */
    matchVersion?: string;
    /**
     * Create the entry only if it does not exist.
     */
    exclusiveCreate?: boolean;
}

export interface DataStoreDeleteEntryParams extends BaseDataStoreEntryParams {}

export interface DataStoreIncrementEntryParams extends BaseDataStoreEntryParams {
    /**
     * The amount by which the entry should be incremented, or the starting value if it doesn't exist.
     */
    incrementBy: number;
}

export interface DataStoreGetEntryVersionParams extends BaseDataStoreEntryParams {
    /**
     * The version to inspect.
     */
    versionId: string;
}

export interface DataStoreListEntryVersionsParams extends BaseDataStoreEntryParams {
    /**
     * Provide to request the next set of data (see [Cursors](https://create.roblox.com/docs/reference/cloud/data-stores-handling-requests#cursors)).
     */
    cursor?: string;
    /**
     * Provide to not include versions earlier than this timestamp.
     */
    startTime?: string;
    /**
     * Provide to not include versions later than this timestamp.
     */
    endTime?: string;
    /**
     * Either `Ascending` (earlier versions first) or `Descending` (later versions first).
     */
    sortOrder?: "Ascending" | "Descending";
    /**
     * The maximum number of items to return.
     */
    limit?: number;
}

//////////////////////////////////////////////////////

export interface DataStoreSetEntryHeader {
    /**
     * Attributes to be associated with new version of the entry. Serialized by JSON map objects. If not provided, existing attributes are cleared.
     */
    "roblox-entry-attributes"?: string;
    /**
     * Comma-separated list of Roblox user IDs tagged with the entry. If not provided, existing user IDs are cleared.
     */
    "roblox-entry-userids"?: string;
    /**
     * The base-64 encoded MD5 checksum of the content. See [Content-MD5](https://create.roblox.com/docs/reference/cloud/data-stores-handling-requests#content-md5).
     */
    "content-md5"?: string;
}

export interface DataStoreIncrementEntryHeader {
    /**
     * Attributes to be associated with new version of the entry. Serialized by JSON map objects. If not provided, existing attributes are cleared.
     */
    "roblox-entry-attributes"?: string;
    /**
     * Comma-separated list of Roblox user IDs tagged with the entry. If not provided, existing user IDs are cleared.
     */
    "roblox-entry-userids"?: string;
}

//////////////////////////////////////////////////////

export interface DataStoreListDataStoreResponse {
    /**
     * An array of data stores in the target experience.
     */
    data: DataStore[];
    /**
     * Indicates that there is more data available in the requested result set. See [Cursors](https://create.roblox.com/docs/reference/cloud/data-stores-handling-requests#cursors).
     */
    nextPageCursor?: string;
}

export interface DataStoreListEntriesResponse {
    /**
     * An array of entry keys within the target data store.
     */
    keys: { key: string }[];
    /**
     * Indicates that there is more data available in the requested result set. See [Cursors](https://create.roblox.com/docs/reference/cloud/data-stores-handling-requests#cursors).
     */
    nextPageCursor?: string;
}

export interface DataStoreGetEntryResponse {
    /**
     * The time at which the entry was created.
     */
    "roblox-entry-created-time": string;
    /**
     * The time at which this particular version was created.
     */
    "last-modified": string;
    /**
     * The version of the returned entry.
     */
    "roblox-entry-version": string;
    /**
     * Attributes associated with the returned entry. Serialized JSON map object.
     */
    "roblox-entry-attributes": string;
    /**
     * Comma-separated list of Roblox user IDs tagged with the entry.
     */
    "roblox-entry-userids": number[];
    /**
     * The base-64 encoded MD5 checksum of the content. See [Content-MD5](https://create.roblox.com/docs/reference/cloud/data-stores-handling-requests#content-md5).
     */
    "content-md5": string;
}

export interface DataStoreIncrementEntryResponse {
    /**
     * The time at which the entry was created.
     */
    "roblox-entry-created-time": string;
    /**
     * The time at which this particular version was created.
     */
    "last-modified": string;
    /**
     * The version of the returned entry.
     */
    "roblox-entry-version": string;
    /**
     * Attributes associated with the returned entry. Serialized JSON map object.
     */
    "roblox-entry-attributes": string;
    /**
     * Comma-separated list of Roblox user IDs tagged with the entry.
     */
    "roblox-entry-userids": number[];
    /**
     * The base-64 encoded MD5 checksum of the content. See [Content-MD5](https://create.roblox.com/docs/reference/cloud/data-stores-handling-requests#content-md5).
     */
    "content-md5": string;
}

export interface DataStoreGetEntryVersionResponse {
    /**
     * The time at which the entry was created.
     */
    "roblox-entry-created-time": string;
    /**
     * The time at which this particular version was created.
     */
    "last-modified": string;
    /**
     * The version of the returned entry.
     */
    "roblox-entry-version": string;
}

export interface DataStoreListEntryVersionsResponse extends EntryVersion {}
