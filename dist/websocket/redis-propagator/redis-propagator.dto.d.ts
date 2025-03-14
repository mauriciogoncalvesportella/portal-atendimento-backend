export declare class RedisSocketEventEmitDTO {
    readonly event: string;
    readonly data: unknown;
    readonly cduser?: number;
    readonly socketId?: string;
    constructor(event: string, data: unknown, cduser?: number, socketId?: string);
}
export declare class RedisSocketEventRoomDTO extends RedisSocketEventEmitDTO {
    readonly room: string;
    constructor(room: string, event: string, data: unknown, cduser?: number, socketId?: string);
}
export declare class RedisSocketEventUserDTO extends RedisSocketEventEmitDTO {
    readonly cduserTarget: number;
    constructor(cduserTarget: number, event: string, data: unknown, cduser?: number, socketId?: string);
}
