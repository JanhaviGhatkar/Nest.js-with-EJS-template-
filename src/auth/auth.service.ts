import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/userApi/user.service';
import { logUser, userShowData, userType } from 'utils/types';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  // async signIn(users: logUser): Promise<any> {
  //   const user = await this.usersService.checkuser(users);
  //   if (user?.password !== users.password) {
  //     throw new UnauthorizedException();
  //   }
  //   const { password, ...result } = user;
  //   // TODO: Generate a JWT and return it here
  //   // instead of the user object
  //   return result;
  // }

  async signIn(users: logUser): Promise<{ access_token: string ,data:userShowData}> {
    // console.log(users);
    const user = await this.usersService.checkuser(users);
    const  dataOfUser = {id : user.id , name: user.name, email:user.email}
    if(user?.email !== users.email){
      throw new NotFoundException();
    }
    if (user?.password !== users.password) {
      throw new UnauthorizedException();
    }
    const payload = { id: user.id, email: user.email, name: user.name };
    return {
      data: dataOfUser,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
