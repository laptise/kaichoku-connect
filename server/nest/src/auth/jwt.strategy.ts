// import先が'passport-local'では無い事に注意！
import { ExtractJwt, Strategy as BaseJwtStrategy } from 'passport-jwt';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { JWTPayload } from './auth.service';

/**
 * @description JWTの認証処理を行うクラス
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(BaseJwtStrategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      // Authorization bearerからトークンを読み込む関数を返す
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 有効期間を無視するかどうか
      ignoreExpiration: false,
      // envファイルから秘密鍵を渡す
      secretOrKey: configService.get<string>('JWT_SECRET_KEY'),
    });
  }

  // authenticate(
  //   req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
  //   options?: any,
  // ): void {
  //   console.log('fasfa');
  // }

  // ここでPayloadを使ったバリデーション処理を実行できる
  // Payloadは、AuthService.login()で定義した値
  async validate(payload: JWTPayload): Promise<JWTPayload> {
    return {
      userId: payload.userId,
      username: payload.username,
      userEmail: payload.userEmail,
    };
  }
}
