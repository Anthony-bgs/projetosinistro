import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class DocumentosService {
  private uploadsPath = path.resolve(__dirname, '../../uploads');

  saveDocumento(id: string) {
    // aqui você vai adicionar lógica para salvar o idDocumento no banco de dados para rastreabilidade
    
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
  
  async deleteDocumento(id: string): Promise<boolean> {
    const filePath = path.join(this.uploadsPath, id);
    try {
      await fs.promises.unlink(filePath);
      return true;
    } catch (err: any) {
      if (err.code === 'ENOENT') {
        // Arquivo já não existe, considerar como sucesso
        return false;
      }
      console.error('Erro ao deletar arquivo:', err);
      throw err;
    }
  }
}
