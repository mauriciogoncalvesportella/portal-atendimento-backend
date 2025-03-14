import { InternalServerErrorException } from "@nestjs/common";
import { Xc3Service } from "./xc3.service";
export declare class Xc3Controller {
    private xc3Service;
    constructor(xc3Service: Xc3Service);
    getFoneInfo(fone: string): Promise<{
        status: string;
        phone: string;
        name: string;
        code: Number;
        indebt: boolean;
        supervisor: string;
    } | {
        status: string;
        phone?: undefined;
        name?: undefined;
        code?: undefined;
        indebt?: undefined;
        supervisor?: undefined;
    } | InternalServerErrorException>;
    addAtendimento(ramal: string, cdchave: number): Promise<void>;
    bind(data: any): Promise<void>;
    getFoneList(): Promise<string[]>;
}
