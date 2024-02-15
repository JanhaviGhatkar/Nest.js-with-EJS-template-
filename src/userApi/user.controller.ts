import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Render,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { userDto } from 'src/DTO/userDto';
import { logUser } from 'utils/types';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('loginUser')
  userLog(@Body() user: logUser) {
    return this.userService.checkuser(user);
  }

  @Get('allUsers')
  allUser(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    return this.userService.getAllUsers(page, pageSize);
  }

  @Post('addUser')
  @UsePipes(new ValidationPipe())
  registerUser(@Body() userDto: userDto) {
    return this.userService.registerUser(userDto);
  }

  @Patch('updateUser/:id')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() userDto: userDto) {
    return this.userService.updateUser(id, userDto.email);
  }
  @Delete('deleteUser/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.DeleteUser(id);
  }

  @Get('getUserByParameter/:idOrNameOrEmail')
  getUserByParameter(@Param('idOrNameOrEmail') idOrNameOrEmail: string) {
    let userDto: userDto;
    if (!isNaN(Number(idOrNameOrEmail))) {
      // If the parameter is a number, assume it's an id
      userDto = { id: Number(idOrNameOrEmail), name: '', email: '',password:'' };
    } else {
      // If the parameter is not a number, assume it's a name or email
      userDto = { id: 0, name: idOrNameOrEmail, email: idOrNameOrEmail,password:'' };
    }
    return this.userService.getUserByCriteria(userDto);
  }
}
