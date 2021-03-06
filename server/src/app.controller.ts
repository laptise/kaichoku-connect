import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Body,
  Put,
} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user/user';
import { S3Service } from './s3/s3.service';
type PasswordOmitUser = Omit<User, 'password'>;
@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly s3Service: S3Service,
  ) {}

  @UseGuards(AuthGuard('local')) // passport-local戦略を付与する
  @Post('login')
  async login(@Request() req: { user: PasswordOmitUser }) {
    const user = req.user;
    const token = await this.authService.login(req.user);
    // LocalStrategy.validate()で認証して返した値がreq.userに入ってる
    // JwtToken を返す
    return { ...user, ...token };
  }

  /**
   * @description JWT認証を用いたサンプルAPI
   */
  @UseGuards(AuthGuard('jwt')) // passport-jwt戦略を付与する
  @Get('profile')
  getProfile(@Request() req: { user: PasswordOmitUser }) {
    // JwtStrategy.validate()で認証して返した値がreq.userに入ってる
    // const user = req.user;

    // 認証に成功したユーザーの情報を返す
    return req.user;
  }
  // constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @UseGuards(AuthGuard('jwt')) // passport-jwt戦略を付与する
  @Put('setProfileImage')
  async upload(@Body() data: any) {
    return await this.s3Service.upload('test', 'pdf');
  }
}
