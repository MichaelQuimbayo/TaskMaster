import { LocalStorageService } from 'src/app/core/storage/local-storage.service';
import { v4 as uuidv4 } from 'uuid';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Category } from 'src/app/domain/models/category.model';
import {
  IonItem,
  IonButton,
  IonInput,
} from '@ionic/angular/standalone';
import { add } from 'ionicons/icons';
import { ModalController } from '@ionic/angular';
import { TaskModalComponent } from 'src/app/shared/components/task-modal/task-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [
    TaskModalComponent,
    CommonModule,
    FormsModule,
    IonButton, 
    IonItem,  
    IonItem,
    IonButton,
    IonInput,
  ],
  templateUrl: './new-category.page.html',
  styleUrls: ['./new-category.page.scss']
})
export class NewCategoryPage {

      addIcon = add;

  // Props recibidas desde componentProps al crear el modal
  @Input() titleTask: string = '';
  @Input() initialMessage: string = '';
  @Input() categoryToEdit?: Category;

  
  name: string = '';
  category: string = '';


  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private storage: LocalStorageService
  ) {}

  // Este ciclo de vida se ejecuta cada vez que la vista está por mostrarse.
  // Si se está editando una categoría (categoryToEdit existe),
  // se precarga el nombre en el input para que el usuario lo pueda modificar.
  ionViewWillEnter() {
    if (this.categoryToEdit) {
      this.name = this.categoryToEdit.name;
    }
  }

  saveCategory() {
    // Evita guardar si el nombre está vacío o contiene solo espacios.
    if (!this.name.trim()) return;

    if (this.categoryToEdit) {
      // EDITAR
      // Si existe categoryToEdit, actualizamos la categoría conservando su ID.
      this.storage.updateCategory({
        id: this.categoryToEdit.id,
        name: this.name.trim()
      });
    } else {
      // CREAR
      // Si NO existe categoryToEdit, es una creación.
      // Generamos un nuevo ID con uuid y guardamos.
      this.storage.addCategory({
      id: uuidv4(),
      name: this.name.trim()
      });
  }

  // Cierra el modal devolviendo los datos
  // para que la página que abrió el modal sepa que debe refrescar la lista.
  this.modalCtrl.dismiss({
    name: this.name.trim(),
    id: this.categoryToEdit ? this.categoryToEdit.id : undefined
  }, 'saved');
  }

  // Cierra el modal sin guardar cambios.
  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }


}
