import { IsEmail, IsInt, IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class userDto{
    @IsNumber()
    @IsNotEmpty()
    id : number;

    // @IsString()
    // @IsNotEmpty()
    // @Length(2,45)
    name:string;

    // @IsEmail()
    // @IsNotEmpty()
    // @Length(2,45)
    email:string;
}