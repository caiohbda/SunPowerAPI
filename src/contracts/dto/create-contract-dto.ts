import { IsString } from 'class-validator';

export class CreateContractDto {
  @IsString()
  code: string;

  @IsString()
  userId: string;

  @IsString()
  addressId: string;
}
