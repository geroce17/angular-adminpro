import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment.prod';

const base_url = environment.base_url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: 'usuarios' | 'medicos' | 'hospitales'): string {

    if (!img)
      return `${base_url}/uploads/usuarios/404-img`;

    if (img.includes('https')) {
      return img;
    }

    if (img) {
      switch (tipo) {
        case 'usuarios': {
          return `${base_url}/uploads/usuarios/${img}`;
        }
        case 'hospitales': {
          return `${base_url}/uploads/hospitales/${img}`;
        }
        case 'medicos': {
          return `${base_url}/uploads/medicos/${img}`;
        }
        default: return `${base_url}/uploads/usuarios/404-img`;
      }
    }
    else {
      return `${base_url}/uploads/usuarios/404-img`;
    }

  }

}
