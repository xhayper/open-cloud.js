import type { OpenCloudError } from "../types/Error";
import { AxiosError } from "axios";
import { Client } from "../Client";

export class Messaging {
    client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    /**
     * Publish a message to a pre-defined topic of an experience. See [Cross-Server Messaging](https://create.roblox.com/docs/scripting/networking/cross-server-messaging#subscribe-users-to-receive-messages) for defining and subscribing users to a topic.
     * @param topic The value can only be alphanumeric characters.
     * @param message The message content that you want to publish to the live server.
     */
    async publish(topic: string, message: string): Promise<void | OpenCloudError> {
        const respond = await this.client.REST.post(
            `/messaging-service/v1/universes/${this.client.universeId}/topics/${topic}`,
            {
                message
            }
        ).catch((res) => res);

        if (respond instanceof AxiosError) {
            return respond.response?.data;
        }
    }
}
