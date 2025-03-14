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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MotivoUpdateDTO = exports.MotivoAddDTO = exports.OrigemUpdateDTO = exports.OrigemAddDTO = exports.AtendimentoUpdateDTO = exports.AtendimentoAdminDTO = exports.AtendimentoDoneDTO = exports.AtendimentoStopStartDTO = exports.AtendimentoChangeMotivoDTO = exports.AtendimentoAddDTO = void 0;
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
class AtendimentoAddDTO {
}
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], AtendimentoAddDTO.prototype, "cdchave", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], AtendimentoAddDTO.prototype, "cdorigem", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], AtendimentoAddDTO.prototype, "cdmotivo", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], AtendimentoAddDTO.prototype, "cdfila", void 0);
exports.AtendimentoAddDTO = AtendimentoAddDTO;
class AtendimentoChangeMotivoDTO {
}
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], AtendimentoChangeMotivoDTO.prototype, "cdatendimento", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], AtendimentoChangeMotivoDTO.prototype, "cdmotivo", void 0);
exports.AtendimentoChangeMotivoDTO = AtendimentoChangeMotivoDTO;
class AtendimentoStopStartDTO {
}
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], AtendimentoStopStartDTO.prototype, "cdatendimento", void 0);
exports.AtendimentoStopStartDTO = AtendimentoStopStartDTO;
class AtendimentoDoneDTO {
}
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], AtendimentoDoneDTO.prototype, "cd", void 0);
exports.AtendimentoDoneDTO = AtendimentoDoneDTO;
class AtendimentoAdminDTO {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], AtendimentoAdminDTO.prototype, "atendimentos", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", typeorm_1.Timestamp)
], AtendimentoAdminDTO.prototype, "dtinicio", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", typeorm_1.Timestamp)
], AtendimentoAdminDTO.prototype, "dtfim", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], AtendimentoAdminDTO.prototype, "users", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], AtendimentoAdminDTO.prototype, "clientes", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], AtendimentoAdminDTO.prototype, "completed", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], AtendimentoAdminDTO.prototype, "notNull", void 0);
exports.AtendimentoAdminDTO = AtendimentoAdminDTO;
class timeElapse {
}
class AtendimentoUpdateDTO {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AtendimentoUpdateDTO.prototype, "cd", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], AtendimentoUpdateDTO.prototype, "dtinicio", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], AtendimentoUpdateDTO.prototype, "dtfim", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AtendimentoUpdateDTO.prototype, "cdchave", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], AtendimentoUpdateDTO.prototype, "jslista", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], AtendimentoUpdateDTO.prototype, "done", void 0);
exports.AtendimentoUpdateDTO = AtendimentoUpdateDTO;
class OrigemAddDTO {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrigemAddDTO.prototype, "nmorigem", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrigemAddDTO.prototype, "idicon", void 0);
exports.OrigemAddDTO = OrigemAddDTO;
class OrigemUpdateDTO extends OrigemAddDTO {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], OrigemUpdateDTO.prototype, "cd", void 0);
exports.OrigemUpdateDTO = OrigemUpdateDTO;
class MotivoAddDTO {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MotivoAddDTO.prototype, "nmmotivo", void 0);
exports.MotivoAddDTO = MotivoAddDTO;
class MotivoUpdateDTO extends MotivoAddDTO {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], MotivoUpdateDTO.prototype, "cd", void 0);
exports.MotivoUpdateDTO = MotivoUpdateDTO;
//# sourceMappingURL=atendimento.dto.js.map