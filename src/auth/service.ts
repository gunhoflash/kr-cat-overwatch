import fetch from 'node-fetch';
import { Injectable } from '@nestjs/common';

export interface OAuthToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  sub: string;
}

@Injectable()
export class AuthService {
  static oAuthToken: OAuthToken;

  static async getOAuthToken(): Promise<OAuthToken> {
    const { clientId, clientSecret } = process.env;

    // TODO: check if token is expired
    if (AuthService.oAuthToken) {
      return AuthService.oAuthToken;
    }

    try {
      const response = await fetch('https://apac.battle.net/oauth/token', {
        method: 'POST',
        body: 'grant_type=client_credentials',
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${clientId}:${clientSecret}`,
          ).toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      const data = await response.json();
      AuthService.oAuthToken = data;
    } catch (e) {
      console.error(e);
      AuthService.oAuthToken = null;
    }
    return AuthService.oAuthToken;
  }
}
