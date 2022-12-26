import crypto, { type BinaryLike, type Encoding } from "node:crypto";

export function robloxMD5(data: BinaryLike): string;
export function robloxMD5(data: string, inputEncoding: Encoding): string;

export function robloxMD5(data: any, inputEncoding?: any): string {
    return crypto.createHash("md5").update(data, inputEncoding).digest().toString("base64");
}
