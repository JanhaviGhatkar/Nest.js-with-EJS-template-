import { Module } from '@nestjs/common';
import { UserUiModule } from './user-ui/user-ui.module';
import { UserModule } from './userApi/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, UserUiModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
