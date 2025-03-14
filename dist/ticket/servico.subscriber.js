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
exports.ServicoSubscriber = void 0;
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const user_entity_1 = require("../user/user.entity");
const servico_entity_1 = require("./servico.entity");
const monitor_service_1 = require("../monitor/monitor.service");
const atendimento_entity_1 = require("../atendimento/atendimento.entity");
let ServicoSubscriber = class ServicoSubscriber {
    constructor(connection, monitorService) {
        this.connection = connection;
        this.monitorService = monitorService;
        connection.subscribers.push(this);
    }
    listenTo() {
        return servico_entity_1.ServicoEntity;
    }
    async beforeInsert(event) {
        event.entity.dtinicio = new Date();
    }
    async beforeUpdate(event) {
        const atendimento = new atendimento_entity_1.AtendimentoEntity();
        atendimento.dtcriacao = event.entity.dtinicio;
        this.monitorService.removeMonitorCache(undefined, true);
    }
};
ServicoSubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)(),
    __param(0, (0, typeorm_2.InjectConnection)()),
    __metadata("design:paramtypes", [typeorm_1.Connection,
        monitor_service_1.MonitorService])
], ServicoSubscriber);
exports.ServicoSubscriber = ServicoSubscriber;
//# sourceMappingURL=servico.subscriber.js.map