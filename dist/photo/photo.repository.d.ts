import { DataSource, Repository } from "typeorm";
import { Photo } from "./photo.entity";
export declare class PhotoRepository extends Repository<Photo> {
    constructor(dataSource: DataSource);
}
