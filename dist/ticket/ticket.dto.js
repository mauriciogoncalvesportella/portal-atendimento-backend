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
exports.UrgenciaUpdateDTO = exports.UrgenciaAddDTO = exports.SituacaoUpdateDTO = exports.SituacaoAddDTO = exports.ChangeSituacaoDTO = exports.LinkUserToTicketDTO = exports.LinkAtendimentoToTicketDTO = exports.TicketAcaoAddDTO = exports.AcaoAddDTO = exports.TicketFilterDTO = exports.AcaoAnexoDownloadDTO = exports.allUsersFromTicketDTO = exports.TicketAddDTO = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class TicketAddDTO {
}
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], TicketAddDTO.prototype, "emitAcao", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], TicketAddDTO.prototype, "cd", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], TicketAddDTO.prototype, "cdmotivo", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], TicketAddDTO.prototype, "fgticket", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], TicketAddDTO.prototype, "cdsolicitante", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], TicketAddDTO.prototype, "cdsituacao", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], TicketAddDTO.prototype, "cdurgencia", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], TicketAddDTO.prototype, "cdsistema", void 0);
__decorate([
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], TicketAddDTO.prototype, "users", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], TicketAddDTO.prototype, "cdresponsavel", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], TicketAddDTO.prototype, "cdatendimento", void 0);
__decorate([
    (0, class_validator_1.IsISO8601)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], TicketAddDTO.prototype, "dtprevisao", void 0);
exports.TicketAddDTO = TicketAddDTO;
class allUsersFromTicketDTO {
}
__decorate([
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], allUsersFromTicketDTO.prototype, "cdticketArray", void 0);
exports.allUsersFromTicketDTO = allUsersFromTicketDTO;
class AcaoAnexoDownloadDTO {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AcaoAnexoDownloadDTO.prototype, "cdticket", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AcaoAnexoDownloadDTO.prototype, "cdacao", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AcaoAnexoDownloadDTO.prototype, "nmfile", void 0);
exports.AcaoAnexoDownloadDTO = AcaoAnexoDownloadDTO;
class TicketFilterDTO {
}
__decorate([
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], TicketFilterDTO.prototype, "options", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], TicketFilterDTO.prototype, "ticketsdia", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], TicketFilterDTO.prototype, "cd", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], TicketFilterDTO.prototype, "fgticket", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], TicketFilterDTO.prototype, "situacao", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], TicketFilterDTO.prototype, "urgencia", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], TicketFilterDTO.prototype, "motivo", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], TicketFilterDTO.prototype, "users", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], TicketFilterDTO.prototype, "chaves", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsISO8601)(),
    __metadata("design:type", String)
], TicketFilterDTO.prototype, "dt0", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsISO8601)(),
    __metadata("design:type", String)
], TicketFilterDTO.prototype, "dt1", void 0);
exports.TicketFilterDTO = TicketFilterDTO;
class AcaoAddDTO {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], AcaoAddDTO.prototype, "cd", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], AcaoAddDTO.prototype, "cdticket", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], AcaoAddDTO.prototype, "cdresponsavel", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], AcaoAddDTO.prototype, "cdsituacao", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], AcaoAddDTO.prototype, "cduser", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], AcaoAddDTO.prototype, "fgstatus", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AcaoAddDTO.prototype, "nmassunto", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AcaoAddDTO.prototype, "mmdesc", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], AcaoAddDTO.prototype, "jsanexos", void 0);
exports.AcaoAddDTO = AcaoAddDTO;
class TicketAcaoAddDTO {
}
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsNotEmptyObject)(),
    (0, class_transformer_1.Type)(() => TicketAddDTO),
    __metadata("design:type", TicketAddDTO)
], TicketAcaoAddDTO.prototype, "ticket", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsNotEmptyObject)(),
    (0, class_transformer_1.Type)(() => AcaoAddDTO),
    __metadata("design:type", AcaoAddDTO)
], TicketAcaoAddDTO.prototype, "acao", void 0);
exports.TicketAcaoAddDTO = TicketAcaoAddDTO;
class LinkAtendimentoToTicketDTO {
}
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], LinkAtendimentoToTicketDTO.prototype, "cdticket", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], LinkAtendimentoToTicketDTO.prototype, "cdatendimento", void 0);
exports.LinkAtendimentoToTicketDTO = LinkAtendimentoToTicketDTO;
class LinkUserToTicketDTO {
}
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], LinkUserToTicketDTO.prototype, "cdticket", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], LinkUserToTicketDTO.prototype, "cduser", void 0);
exports.LinkUserToTicketDTO = LinkUserToTicketDTO;
class ChangeSituacaoDTO {
}
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ChangeSituacaoDTO.prototype, "cd", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ChangeSituacaoDTO.prototype, "cdsituacao", void 0);
exports.ChangeSituacaoDTO = ChangeSituacaoDTO;
class SituacaoAddDTO {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SituacaoAddDTO.prototype, "nmsituacao", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SituacaoAddDTO.prototype, "idicon", void 0);
exports.SituacaoAddDTO = SituacaoAddDTO;
class SituacaoUpdateDTO extends SituacaoAddDTO {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SituacaoUpdateDTO.prototype, "cd", void 0);
exports.SituacaoUpdateDTO = SituacaoUpdateDTO;
class UrgenciaAddDTO {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UrgenciaAddDTO.prototype, "nmurgencia", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UrgenciaAddDTO.prototype, "idcolor", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UrgenciaAddDTO.prototype, "nprevisao", void 0);
exports.UrgenciaAddDTO = UrgenciaAddDTO;
class UrgenciaUpdateDTO extends UrgenciaAddDTO {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UrgenciaUpdateDTO.prototype, "cd", void 0);
exports.UrgenciaUpdateDTO = UrgenciaUpdateDTO;
//# sourceMappingURL=ticket.dto.js.map