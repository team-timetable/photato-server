"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotoService = void 0;
const common_1 = require("@nestjs/common");
const photo_entity_1 = require("./photo.entity");
const typeorm_1 = require("@nestjs/typeorm");
const photo_repository_1 = require("./photo.repository");
const user_entity_1 = require("../auth/user.entity");
const class_transformer_1 = require("class-transformer");
let PhotoService = class PhotoService {
    constructor(photoRepository) {
        this.photoRepository = photoRepository;
    }
    async createPhoto(photoDto, user) {
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
    async getAllPublicPhotos() {
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
            photo.author = (0, class_transformer_1.plainToClass)(user_entity_1.User, photo.author);
            return photo;
        });
    }
    async getPublicPhotoById(photoId) {
        const res = await this.photoRepository.findOne({
            where: { id: photoId, isPublic: true },
            relations: ["author"],
        });
        if (!res) {
            throw new common_1.NotFoundException(`There's no content has ${photoId} for its id`);
        }
        res.author = (0, class_transformer_1.plainToClass)(user_entity_1.User, res.author);
        return res;
    }
    async getAllPrivatePhotos(user) {
        const res = await this.photoRepository.find({
            where: { author: user },
            order: {
                id: "DESC",
            },
        });
        return res.map((photo) => {
            photo.author = (0, class_transformer_1.plainToClass)(user_entity_1.User, photo.author);
            return photo;
        });
    }
    async getPrivatePhotoById(photoId, user) {
        const res = await this.photoRepository.findOne({
            where: { author: user, id: photoId },
        });
        if (!res) {
            throw new common_1.NotFoundException(`There's no content has ${photoId} for its id`);
        }
        res.author = (0, class_transformer_1.plainToClass)(user_entity_1.User, res.author);
        return res;
    }
    async makePublic(photoId, user) {
        const target = await this.photoRepository.findOne({
            where: { id: photoId, author: user },
        });
        if (!target) {
            throw new common_1.NotFoundException(`There's no content has ${photoId} for its id`);
        }
        target.isPublic = true;
        const res = this.photoRepository.save(target);
        return res;
    }
    async makePrivate(photoId, user) {
        const target = await this.photoRepository.findOne({
            where: { id: photoId, author: user },
        });
        if (!target) {
            throw new common_1.NotFoundException(`There's no content has ${photoId} for its id`);
        }
        target.isPublic = false;
        const res = this.photoRepository.save(target);
        return res;
    }
    async deletePhoto(photoId, user) {
        const res = await this.photoRepository.findOne({
            where: { id: photoId, author: user },
        });
        if (!res) {
            throw new common_1.NotFoundException(`There's no content has ${photoId} for its id`);
        }
        await this.photoRepository.remove(res);
    }
};
exports.PhotoService = PhotoService;
exports.PhotoService = PhotoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(photo_entity_1.Photo)),
    __metadata("design:paramtypes", [photo_repository_1.PhotoRepository])
], PhotoService);
//# sourceMappingURL=photo.service.js.map