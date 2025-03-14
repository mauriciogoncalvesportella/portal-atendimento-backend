export declare class Turno {
    dtinicio: string;
    dtfim: string;
    constructor(dtinicio: string, dtfim: string);
}
export declare class UserLoginDTO {
    idlogin: string;
    idsenha: string;
}
export declare class UserCreateDTO {
    idlogin: string;
    idsenha: string;
    grupoacesso: number;
    idnome: string;
    idemail: string;
    idcolor: string;
    jsturnos: Turno[];
}
export declare class UserUpdateDTO {
    cd: number;
    idlogin: string;
    idsenha: string;
    grupoacesso: number;
    idnome: string;
    idcolor: string;
    idemail: string;
    jsturnos: Turno[];
}
export declare class GrupoAcessoAddDTO {
    cd: number;
    idnome: String;
    idicon: String;
    jsroles: String[];
}
