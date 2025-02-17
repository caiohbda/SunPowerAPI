import { Body, Controller, Get, Post, Patch, Delete, Param, NotFoundException, BadRequestException } from '@nestjs/common';
import { Distributor as DistributorModel, Prisma } from '@prisma/client';
import { DistributorService } from './distributor.service';

@Controller('distributor')
export class DistributorController {
  constructor(private distributorService: DistributorService) {} 

  @Post('create')
  async createDistributor(
    @Body() distributorData: Prisma.DistributorCreateInput,
  ): Promise<DistributorModel> {
    return this.distributorService.createDistributor(distributorData);
  }

  @Get('all')
  async getAllDistributors(): Promise<DistributorModel[]> {
    return this.distributorService.findAll();
  }

  @Get(':id')
  async getDistributorById(@Param('id') id: string): Promise<DistributorModel | null> {
    return this.distributorService.findById({ id });
  }

  @Patch(':id')
  async updateDistributor(
    @Param('id') id: string,
    @Body() data: Prisma.DistributorUpdateInput
  ): Promise<DistributorModel> {
    return this.distributorService.updateDistributor({
      where: { id },
      data,
    });
  }

  @Delete(':id')
  async deleteDistributor(@Param('id') id: string): Promise<DistributorModel> {
    return this.distributorService.deleteDistributor({ id });
  }

  @Get('name/:name')
  async getDistributorByName(@Param('name') name: string): Promise<{ id: string; name: string; createdAt: Date; updatedAt: Date }> {
  if (!name) {
    throw new BadRequestException('Nome do distribuidor é obrigatório!');
  }

  const distributor = await this.distributorService.findByName(name);
  
  if (!distributor) {
    throw new NotFoundException('Distribuidor não encontrado!');
  }

  return distributor;
}



}
