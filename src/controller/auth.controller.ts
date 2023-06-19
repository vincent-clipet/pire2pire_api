import {
    Body,
    Controller,
    Post,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { Public } from 'src/auth/decorator';
import { AuthService } from 'src/service/auth.service';

@Controller()
export class AuthController{
    constructor(private authService: AuthService){}

    @HttpCode(HttpStatus.OK)
    @Public()
    @Post('login')
    signIn(
        @Body() signInData: Record<string, any>
    ) {
        return this.authService.signIn(signInData.username, signInData.password);
    }

}