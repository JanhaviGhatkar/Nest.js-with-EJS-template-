import { Controller, Get, Post, Render } from '@nestjs/common';

@Controller('user-ui')
export class UserUiController {
  //http://localhost:3000/user-ui/login
  @Get('login')
  @Render('login')
  index() {
    return { Message: 'User managment Server' };
  }

  //
  @Get('allrecords')
  @Render('mainPage')
  allRecords() {
    return { Message: 'Users' };
  }

  @Get('registerUser')
  @Render("register")
  registerUser(){
    return {Message :'registration'}
  }
  
}
