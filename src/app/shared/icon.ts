import { Injectable } from '@angular/core';
import {
  faMagnifyingGlass,
  faPlus,
  faTrash,
  faEdit,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root',
})
export class FontAwesomeService {
  icons = {
    faMagnifyingGlass: faMagnifyingGlass,
    faPlus: faPlus,
    faEdit: faEdit,
    faTrash: faTrash,
    faEye: faEye,
    faEyeSlash: faEyeSlash,
  };
}
