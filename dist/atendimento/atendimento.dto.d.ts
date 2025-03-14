import { Timestamp } from "typeorm";
export declare class AtendimentoAddDTO {
    cdchave: Number;
    cdorigem: Number;
    cdmotivo: Number;
    cdfila: number;
}
export declare class AtendimentoChangeMotivoDTO {
    cdatendimento: number;
    cdmotivo: number;
}
export declare class AtendimentoStopStartDTO {
    cdatendimento: number;
}
export declare class AtendimentoDoneDTO {
    cd: Number;
}
export declare class AtendimentoAdminDTO {
    atendimentos: Array<any>;
    dtinicio: Timestamp;
    dtfim: Timestamp;
    users: Array<any>;
    clientes: Array<any>;
    completed: Boolean;
    notNull: String[];
}
declare class timeElapse {
    dtinicio: Date;
    dtfim: Date;
}
export declare class AtendimentoUpdateDTO {
    cd: Number;
    dtinicio: Date;
    dtfim: Date;
    cdchave: Number;
    jslista: Array<timeElapse>;
    done: boolean;
}
export declare class OrigemAddDTO {
    nmorigem: string;
    idicon: string;
}
export declare class OrigemUpdateDTO extends OrigemAddDTO {
    cd: number;
}
export declare class MotivoAddDTO {
    nmmotivo: string;
}
export declare class MotivoUpdateDTO extends MotivoAddDTO {
    cd: number;
}
export {};
