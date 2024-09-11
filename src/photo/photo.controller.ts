import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { PhotoService } from "./photo.service";
import { PhotoDto } from "./dto/photo.dto";

import { Photo } from "./photo.entity";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "src/auth/get-user.decorator";
import { User } from "src/auth/user.entity";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@Controller("photo")
@ApiBearerAuth("access-token")
@ApiTags('PHOTO')
export class PhotoController {
  constructor(private photoService: PhotoService) {}

  @Get("/")
  async getAllPublicPhotos(): Promise<Photo[]> {
    return this.photoService.getAllPublicPhotos();
  }

  @Get("/:id")
  async getPublicPhotoById(@Param("id") photoId: number): Promise<Photo> {
    return this.photoService.getPublicPhotoById(photoId);
  }

  @Get("/private")
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard("jwt"))
  async getAllPrivatePhotos(@GetUser() user: User): Promise<Photo[]> {
    return this.photoService.getAllPrivatePhotos(user);
  }

  @Get("/private/:id")
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard("jwt"))
  async getPrivatePhotoById(
    @GetUser() user: User,
    @Param("id") photoId: number
  ): Promise<Photo> {
    return this.photoService.getPrivatePhotoById(photoId, user);
  }

  @Patch("/make-public/:id")
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard("jwt"))
  async makePublic(
    @GetUser() user: User,
    @Param() photoId: number
  ): Promise<void> {
    this.photoService.makePublic(photoId, user);
  }

  @Patch("/make-private/:id")
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard("jwt"))
  async makePrivate(
    @GetUser() user: User,
    @Param() photoId: number
  ): Promise<void> {
    this.photoService.makePrivate(photoId, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard("jwt"))
  async createPhoto(
    @Body() photoDto: PhotoDto,
    @GetUser() user: User
  ): Promise<Photo> {
    return this.photoService.createPhoto(photoDto, user);
  }

  @Delete("/:id")
  @UseGuards(AuthGuard())
  async deleteBoard(
    @Param("id") photoId: number,
    @GetUser() user: User
  ): Promise<void> {
    return this.photoService.deletePhoto(photoId, user);
  }
}
