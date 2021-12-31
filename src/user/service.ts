import fetch from 'node-fetch';
import { gunzip, Gzip } from 'zlib';
import { Get, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/service';

export interface OUserToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  sub: string;
}

@Injectable()
export class UserService {
  async getUserInfo(): Promise<any> {
    const token = await AuthService.getOAuthToken();
    try {
      const response = await fetch('https://apac.battle.net/oauth/userinfo', {
        method: 'GET',
        headers: {
          Userorization: `Bearer ${token}}`,
        },
      });
      const data = await response.text();
      return data;
    } catch (e) {
      console.error(e);
    }
    return null;
  }

  async getUserData(): Promise<string> {
    try {
      const response = await fetch(
        'https://playoverwatch.com/ko-kr/career/pc/ATRON-3273/',
        {
          method: 'GET',
        },
      );
      const data = (await response.text()) as string;
      const win = data.match(/승리한 게임 \d+회/);
      console.log(win);
      return win[0];
    } catch (e) {
      console.error(e);
    }
  }
}
