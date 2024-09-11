import { PhotoDto } from "./dto/photo.dto";
import { Photo } from "./photo.entity";
import { PhotoRepository } from "./photo.repository";
import { User } from "src/auth/user.entity";
export declare class PhotoService {
    private photoRepository;
    constructor(photoRepository: PhotoRepository);
    createPhoto(photoDto: PhotoDto, user: User): Promise<Photo>;
    getAllPublicPhotos(): Promise<Photo[]>;
    getPublicPhotoById(photoId: number): Promise<Photo>;
    getAllPrivatePhotos(user: User): Promise<Photo[]>;
    getPrivatePhotoById(photoId: number, user: User): Promise<Photo>;
    makePublic(photoId: number, user: User): Promise<Photo>;
    makePrivate(photoId: number, user: User): Promise<Photo>;
    deletePhoto(photoId: number, user: User): Promise<void>;
}
