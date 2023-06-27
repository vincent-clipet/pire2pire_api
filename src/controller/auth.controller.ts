import {
    Body,
    Controller,
    Post,
    HttpCode,
    HttpStatus,
    Get,
    Req
} from '@nestjs/common';
import { Public } from 'src/auth/decorator';
import { AuthService } from 'src/service/auth.service';
import { Role } from "src/auth/decorator";
import { permissionRole } from "src/auth/permissionRole";
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Controller()
export class AuthController{
    constructor(
        private authService: AuthService,
        private jwtService: JwtService
        ){}

    @HttpCode(HttpStatus.OK)
    @Public()
    @Post('login')
    signIn(
        @Body() signInData: Record<string, any>
    ) {
        return this.authService.signIn(signInData.name, signInData.password);
    }

    @HttpCode(HttpStatus.OK)
    @Role(
        permissionRole.renewToken
    )
    @Get("renewToken")
    async renewToken(
        @Req() request: Request
    ){
        const jwt = request.headers.authorization.replace("Bearer ","");
        const payload = this.jwtService.decode(jwt)
        const newPayload = {
            id: payload["id"],
            username: payload["username"],
            role: payload["role"]
        };
        return {
            access_token: await this.jwtService.signAsync(newPayload)
        }
    }

}