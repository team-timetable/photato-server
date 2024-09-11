import { Strategy } from 'passport-jwt';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
declare const JwtStrategy_base: new (...args: any[]) => InstanceType<typeof Strategy>;
export declare class JwtStrategy extends JwtStrategy_base {
    private userRepository;
    constructor(userRepository: UserRepository);
    validate(payload: {
        username: string;
    }): Promise<User>;
}
export {};
