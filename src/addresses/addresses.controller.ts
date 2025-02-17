import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address-dto';
import { Address } from '@prisma/client';

@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressService: AddressesService) {}

  @Post('create')
  async createAddress(@Body() addressData: CreateAddressDto): Promise<Address> {
    return this.addressService.createAddress(addressData);
  }

  @Get('/')
  async getAllAddresses(){
    const addresses = await this.addressService.findAll();
    return addresses;
  }

  @Delete(':id')
  async deleteAddress(@Param('id') id: string) {
    return this.addressService.deleteAddress(id);
  }
} 
