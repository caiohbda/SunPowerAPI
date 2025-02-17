import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateAddressDto } from './dto/create-address-dto';
import { Address } from '@prisma/client';

@Injectable()
export class AddressesService {
  @Inject()
  private readonly prisma: PrismaService;

  async createAddress(data: CreateAddressDto): Promise<Address> {
    return this.prisma.address.create({ data })
  }

  async findAll(): Promise<Address[]> {
    const address = await this.prisma.address.findMany()
    return address
  }

    async deleteAddress(id: string){
      const address = await this.prisma.address.findUnique({ where: { id }});

      if (!address) {
        throw new NotFoundException('Usuário não encontrado!');
      }

      await this.prisma.address.delete({ where: { id }})

      return { message: 'endereço deletado com sucesso'}
    }
}
