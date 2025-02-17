import { Body, Controller, Get, Post, Patch, Delete, Param } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role, Prisma } from '@prisma/client';

@Controller('role')
export class RoleController {
    constructor(private readonly roleService: RoleService) {}

    @Post('create')
    async createRole(@Body() roleData: Prisma.RoleCreateInput): Promise<Role> {
        return this.roleService.createRole(roleData);
    }

    @Patch(':id')
    async updateRole(
        @Param('id') id: string,
        @Body() data: Prisma.RoleUpdateInput
    ): Promise<Role> {
        return this.roleService.updateRole({
            where: { id },
            data,
        });
    }

    @Delete(':id')
    async deleteRole(@Param('id') id: string): Promise<Role> {
        return this.roleService.deleteRole({ id });
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<Role | null> {
        return this.roleService.findById({ id });
    }

    @Get('/')
    async getAllRoles(): Promise<Role[]> {
        const roles = await this.roleService.findAll();
        console.log("Resposta da API:", roles);
        return roles;    
    }
}
