import { Controller, Get, NotFoundException, Param, Post, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import { DocumentosService } from './documentos.service'
import { Response } from 'express';

@Controller('documentos')
export class DocumentosController {
  constructor(private readonly documentosService: DocumentosService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('file', 10, {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const id = uuidv4();
        const ext = path.extname(file.originalname);
        cb(null, `${id}${ext}`);
      }
    })
  }))
  async uploadFiles(@UploadedFiles() files: any[]) {
    if (!files || !Array.isArray(files) || files.length === 0) {
      throw new Error('Nenhum arquivo enviado ou arquivos inválidos.');
    }
    const documentos = files.map(file => {
      const id_documento = file.filename; // já inclui a extensão
      this.documentosService.saveDocumento(id_documento, file.filename);
      return id_documento;
    });
    return { documentos };
  }
  @Get("/all")
  getAll() {
    return this.documentosService.getAllDocumentos();
  }
  @Get(":id")
  async getFile(@Param("id") id: string, @Res() res: Response) {
    const filePath = await this.documentosService.getDocumentoPath(id);
    if (!filePath) {
      throw new NotFoundException('Arquivo não encontrado');
    }
    return res.sendFile(filePath);
  }
}

