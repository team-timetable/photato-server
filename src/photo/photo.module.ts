import { Module } from "@nestjs/common";
import { BoardsController } from "./photo.controller";
import { BoardsService } from "./photo.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardRepository } from "./photo.repository";
import { Board } from "./photo.entity";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [TypeOrmModule.forFeature([Board]), AuthModule],
  controllers: [BoardsController],
  providers: [BoardsService, BoardRepository],
})
export class BoardsModule {}
