export declare class ChaveCreateDTO {
    cdcliente: number;
    idfantasia: string;
    nmrazao: string;
    idcnpj: string;
    cdsistema: number;
    nrcontrole: number;
    nrempresas: number;
    nrusuarios: number;
    dtvalidade: string;
    dtexpedicao: string;
    idversaoexe: string;
    idversaodb: string;
    dschave: string;
}
export declare class getVersaoDTO {
    idcnpj: string;
    cdsistema: number;
}
export declare class updateVersaoDTO {
    idcnpj: string;
    cdsistema: number;
    idversaoexe: string;
    idversaodb: string;
}
export declare class updateChaveDTO {
    idcnpj: string;
    cdsistema: number;
    nrcontrole: number;
    nrusuarios: number;
    nrempresas: number;
    dtexpedicao: string;
    dtvalidade: string;
    dschave: string;
}
export declare class addSolicitanteDTO {
    idsolicitante: string;
    idgpacesso: string;
    cdchave: Number;
}
export declare class updateDtvalidadeDTO {
    days: number;
    cdchave: number;
}
export declare class AllChavesFonesDTO {
    skip: number;
    take: number;
    search: string;
}
export declare class UpdateChaveFoneDTO {
    cd: number;
    fone?: string;
    idnome?: string;
}
export declare class CreateChaveFoneDTO {
    cdchave: number;
    fone: string;
    idnome: string;
}
