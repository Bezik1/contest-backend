import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AnnouncementsModule } from './announcements/announcements.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.API_LINK),
    UsersModule,
    AnnouncementsModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
