export enum ERROR_CODE {
    INVALID_ARGUMENT = "INVALID_ARGUMENT",
    INSUFFICIENT_SCOPE = "INSUFFICIENT_SCOPE",
    PERMISSION_DENIED = "PERMISSION_DENIED",
    NOT_FOUND = "NOT_FOUND",
    ABORTED = "ABORTED",
    RESOURCE_EXHAUSTED = "RESOURCE_EXHAUSTED",
    CANCELLED = "CANCELLED",
    INTERNAL = "INTERNAL",
    NOT_IMPLEMENTED = "NOT_IMPLEMENTED",
    UNAVAILABLE = "UNAVAILABLE"
}

export interface OpenCloudError {
    Error: ERROR_CODE;
    Message: string;
    ErrorDetails?: any[];
}
