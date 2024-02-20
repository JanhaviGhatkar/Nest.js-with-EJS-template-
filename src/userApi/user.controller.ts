import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Render,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { userDto } from 'src/DTO/userDto';
import { logUser } from 'utils/types';
import { CACHE_MANAGER, CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Controller('user')
@UseInterceptors(CacheInterceptor)
export class UserController {
  constructor(private readonly userService: UserService,@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  @Post('loginUser')
  userLog(@Body() user: logUser) {
    this.cacheManager.del('all_user')
    console.log(user);
    return this.userService.checkuser(user);
  }

  @Get('allUsers')
  @CacheKey('all_user') // Controlling the key
  @CacheTTL(20) 
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
    this.cacheManager.del('all_user')
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
