import { IsNotEmpty, IsString } from "class-validator";


export class CreateUserDto {
    @IsString({message:'El nombre de usuario debe ser una cadena de texto.'})
    @IsNotEmpty({message:'El nombre de usuario es obligatorio.'})
    username!:string;
}