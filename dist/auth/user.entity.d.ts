import { Photo } from "src/photo/photo.entity";
import { BaseEntity } from "typeorm";
export declare class User extends BaseEntity {
    id: number;
    username: string;
    password: string;
    photo: Photo[];
}
