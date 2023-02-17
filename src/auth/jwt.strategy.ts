import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable() //어디에서나 사용할 수 있게 하기위해서
export class JwtStrategy extends PassportStrategy(Strategy) {
  // passport-jwt를 사용하기 위해서
  constructor(
    // userRepository를 사용
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    super({
      secretOrKey: 'secret1234',
      // jwt토큰이 클라이언트 어디서 날라오는지 명시.
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  // token 유효성 검사 -> 모든 요청에 유저 정보가 들어있기를 원함
  async validate(payload) {
    console.log(payload);
    const { username } = payload;
    console.log(username);
    const user: User = await this.userRepository.findOne({
      where: { username },
    });
    console.log(user);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
