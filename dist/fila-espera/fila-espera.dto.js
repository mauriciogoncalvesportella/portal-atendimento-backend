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
exports.FilaEsperaAllDTO = exports.FilaEsperaCreateDTO = void 0;
const class_validator_1 = require("class-validator");
class FilaEsperaCreateDTO {
    constructor() {
        this.fgurgente = false;
    }
}
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], FilaEsperaCreateDTO.prototype, "cdchave", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], FilaEsperaCreateDTO.prototype, "cdsolicitante", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilaEsperaCreateDTO.prototype, "mmobservacao", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], FilaEsperaCreateDTO.prototype, "cduser", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], FilaEsperaCreateDTO.prototype, "fgurgente", void 0);
exports.FilaEsperaCreateDTO = FilaEsperaCreateDTO;
class FilaEsperaAllDTO {
}
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], FilaEsperaAllDTO.prototype, "skip", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], FilaEsperaAllDTO.prototype, "take", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], FilaEsperaAllDTO.prototype, "cdchave", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], FilaEsperaAllDTO.prototype, "cdsolicitante", void 0);
__decorate([
    (0, class_validator_1.IsISO8601)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilaEsperaAllDTO.prototype, "date", void 0);
exports.FilaEsperaAllDTO = FilaEsperaAllDTO;
//# sourceMappingURL=fila-espera.dto.js.map