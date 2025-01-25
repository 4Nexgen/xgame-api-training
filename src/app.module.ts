import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { XgameModule } from './xgame/xgame.module';
import { UserProfileModule } from './user_profile/user_profile.module';
import { BrandModule } from './brand/brand.module';

@Module({
  imports: [XgameModule, UserProfileModule, BrandModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
