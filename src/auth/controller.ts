import { Controller, Get } from '@nestjs/common';
import { AuthService, OAuthToken } from './service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async getOAuthToken(): Promise<OAuthToken> {
    return await AuthService.getOAuthToken();
  }
}
