import { Inject, Injectable } from '@nestjs/common';
import { Role, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class RoleService {
    @Inject()
    private readonly prisma: PrismaService;

    async createRole(data: Prisma.RoleCreateInput): Promise<Role> {
        return this.prisma.role.create({ data });
    }

    async updateRole(params: {
        where: Prisma.RoleWhereUniqueInput;
        data: Prisma.RoleUpdateInput;
    }): Promise<Role> {
        const { where, data } = params;
        return this.prisma.role.update({
            data,
            where,
        });
    }

    async deleteRole(where: Prisma.RoleWhereUniqueInput): Promise<Role> {
        return this.prisma.role.delete({
            where,
        });
    }

    async findById(roleWhereUniqueInput: Prisma.RoleWhereUniqueInput): Promise<Role | null> {
        return this.prisma.role.findUnique({
            where: roleWhereUniqueInput,
        });
    }

    async findAll(): Promise<Role[]> {
      const roles = await this.prisma.role.findMany();
      console.log("Roles encontrados:", roles);
      return roles;
    }
}
