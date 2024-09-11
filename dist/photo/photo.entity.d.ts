import { User } from "src/auth/user.entity";
import { BaseEntity } from "typeorm";
export declare class Photo extends BaseEntity {
    id: number;
    author: User;
    firstPhoto: string;
    secondPhoto: string;
    thirdPhoto: string;
    fourthPhoto: string;
    takenDate: string;
    isPublic: boolean;
}
