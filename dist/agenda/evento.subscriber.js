"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventoSubscriber = void 0;
const typeorm_1 = require("typeorm");
const evento_entity_1 = require("./evento.entity");
const typeorm_2 = require("@nestjs/typeorm");
let EventoSubscriber = class EventoSubscriber {
    constructor(connection) {
        this.connection = connection;
        connection.subscribers.push(this);
    }
    listenTo() {
        return evento_entity_1.EventoEntity;
    }
    async beforeInsert(evento) {
        if (evento.entity.fgrecorrente) {
            evento.entity.dtinicio = null;
            evento.entity.dtfim = null;
            evento.entity.dtrealizadoinicio = null;
            evento.entity.dtrealizadofim = null;
        }
    }
};
EventoSubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)(),
    __param(0, (0, typeorm_2.InjectConnection)()),
    __metadata("design:paramtypes", [typeorm_1.Connection])
], EventoSubscriber);
exports.EventoSubscriber = EventoSubscriber;
//# sourceMappingURL=evento.subscriber.js.map