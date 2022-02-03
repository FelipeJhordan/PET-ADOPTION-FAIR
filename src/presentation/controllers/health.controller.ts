import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { AuthGuard } from 'infra/rest/guard/auth-guard';
import { Roles } from 'presentation/decorators/roles.decorator';

@Controller('health')
@UseGuards(AuthGuard)
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  @Roles('ADMIN')
  check() {
    return this.health.check([
      () => this.db.pingCheck('NESTJSCLEAN'),
    ]);
  }
}
