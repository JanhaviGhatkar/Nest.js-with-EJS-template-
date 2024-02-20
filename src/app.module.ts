import { Module } from '@nestjs/common';
import { UserUiModule } from './user-ui/user-ui.module';
import { UserModule } from './userApi/user.module';
import { AuthModule } from './auth/auth.module';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { RedisOptions } from './util/app.option.constatnt';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    UserModule,
    UserUiModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.registerAsync(RedisOptions),
    CacheModule.register({
      ttl:5,
      max:10
    })
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR, // Binding the interceptor globally
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
