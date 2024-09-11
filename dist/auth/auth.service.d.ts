import { UserRepository } from './user.repository';
import { SignupCredentialDto } from './dto/signup.dto';
import { LoginCredentialDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import Redis from 'ioredis';
import { RefreshTokenDto } from './dto/refreshToken.dto';
export declare class AuthService {
    private userRepository;
    private jwtService;
    private readonly redisClient;
    constructor(userRepository: UserRepository, jwtService: JwtService, redisClient: Redis);
    private createRefreshToken;
    signUp(signupCredentialDto: SignupCredentialDto): Promise<void>;
    login(loginCredentialDto: LoginCredentialDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refreshAccessToken(refreshToken: RefreshTokenDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
