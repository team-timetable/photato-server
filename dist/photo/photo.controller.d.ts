import { PhotoService } from "./photo.service";
import { PhotoDto } from "./dto/photo.dto";
import { Photo } from "./photo.entity";
import { User } from "src/auth/user.entity";
export declare class PhotoController {
    private photoService;
    constructor(photoService: PhotoService);
    getAllPublicPhotos(): Promise<Photo[]>;
    getPublicPhotoById(photoId: number): Promise<Photo>;
    getAllPrivatePhotos(user: User): Promise<Photo[]>;
    getPrivatePhotoById(user: User, photoId: number): Promise<Photo>;
    makePublic(user: User, photoId: number): Promise<void>;
    makePrivate(user: User, photoId: number): Promise<void>;
    createPhoto(photoDto: PhotoDto, user: User): Promise<Photo>;
    deleteBoard(photoId: number, user: User): Promise<void>;
}
