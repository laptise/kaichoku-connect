import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { User } from 'src/user/user';
import { UserService } from 'src/user/user.service';
import { createHash } from 'crypto';

type PasswordOmitUser = Omit<User, 'password'>;

export interface JWTPayload {
  userId: User['id'];
  username: User['displayName'];
  userEmail: User['email'];
}

/**
 * @description Passportでは出来ない認証処理をするクラス
 */
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UserService,
  ) {}

  // ユーザーを認証する
  async validateUser(
    email: User['email'],
    pass: User['password'],
  ): Promise<PasswordOmitUser | null> {
    const user = await this.usersService.signInWithEmailAndPassword({
      email,
      password: pass,
    }); // DBからUserを取得

    if (user) {
      const { password, ...result } = user; // パスワード情報を外部に出さないようにする
      return result;
    }

    return null;
  }

  // jwt tokenを返す
  async login(user: PasswordOmitUser) {
    // jwtにつけるPayload情報
    const payload: JWTPayload = {
      userId: user.id,
      username: user.displayName,
      userEmail: user.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
