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
exports.PhotoController = void 0;
const common_1 = require("@nestjs/common");
const photo_service_1 = require("./photo.service");
const photo_dto_1 = require("./dto/photo.dto");
const passport_1 = require("@nestjs/passport");
const get_user_decorator_1 = require("../auth/get-user.decorator");
const user_entity_1 = require("../auth/user.entity");
const swagger_1 = require("@nestjs/swagger");
let PhotoController = class PhotoController {
    constructor(photoService) {
        this.photoService = photoService;
    }
    async getAllPublicPhotos() {
        return this.photoService.getAllPublicPhotos();
    }
    async getPublicPhotoById(photoId) {
        return this.photoService.getPublicPhotoById(photoId);
    }
    async getAllPrivatePhotos(user) {
        return this.photoService.getAllPrivatePhotos(user);
    }
    async getPrivatePhotoById(user, photoId) {
        return this.photoService.getPrivatePhotoById(photoId, user);
    }
    async makePublic(user, photoId) {
        this.photoService.makePublic(photoId, user);
    }
    async makePrivate(user, photoId) {
        this.photoService.makePrivate(photoId, user);
    }
    async createPhoto(photoDto, user) {
        return this.photoService.createPhoto(photoDto, user);
    }
    async deleteBoard(photoId, user) {
        return this.photoService.deletePhoto(photoId, user);
    }
};
exports.PhotoController = PhotoController;
__decorate([
    (0, common_1.Get)("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PhotoController.prototype, "getAllPublicPhotos", null);
__decorate([
    (0, common_1.Get)("/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PhotoController.prototype, "getPublicPhotoById", null);
__decorate([
    (0, common_1.Get)("/private"),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], PhotoController.prototype, "getAllPrivatePhotos", null);
__decorate([
    (0, common_1.Get)("/private/:id"),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, Number]),
    __metadata("design:returntype", Promise)
], PhotoController.prototype, "getPrivatePhotoById", null);
__decorate([
    (0, common_1.Patch)("/make-public/:id"),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, Number]),
    __metadata("design:returntype", Promise)
], PhotoController.prototype, "makePublic", null);
__decorate([
    (0, common_1.Patch)("/make-private/:id"),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, Number]),
    __metadata("design:returntype", Promise)
], PhotoController.prototype, "makePrivate", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [photo_dto_1.PhotoDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], PhotoController.prototype, "createPhoto", null);
__decorate([
    (0, common_1.Delete)("/:id"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], PhotoController.prototype, "deleteBoard", null);
exports.PhotoController = PhotoController = __decorate([
    (0, common_1.Controller)("photo"),
    (0, swagger_1.ApiBearerAuth)("access-token"),
    __metadata("design:paramtypes", [photo_service_1.PhotoService])
], PhotoController);
//# sourceMappingURL=photo.controller.js.map