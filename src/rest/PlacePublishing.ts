import type { PublishPlaceResponse } from "../types/PlacePublishing";
import type { OpenCloudError } from "../types/Error";
import { AxiosError } from "axios";
import { Client } from "../Client";

export class PlacePublishing {
    client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    /**
     * Publish a new place or update an existing place with a new version.
     */
    async publishPlace(
        placeId: string,
        versionType: "Saved" | "Published"
    ): Promise<PublishPlaceResponse | OpenCloudError> {
        const respond = await this.client.REST.delete(
            `/universes/v1/universe/${this.client.universeId}/place/${placeId}/versions`,
            {
                params: { versionType }
            }
        ).catch((res) => res);

        if (respond instanceof AxiosError) {
            return respond.response?.data;
        } else {
            return respond.data;
        }
    }
}
