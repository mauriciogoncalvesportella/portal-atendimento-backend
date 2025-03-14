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
exports.CreateChaveFoneDTO = exports.UpdateChaveFoneDTO = exports.AllChavesFonesDTO = exports.updateDtvalidadeDTO = exports.addSolicitanteDTO = exports.updateChaveDTO = exports.updateVersaoDTO = exports.getVersaoDTO = exports.ChaveCreateDTO = void 0;
const class_validator_1 = require("class-validator");
class ChaveCreateDTO {
}
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ChaveCreateDTO.prototype, "cdcliente", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChaveCreateDTO.prototype, "idfantasia", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChaveCreateDTO.prototype, "nmrazao", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/),
    __metadata("design:type", String)
], ChaveCreateDTO.prototype, "idcnpj", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ChaveCreateDTO.prototype, "cdsistema", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ChaveCreateDTO.prototype, "nrcontrole", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ChaveCreateDTO.prototype, "nrempresas", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ChaveCreateDTO.prototype, "nrusuarios", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], ChaveCreateDTO.prototype, "dtvalidade", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], ChaveCreateDTO.prototype, "dtexpedicao", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChaveCreateDTO.prototype, "idversaoexe", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChaveCreateDTO.prototype, "idversaodb", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChaveCreateDTO.prototype, "dschave", void 0);
exports.ChaveCreateDTO = ChaveCreateDTO;
class getVersaoDTO {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/),
    __metadata("design:type", String)
], getVersaoDTO.prototype, "idcnpj", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], getVersaoDTO.prototype, "cdsistema", void 0);
exports.getVersaoDTO = getVersaoDTO;
class updateVersaoDTO {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/),
    __metadata("design:type", String)
], updateVersaoDTO.prototype, "idcnpj", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], updateVersaoDTO.prototype, "cdsistema", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], updateVersaoDTO.prototype, "idversaoexe", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], updateVersaoDTO.prototype, "idversaodb", void 0);
exports.updateVersaoDTO = updateVersaoDTO;
class updateChaveDTO {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/),
    __metadata("design:type", String)
], updateChaveDTO.prototype, "idcnpj", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], updateChaveDTO.prototype, "cdsistema", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], updateChaveDTO.prototype, "nrcontrole", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], updateChaveDTO.prototype, "nrusuarios", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], updateChaveDTO.prototype, "nrempresas", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], updateChaveDTO.prototype, "dtexpedicao", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], updateChaveDTO.prototype, "dtvalidade", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], updateChaveDTO.prototype, "dschave", void 0);
exports.updateChaveDTO = updateChaveDTO;
class addSolicitanteDTO {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], addSolicitanteDTO.prototype, "idsolicitante", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], addSolicitanteDTO.prototype, "idgpacesso", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], addSolicitanteDTO.prototype, "cdchave", void 0);
exports.addSolicitanteDTO = addSolicitanteDTO;
class updateDtvalidadeDTO {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], updateDtvalidadeDTO.prototype, "days", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], updateDtvalidadeDTO.prototype, "cdchave", void 0);
exports.updateDtvalidadeDTO = updateDtvalidadeDTO;
class AllChavesFonesDTO {
}
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], AllChavesFonesDTO.prototype, "skip", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], AllChavesFonesDTO.prototype, "take", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AllChavesFonesDTO.prototype, "search", void 0);
exports.AllChavesFonesDTO = AllChavesFonesDTO;
class UpdateChaveFoneDTO {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateChaveFoneDTO.prototype, "cd", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateChaveFoneDTO.prototype, "fone", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateChaveFoneDTO.prototype, "idnome", void 0);
exports.UpdateChaveFoneDTO = UpdateChaveFoneDTO;
class CreateChaveFoneDTO {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateChaveFoneDTO.prototype, "cdchave", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateChaveFoneDTO.prototype, "fone", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateChaveFoneDTO.prototype, "idnome", void 0);
exports.CreateChaveFoneDTO = CreateChaveFoneDTO;
//# sourceMappingURL=chave.dto.js.map