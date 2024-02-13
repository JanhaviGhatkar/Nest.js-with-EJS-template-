import { Controller, Get, Post, Render } from '@nestjs/common';
import { UserService } from 'src/userApi/user.service';

@Controller('user-ui')
export class UserUiController {
  constructor(private readonly userService: UserService) {}

  //http://localhost:3000/user-ui/login
  @Get('login')
  @Render('login')
  index() {
    return { Message: 'User managment Server' };
  }

  @Get('allrecords')
  @Render('mainPage') 
  getUserList() {
    return { Message: 'Users'};
  }

  @Get('registerUser')
  @Render("register")
  registerUser(){
    return {Message :'registration'}
  }

  @Get('userUpdation')
  @Render('update')
  upateUser(){
    return {Message :'Update_User'}
  }
  
}
