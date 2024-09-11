import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class PhotoDto {
  @IsNotEmpty()
  @ApiProperty({ type: String, description: "first picture url" })
  firstPhoto: string;

  @IsNotEmpty()
  @ApiProperty({ type: String, description: "first picture url" })
  secondPhoto: string;

  @IsNotEmpty()
  @ApiProperty({ type: String, description: "first picture url" })
  thirdPhoto: string;

  @IsNotEmpty()
  @ApiProperty({ type: String, description: "first picture url" })
  fourthPhoto: string;

  @IsNotEmpty()
  @ApiProperty({ type: String, description: "taken date" })
  takenDate: string;

  @IsNotEmpty()
  @ApiProperty({ type: Boolean, description: "disclosure scope" })
  isPublic: boolean;
}