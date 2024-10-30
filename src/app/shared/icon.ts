import { Injectable } from '@angular/core';
import {
  faMagnifyingGlass,
  faTrash,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root',
})
export class FontAwesomeService {
  icons = {
    faMagnifyingGlass: faMagnifyingGlass,
    faEdit: faEdit,
    faTrash: faTrash,
  };
}
