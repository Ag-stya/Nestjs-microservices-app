import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('MONGODB_URI');
        console.log(' Connecting to MongoDB at:', uri);
        return {
          uri: uri,
          retryAttempts: 5,
          retryDelay: 3000,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}