import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { PhotoDto } from "./dto/photo.dto";
import { Photo } from "./photo.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { PhotoRepository } from "./photo.repository";
import { User } from "src/auth/user.entity";
import { plainToClass } from "class-transformer";

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo)
    private photoRepository: PhotoRepository
  ) {}

  async createPhoto(photoDto: PhotoDto, user: User): Promise<Photo> {
    const { ...photo } = photoDto;
    const takenDate = new Date().toLocaleDateString();
    const newContent = this.photoRepository.create({
      takenDate,
      firstPhoto: photo.firstPhoto,
      secondPhoto: photo.secondPhoto,
      thirdPhoto: photo.thirdPhoto,
      fourthPhoto: photo.fourthPhoto,
      isPublic: photo.isPublic,
      author: user,
    });
    return await this.photoRepository.save(newContent);
  }

  async getAllPublicPhotos(): Promise<Photo[]> {
    const res = await this.photoRepository.find({
      relations: ["author"],
      order: {
        id: "DESC",
      },
      where: {
        isPublic: true,
      },
    });

    return res.map((photo) => {
      photo.author = plainToClass(User, photo.author);
      return photo;
    });
  }

  async getPublicPhotoById(photoId: number): Promise<Photo> {
    const res = await this.photoRepository.findOne({
      where: { id: photoId, isPublic: true },
      relations: ["author"],
    });
    if (!res) {
      throw new NotFoundException(
        `There's no content has ${photoId} for its id`
      );
    }
    res.author = plainToClass(User, res.author);
    return res;
  }

  async getAllPrivatePhotos(user: User): Promise<Photo[]> {
    const res = await this.photoRepository.find({
      where: { author: user },
      order: {
        id: "DESC",
      },
    });
    return res.map((photo) => {
      photo.author = plainToClass(User, photo.author);
      return photo;
    });
  }

  async getPrivatePhotoById(photoId: number, user: User): Promise<Photo> {
    const res = await this.photoRepository.findOne({
      where: { author: user, id: photoId },
    });
    if (!res) {
      throw new NotFoundException(
        `There's no content has ${photoId} for its id`
      );
    }
    res.author = plainToClass(User, res.author);
    return res;
  }

  async makePublic(photoId: number, user: User): Promise<Photo> {
    const target = await this.photoRepository.findOne({
      where: { id: photoId, author: user },
    });
    if (!target) {
      throw new NotFoundException(
        `There's no content has ${photoId} for its id`
      );
    }
    target.isPublic = true;
    const res = this.photoRepository.save(target);

    return res;
  }

  async makePrivate(photoId: number, user: User): Promise<Photo> {
    const target = await this.photoRepository.findOne({
      where: { id: photoId, author: user },
    });
    if (!target) {
      throw new NotFoundException(
        `There's no content has ${photoId} for its id`
      );
    }
    target.isPublic = false;
    const res = this.photoRepository.save(target);

    return res;
  }

  async deletePhoto(photoId: number, user: User): Promise<void> {
    const res = await this.photoRepository.findOne({
      where: { id: photoId, author: user },
    });
    if (!res) {
      throw new NotFoundException(
        `There's no content has ${photoId} for its id`
      );
    }

    await this.photoRepository.remove(res);
  }
}
