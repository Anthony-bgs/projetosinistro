import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class DocumentosService {
  private uploadsPath = path.resolve(__dirname, '../../uploads');

  saveDocumento(id: string, filename: string) {
    // Mantém compatibilidade, mas não faz nada (opcional)
  }

  async getDocumentoPath(id: string): Promise<string | null> {
    const filePath = path.join(this.uploadsPath, id);
    if (fs.existsSync(filePath)) {
      return filePath;
    }
    return null;
  }

  getAllDocumentos() {
    if (!fs.existsSync(this.uploadsPath)) return [];
    return fs.readdirSync(this.uploadsPath).map(filename => ({ id: filename }));
  }
}
