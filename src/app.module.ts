import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './users/users.module';
import { AnnouncementsModule } from './announcements/announcements.module';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'views'),
    }),
    MongooseModule.forRoot(process.env.API_LINK),
    UsersModule,
    AnnouncementsModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
