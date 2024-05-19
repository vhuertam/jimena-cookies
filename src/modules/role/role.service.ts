import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Role, RoleData, RoleDataEdit } from 'src/graphql';
import { Repository } from 'typeorm';
import { Roles } from '../../entities';

@Injectable()
export class RoleService {
  constructor(
    @Inject('ROLE_REPOSITORY')
    private roleRepository: Repository<Roles>,
  ) {}

  async getRoles(): Promise<Roles[]> {
    try {
        return this.roleRepository.find({
            where: { }
        });
    } catch (error) {
        throw error;        
    }
  }

  async getRoleById( id: string ): Promise<Roles> {
    try {
        return this.roleRepository.findOne({
            where: { id: id }
        })
    } catch (error) {
        throw error;
    }
  }

  async getRoleByName( name: string ): Promise<Roles> {
    try {
        return this.roleRepository.findOne({
            where: { name: name }
        })
    } catch (error) {
        throw error;
    }
  }
    
  async createRole( roleData: RoleData ): Promise<Role> {
    try {
        const { name } = roleData;

        if (!name) {
          throw new HttpException(
              'Parametro nombre es indefinido',
              HttpStatus.BAD_REQUEST,
          );
        }
 
        const roleByName = await this.getRoleByName(name);

        if (roleByName) {
          throw new HttpException(
              `Role con nombre ${name} existe`,
              HttpStatus.BAD_REQUEST, 
          );
        }

        const role = new Roles();

        role.name = name;

        await this.roleRepository.save(role);

        return role;

    } catch (error) {
        throw error;
        
    }
  }

  async editRole( id: string, roleDataEdit: RoleDataEdit ): Promise<Roles> {
    try {

        const role = await this.getRoleById(id);

        if (!role) {
            throw new HttpException(`Role con id=${id} no existe`, HttpStatus.BAD_REQUEST);
        }

        const { name } = roleDataEdit;

        const roleByName = await this.getRoleByName(name);

        if(roleByName) {
          throw new HttpException(
            `Role con nombre=${name} ya existe`,
            HttpStatus.BAD_REQUEST
          );
        }

        role.name = name;

        return this.roleRepository.save(role);

    } catch (error) {
        throw error;
    }
  }

  async deleteRole( id: string ): Promise<Roles> {
    try {

        const role = await this.getRoleById(id);

        if (!role) {
            throw new HttpException(`role con id=${id} no existe`, HttpStatus.BAD_REQUEST);
        }

        return this.roleRepository.remove(role);
        
    } catch (error) {
        throw error;
    }
  }
}



