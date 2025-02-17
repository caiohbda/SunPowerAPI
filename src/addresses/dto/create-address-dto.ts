import { IsString } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  cep: string;

  @IsString()
  category: string;

  @IsString()
  street: string;

  @IsString()
  number: string;

  @IsString()
  complement: string;

  @IsString()
  neighborhood: string;

  @IsString()
  city: string;

  @IsString()
  state: string;
}
