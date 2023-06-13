import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService extends PrismaService{
  
  getHello(): string {
    return 'Hello World!';
  }

  // Exclude keys from user
	strip_password<User>(user: User):Omit<User, "password"> {
      console.log(user)
      delete user["password"]
      console.log(user)
      return user
    }
    

}
