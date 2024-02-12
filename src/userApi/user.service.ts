import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MySQL_Connection } from 'src/database/dbConnection';
import { userType } from 'utils/types';

@Injectable()
export class UserService {
  //Login form email is valid or not
  async checkuser(email: string) {
    const connect = await MySQL_Connection.getConnection();
    try {
      const [data] = await connect.query(
        `select * from user where email = "${email}"`,
      );
      if (!data[0]) {
        throw new NotFoundException('User not found');
      }
      return { Status: 200, Message: 'Data Found', data };
    } catch (error) {
      throw new Error('Failed to create employee: ' + error.message);
    } finally {
      connect.release();
    }
  }

  //To show all data on main page
  async getAllUsers() {
    const connect = await MySQL_Connection.getConnection();
    try {
      const [allData] = await connect.query(`select * from user`);
      // console.log(allData);console.log(allData[0]);
      if (!allData[0]) {
        return new HttpException('No user found', HttpStatus.NOT_FOUND);
      }
      return { Status: 200, Message: 'Following data found:', allData };
    } catch (error) {
      throw new Error('Failed to create employee: ' + error.message);
    } finally {
      connect.release();
    }
  }

  //Register the user which connect to the register form
  async registerUser(userType: userType) {
    const connect = await MySQL_Connection.getConnection();
    try {
      console.log(userType);

      const [query] = await connect.query(
        `SELECT * FROM user WHERE id = ${userType.id} OR email = "${userType.email}"`,
      );

      if (query && query[0]) {
        console.log("dubdv");
        
        throw new ConflictException("User is already exist......!")
      }
      const [data] = await connect.query(
        `insert into user (id,name,email) values (${userType.id},"${userType.name}","${userType.email}")`,
      );
      if (data[0]) {
        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Something went wrong while creating user',
        };
      }
      return { status: HttpStatus.OK, message: 'User created' };
    } 
    
    finally {
      connect.release();
    }
  }

  //Update th user new page
  async updateUser(id: number, email: string) {
    const connect = await MySQL_Connection.getConnection();
    try {
      const [validId] = await connect.query(
        `select * from user where id = ${id}`,
      );
      if (!validId[0]) {
        return { status: 400, Message: 'No user found' };
      }
      const query = ` update user set email=? where id = ?`;
      const data = [email, id];
      const [userData] = await connect.query(query, data);
      console.log(userData);

      if (userData[0]) {
        return {
          Status: 400,
          Message: 'Something went wrong while updating user',
        };
      }
      const [updatedUser] = await connect.query(
        `select * from user where id =${id}`,
      );
      console.log(updatedUser);

      return { Status: 200, Message: 'User updated.!!!!', Data: updatedUser };
    } catch (error) {
      throw new Error('Failed to create employee: ' + error.message);
    } finally {
      connect.release();
    }
  }

  //delete user from database
  async DeleteUser(id: number) {
    const connect = await MySQL_Connection.getConnection();
    try {
      const [user] = await connect.query(`select * from user where id=${id}`);
      if (!user[0]) {
        return new HttpException(
          'No user found with this id',
          HttpStatus.NOT_FOUND,
        );
      }
      const [query] = await connect.query(`delete from user where id= ${id}`);
      if (query[0]) {
        return new HttpException(
          'Something went wrong',
          HttpStatus.BAD_REQUEST,
        );
      }
      return { Status: 200, Message: 'User deleted' };
    } catch (error) {
      throw new Error('Failed to create employee: ' + error.message);
    } finally {
      connect.release();
    }
  }
}