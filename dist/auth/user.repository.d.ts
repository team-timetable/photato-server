import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { SignupCredentialDto } from './dto/signup.dto';
export declare class UserRepository extends Repository<User> {
    constructor(dataSource: DataSource);
    createUser(signupCredentialDto: SignupCredentialDto): Promise<void>;
}
