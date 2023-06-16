import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtService } from "@nestjs/jwt";
const argon2 = require("argon2");

const salt = "$argon2id$v=19$m=65536,t=3,p=4$";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ){}

    async signIn(username:string, password:string){
        const user = await this.usersService.user.findUnique({where:{name:username}});
        if(user === null) throw new UnauthorizedException();
        if(await argon2.verify(salt+user.password,password)){
            const payload = {
                id: user.id,
                username: username,
                role: user.roleId
            };
            return {
                access_token: await this.jwtService.signAsync(payload)
            }
        }else{
            throw new UnauthorizedException()
        }
    }
}