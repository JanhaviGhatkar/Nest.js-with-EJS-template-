import { Module } from '@nestjs/common';
import { UserUiService } from './user-ui.service';
import { UserUiController } from './user-ui.controller';
import { UserService } from 'src/userApi/user.service';

@Module({
  providers: [UserUiService,UserService],
  controllers: [UserUiController]
})
export class UserUiModule {}
