import { Module } from "@nestjs/common";
import { PhotoController } from "./photo.controller";
import { PhotoService } from "./photo.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PhotoRepository } from "./photo.repository";
import { Photo } from "./photo.entity";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [TypeOrmModule.forFeature([Photo]), AuthModule],
  controllers: [PhotoController],
  providers: [PhotoService, PhotoRepository],
})
export class BoardsModule {}
