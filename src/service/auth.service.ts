import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtService } from "@nestjs/jwt";
const argon2 = require("argon2");

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ){}

    async signIn(name:string, password:string){
        const user = await this.usersService.user.findUnique({where:{name:name}});
        if(user === null) throw new UnauthorizedException();
        if(!password || password === "") throw new UnauthorizedException();
        if(await argon2.verify(user.password, password)){
            const payload = {
                id: user.id,
                username: name,
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