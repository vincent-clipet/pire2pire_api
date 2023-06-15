import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService extends PrismaService{
  
  strip_password<User>(user: User) {
    delete user["password"]
    return user
  }
  
  strip_passwords(users: User[]): User[] {
    users.forEach(u => {
      u = this.strip_password(u)
    });
    return users
  }
}