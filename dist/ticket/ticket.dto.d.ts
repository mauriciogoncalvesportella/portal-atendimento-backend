export declare class TicketAddDTO {
    emitAcao: boolean;
    cd: number;
    cdmotivo: number;
    fgticket: number;
    cdsolicitante: number;
    cdsituacao: number;
    cdurgencia: number;
    cdsistema: number;
    users: Array<number>;
    cdresponsavel: number;
    cdatendimento: number;
    dtprevisao: Date;
}
export declare class allUsersFromTicketDTO {
    cdticketArray: Array<number>;
}
export declare class AcaoAnexoDownloadDTO {
    cdticket: number;
    cdacao: number;
    nmfile: string;
}
export declare class TicketFilterDTO {
    options: any;
    ticketsdia: boolean;
    cd: Array<number>;
    fgticket: Array<number>;
    situacao: Array<number>;
    urgencia: Array<number>;
    motivo: Array<number>;
    users: Array<number>;
    chaves: Array<number>;
    dt0: string;
    dt1: string;
}
export declare class AcaoAddDTO {
    cd: number;
    cdticket: number;
    cdresponsavel: number;
    cdsituacao: number;
    cduser: number;
    fgstatus: number;
    nmassunto: string;
    mmdesc: string;
    jsanexos: Array<any>;
}
export declare class TicketAcaoAddDTO {
    ticket: TicketAddDTO;
    acao: AcaoAddDTO;
}
export declare class LinkAtendimentoToTicketDTO {
    cdticket: number;
    cdatendimento: number;
}
export declare class LinkUserToTicketDTO {
    cdticket: number;
    cduser: number;
}
export declare class ChangeSituacaoDTO {
    cd: number;
    cdsituacao: number;
}
export declare class SituacaoAddDTO {
    nmsituacao: string;
    idicon: string;
}
export declare class SituacaoUpdateDTO extends SituacaoAddDTO {
    cd: number;
}
export declare class UrgenciaAddDTO {
    nmurgencia: string;
    idcolor: string;
    nprevisao: number;
}
export declare class UrgenciaUpdateDTO extends UrgenciaAddDTO {
    cd: number;
}
