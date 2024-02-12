import { Module } from '@nestjs/common';
import { UserUiService } from './user-ui.service';
import { UserUiController } from './user-ui.controller';

@Module({
  providers: [UserUiService],
  controllers: [UserUiController]
})
export class UserUiModule {}
