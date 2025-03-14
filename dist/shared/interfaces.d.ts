export interface OrdemInterface {
    nordem: number;
}
export interface CadastroServiceInterface {
    add(data: any): Promise<any>;
    all(): Promise<Array<any>>;
    update(data: Array<any>): Promise<Array<any>>;
    delete(cd: number): Promise<void>;
    nextOrdem(): Promise<number>;
}
export declare abstract class CadastroService {
}
