import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './jwt-payload-interface';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Function that generate user payload for jwt tokens
   * @author   Pratik Tiwari
   * @param    {JwtPayload} payload payload of the jwt token -> user object
   * @return   {user} user object
   */
  async validateUserByJwt(payload: JwtPayload) {
    // This will be used when the user has already logged in and has a JWT
    const user = await this.usersService.getUserByEmail(payload.email);
    if (user) {
      return user;
    } else {
      throw new UnauthorizedException();
    }
  }
}
