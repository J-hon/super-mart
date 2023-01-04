import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<User | undefined> {
    const user = await this.userService.find({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException();
    }

    return user;
  }

  login(user: any): { access_token: string } {
    const payload = { name: user.name, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
