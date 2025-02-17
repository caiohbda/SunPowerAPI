import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsNumber()
  discount: number;

  @IsString()
  distributor: string;

  @IsString()
  @IsOptional()
  role: string;

  @IsOptional()
  @IsString()
  status: string
}
