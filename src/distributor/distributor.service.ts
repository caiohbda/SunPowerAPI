import { Inject, Injectable } from '@nestjs/common';
import { Distributor, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class DistributorService {
    @Inject()
    private readonly prisma: PrismaService;

    async createDistributor(data: Prisma.DistributorCreateInput) {
      return this.prisma.distributor.create({ data });
    }

    async updateDistributor(params : {
      where: Prisma.DistributorWhereUniqueInput;
      data: Prisma.DistributorUpdateInput;
    }): Promise<Distributor> {
      const { where, data } = params;
      return this.prisma.distributor.update({
        data,
        where,
      });
    }

    async deleteDistributor(where: Prisma.DistributorWhereUniqueInput): Promise<Distributor> {
      return this.prisma.distributor.delete({
        where,
      });
    }

    async findById(distributorWhereUniqueInput: Prisma.DistributorWhereUniqueInput,): Promise<Distributor | null> {
      return this.prisma.distributor.findUnique({
        where: distributorWhereUniqueInput,
      });
    }

    async findAll(){
      return this.prisma.distributor.findMany()
    }
}
