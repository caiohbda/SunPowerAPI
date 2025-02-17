import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { CreateContractDto } from './dto/create-contract-dto';
import { Contract } from '@prisma/client';

@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Post('/create')
  async createContract(@Body() createContractDto: CreateContractDto): Promise<Contract> {
    return this.contractsService.create(createContractDto);
  }

  @Get('/')
  async findAllContracts() {
    const contracts = await this.contractsService.findAll()
    return contracts
  }

  @Delete(':id')
  async deleteContract(@Param('id') id: string): Promise<{ message: string }> {
    return this.contractsService.delete(id);
  }
}
