import { AuthService } from "./auth.service";
import { SignupCredentialDto } from "./dto/signup.dto";
import { LoginCredentialDto } from "./dto/login.dto";
import { User } from "./user.entity";
import { RefreshTokenDto } from "./dto/refreshToken.dto";
import { Photo } from "src/photo/photo.entity";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(signupCredentialDto: SignupCredentialDto): Promise<void>;
    login(loginCredentialDto: LoginCredentialDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    me(user: User): Promise<{
        username: string;
        photo: Photo[];
    }>;
    refresh(refreshToken: RefreshTokenDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
