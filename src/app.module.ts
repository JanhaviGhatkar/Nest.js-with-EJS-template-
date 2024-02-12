import { Module } from '@nestjs/common';
import { UserUiModule } from './user-ui/user-ui.module';
import { UserModule } from './userApi/user.module';

@Module({
  imports: [UserModule, UserUiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
