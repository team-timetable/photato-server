import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class SignupCredentialDto {
  @IsString()
  @MinLength(1)
  @ApiProperty({ type: String, description: 'username' })
  username: string;
  @IsString()
  @MinLength(8)
  @ApiProperty({ type: String, description: 'password' })
  password: string;
}