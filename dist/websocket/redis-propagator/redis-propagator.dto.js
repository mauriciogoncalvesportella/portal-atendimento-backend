"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisSocketEventUserDTO = exports.RedisSocketEventRoomDTO = exports.RedisSocketEventEmitDTO = void 0;
class RedisSocketEventEmitDTO {
    constructor(event, data, cduser, socketId) {
        this.event = event;
        this.data = data;
        this.cduser = cduser;
        this.socketId = socketId;
    }
}
exports.RedisSocketEventEmitDTO = RedisSocketEventEmitDTO;
class RedisSocketEventRoomDTO extends RedisSocketEventEmitDTO {
    constructor(room, event, data, cduser, socketId) {
        super(event, data, cduser, socketId);
        this.room = room;
    }
}
exports.RedisSocketEventRoomDTO = RedisSocketEventRoomDTO;
class RedisSocketEventUserDTO extends RedisSocketEventEmitDTO {
    constructor(cduserTarget, event, data, cduser, socketId) {
        super(event, data, cduser, socketId);
        this.cduserTarget = cduserTarget;
    }
}
exports.RedisSocketEventUserDTO = RedisSocketEventUserDTO;
//# sourceMappingURL=redis-propagator.dto.js.map