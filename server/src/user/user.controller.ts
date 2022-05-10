import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { S3Service } from 'src/s3/s3.service';
import Axios from 'axios';
import { UserService } from './user.service';
import { JWTPayload } from '@entities';
import process from 'process';
import { CurrentUser } from 'src/auth/guards/local-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(
    private readonly s3Service: S3Service,
    private readonly userService: UserService,
  ) {}

  @Put(':id/profileImage')
  @UseGuards(AuthGuard('jwt')) // passport-jwt戦略を付与する
  async test(
    @CurrentUser() user: JWTPayload,
    @Param('id') id: string,
    @Body() { type, data }: any,
  ) {
    console.log(process);
    const filePath = `profile-images/${id}/profile.png`;
    const url = await this.s3Service.upload(filePath, type);
    const { origin } = new URL(url);
    const base64 = data.split(',')[1];
    const decode = Buffer.from(base64, 'base64');
    await Axios.put(url, decode, {
      headers: {
        'Content-Type': type,
        'Access-Control-Allow-Origin': '*',
      },
    }).catch(console.warn);
    this.userService.updateUserProfileImage(
      user.userId,
      `${origin}/${filePath}`,
    );
    return filePath;
  }
}
