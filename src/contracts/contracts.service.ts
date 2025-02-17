import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateContractDto } from './dto/create-contract-dto';
import { Contract } from '@prisma/client';

@Injectable()
export class ContractsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateContractDto): Promise<Contract> {
    const userExists = await this.prisma.user.findUnique({
      where: { id: data.userId },
    });
    if (!userExists) {
      throw new NotFoundException('Usuário não encontrado!');
    }

    const addressExists = await this.prisma.address.findUnique({
      where: { id: data.addressId },
    });
    if (!addressExists) {
      throw new NotFoundException('Endereço não encontrado!');
    }

    return this.prisma.contract.create({
      data: {
        code: data.code,
        userId: data.userId,
        addressId: data.addressId,
      },
    });
  }

  async findAll(): Promise<Contract[]>{
    const contracts = await this.prisma.contract.findMany();
    return contracts;
  }

  async delete(id: string): Promise<{ message: string }> {
    const contract = await this.prisma.contract.findUnique({
      where: { id },
    });

    if (!contract) {
      throw new NotFoundException('Contrato não encontrado!');
    }

    await this.prisma.contract.delete({
      where: { id },
    });

    return { message: 'Contrato deletado com sucesso' };
  }
}
