export interface PublishPlaceBody {
    /**
     * Can only be either:
     * - `Saved`: the place file should be saved, but not published.
     * - `Published`: the place file should be saved and published.
     */
    versionType?: "Saved" | "Published";
}

export interface PublishPlaceResponse {
    versionNumber: number;
}
