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
import { diskStorage } from "multer";
import { extname, join } from "path";
import { Response } from "express";
import { ApiBody, ApiConsumes, ApiParam, ApiTags } from "@nestjs/swagger";
import * as sharp from "sharp";

@Controller("upload")
@ApiTags("FILE")
export class UploadController {
  @Post("/")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "/var/www/files",
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
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
    const outputFilename = `${file.filename.split(".").slice(0, -1).join(".")}-small.jpg`;
    const outputPath = join("/var/www/files", outputFilename);

    await sharp(file.path)
      .resize(500) 
      .jpeg({ quality: 80 }) 
      .toFile(outputPath); 

    return {
      url: `https://file.cher1shrxd.me/${outputFilename}`,
    };
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
