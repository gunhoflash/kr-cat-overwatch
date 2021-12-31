import { Controller, Get } from '@nestjs/common';
import { UserService } from './service';

@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Get()
  async getUserInfo(): Promise<any> {
    return await this.UserService.getUserInfo();
  }

  @Get('data')
  async getUserData(): Promise<string> {
    return await this.UserService.getUserData();
  }
}
