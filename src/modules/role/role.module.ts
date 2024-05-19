import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { UserModule } from '../user/user.module';
import { roleProviders } from './role.providers';
import { RoleResolver } from './role.resolver';
import { RoleService } from './role.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...roleProviders,
    RoleService,
    RoleResolver
  ],
})
export class RoleModule {}
