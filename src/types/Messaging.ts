export interface PublishRequest {
    /**
     * The message content that you want to publish to the live server.
     */
    message: string;
}

export interface PublishMessageBody extends PublishRequest {}
