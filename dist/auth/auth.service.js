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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_repository_1 = require("./user.repository");
const bcrypt = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
const ioredis_1 = require("ioredis");
const config = require("config");
const jwtConfig = config.get('jwt');
let AuthService = class AuthService {
    constructor(userRepository, jwtService, redisClient) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.redisClient = redisClient;
    }
    createRefreshToken(payload) {
        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: jwtConfig.refreshExpiration,
            secret: jwtConfig.refreshSecret,
        });
        this.redisClient.set(payload.username, refreshToken, 'EX', jwtConfig.refreshExpiration);
        return refreshToken;
    }
    async signUp(signupCredentialDto) {
        return this.userRepository.createUser(signupCredentialDto);
    }
    async login(loginCredentialDto) {
        const { username, password } = loginCredentialDto;
        const user = await this.userRepository.findOne({ where: { username } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (!(await bcrypt.compare(password, user.password))) {
            throw new common_1.UnauthorizedException('Wrong password');
        }
        const payload = { username };
        const accessToken = this.jwtService.sign(payload, { expiresIn: jwtConfig.expiration });
        const refreshToken = this.createRefreshToken(payload);
        return { accessToken, refreshToken };
    }
    async refreshAccessToken(refreshToken) {
        try {
            const payload = this.jwtService.verify(refreshToken.refreshToken, {
                secret: jwtConfig.refreshSecret,
            });
            const { username } = payload;
            const storedToken = await this.redisClient.get(username);
            if (!storedToken || storedToken !== refreshToken.refreshToken) {
                throw new common_1.UnauthorizedException('Invalid refresh token');
            }
            const newPayload = { username };
            const accessToken = this.jwtService.sign(newPayload);
            const newRefreshToken = this.createRefreshToken(newPayload);
            return { accessToken, refreshToken: newRefreshToken };
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_repository_1.UserRepository)),
    __param(2, (0, common_1.Inject)('REDIS_CLIENT')),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        jwt_1.JwtService,
        ioredis_1.default])
], AuthService);
//# sourceMappingURL=auth.service.js.map