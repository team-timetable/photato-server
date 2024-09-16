import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { extname, join } from "path";
import { Response } from "express";
import { ApiBody, ApiConsumes, ApiParam, ApiTags } from "@nestjs/swagger";
import * as sharp from "sharp";
import * as fs from "fs";
import { promisify } from "util";
import { BadRequestException } from "@nestjs/common";

const writeFile = promisify(fs.writeFile);

@Controller("upload")
@ApiTags("FILE")
export class UploadController {
  @Post("/")
  @UseInterceptors(
    FileInterceptor("file", {
      limits: { fileSize: 10 * 1024 * 1024 },
    })
  )
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary",
        },
      },
    },
  })
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException("No file uploaded");
    }

    const ext = extname(file.originalname).toLowerCase();
    const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp", ".heic"];

    if (!allowedExtensions.includes(ext)) {
      throw new BadRequestException("Unsupported file type");
    }

    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename = `${file.fieldname}-${uniqueSuffix}.jpeg`; 

    try {
      console.log(`Processing file: ${file.originalname}, size: ${file.size}`);

      sharp(file.buffer)
        .resize(800)
        .toFormat("jpeg") 
        .jpeg({ quality: 80 })

      return {
        url: `https://file.cher1shrxd.me/${filename}`,
      };
    } catch (error) {
      console.error("Error during image processing:", error.message);
      throw new Error("File processing failed");
    }
  }

  @Get("/:filename")
  @ApiParam({
    name: "photo",
    type: String,
    description: "photo file download",
  })
  async downloadFile(
    @Param("filename") filename: string,
    @Res() res: Response
  ) {
    const filePath = join("/var/www/files", filename);

    try {
      res.sendFile(filePath);
    } catch (err) {
      throw new NotFoundException("File not found");
    }
  }
}
