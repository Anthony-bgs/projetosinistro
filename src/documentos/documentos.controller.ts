import { Controller, Get, NotFoundException, Param, Post, Res, UploadedFile, UseInterceptors, Delete, HttpCode, UploadedFiles } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import { DocumentosService } from './documentos.service'
import { Response } from 'express';

@Controller('documentos')
export class DocumentosController {
  constructor(private readonly documentosService: DocumentosService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('file', 10, { // até 10 arquivos por vez
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
      const id_documento = file.filename;
      this.documentosService.saveDocumento(id_documento);
      return id_documento;
    });
    return { documentos };
  }

  @Get("/all")
  getAll() {
    return this.documentosService.getAllDocumentos();
  }

  @Get("get/:id")
  async getFile(@Param("id") id: string, @Res() res: Response) {
    const filePath = await this.documentosService.getDocumentoPath(id);
    if (!filePath) {
      throw new NotFoundException('Arquivo não encontrado');
    }
    return res.sendFile(filePath);
  }

  @Delete('delete/:id')
  @HttpCode(204)
  async deleteFile(@Param('id') id: string) {
    const deleted = await this.documentosService.deleteDocumento(id);
    if (!deleted) {
      throw new NotFoundException('Arquivo não encontrado');
    }
    // 204 No Content
  }
}

