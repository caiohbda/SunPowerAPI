  import { Injectable, BadRequestException, NotFoundException, Inject } from '@nestjs/common';
  import { PrismaService } from 'src/database/prisma.service';
  import * as bcrypt from 'bcryptjs';
  import { DistributorService } from 'src/distributor/distributor.service';
  import { RoleService } from 'src/role/role.service';
  import { CreateUserDto } from './dto/create-user-dto';
  import { UpdateUserDto } from './dto/update-user-dto';
  import { User } from '@prisma/client';

  @Injectable()
  export class UserService {
    @Inject()
    private readonly prisma: PrismaService;

    constructor(
      private readonly distributorService: DistributorService,
      private readonly roleService: RoleService
    ) {}

    async createUser(data: CreateUserDto) {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: data.email },
      });

      if (existingUser) {
        throw new BadRequestException('Email já cadastrado!');
      }

      if (!data.status) {
        data.status = 'isActive';
      }

      const distributor = await this.distributorService.findByName(data.distributor);
      if (!distributor) {
        throw new BadRequestException('Distribuidor não encontrado!');
      }

      const role = await this.roleService.findByName(data.role);
      if (!role) {
        throw new BadRequestException('Role não encontrado!');
      }

      const userCreated = await this.prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: await bcrypt.hash(data.password, 10),
          discount: data.discount,
          status: data.status,
          distributorId: distributor.id,
          roleId: role.id,
        },
      });

      return userCreated;
    }

    async findAll() {
      return this.prisma.user.findMany();
    }

    async findById(id: string) {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });

      if (!user) {
        throw new NotFoundException('Usuário não encontrado!');
      }

      return user;
    }

    async updateUser(id: string, data: UpdateUserDto) {
      await this.findById(id);
      
      const updateData: Partial<User> = { ...data };
    
      if (data.password) {
        updateData.password = await bcrypt.hash(data.password, 10);
      }
    
      if (data.role) {
        const role = await this.roleService.findByName(data.role);
        if (!role) {
          throw new NotFoundException('Role não encontrada!');
        }
        updateData.roleId = role.id;
      }
    
      if (data.distributor) {
        const distributor = await this.distributorService.findByName(data.distributor);
        if (!distributor) {
          throw new NotFoundException('Distribuidor não encontrado!');
        }
        updateData.distributorId = distributor.id;
      }
    
      return this.prisma.user.update({
        where: { id },
        data: updateData,
      });
    }  

    async deleteUser(id: string) {
      const user = await this.prisma.user.findUnique({ where: { id } });
  
      if (!user) {
        throw new NotFoundException('Usuário não encontrado!');
      }
  
      await this.prisma.user.delete({ where: { id } });
  
      return { message: 'Usuário deletado com sucesso!' };
    }

    
  }
  
