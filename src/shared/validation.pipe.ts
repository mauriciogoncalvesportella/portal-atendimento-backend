import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, HttpStatus, HttpException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata : ArgumentMetadata) {
    if (value instanceof Object && this.isEmpty(value)) {
      throw new HttpException(
        'Validation failed: No body', 
        HttpStatus.BAD_REQUEST
      );
    }
    
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new HttpException(this.formatErros(errors), HttpStatus.BAD_REQUEST);
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private formatErros(erros: any[]) {
    return erros.map(err => {
      for (let property in err.constraints) {
        return err.constraints[property];
      }
    });
  }

  private isEmpty(value: any) {
    if (Object.keys(value).length > 0) 
      return false
    
    return true;
  }
}