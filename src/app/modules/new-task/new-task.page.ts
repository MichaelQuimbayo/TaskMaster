import { LocalStorageService } from 'src/app/core/storage/local-storage.service';
import { v4 as uuidv4 } from 'uuid';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from 'src/app/domain/models/task.model';
import { Category } from 'src/app/domain/models/category.model';

import {
  IonItem,
  IonButton,
  IonInput,
  
} from '@ionic/angular/standalone';
import { add } from 'ionicons/icons';
import { ModalController } from '@ionic/angular';
import { TaskModalComponent } from 'src/app/shared/components/task-modal/task-modal.component';
import { CategoryFilterComponent } from 'src/app/shared/components/category-filters/category-filter.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [
    TaskModalComponent,
    CommonModule,
    FormsModule,
    IonItem,
    IonButton,
    IonInput,
    CategoryFilterComponent,
    
  ],
  templateUrl: './new-task.page.html',
  styleUrls: ['./new-task.page.scss']
})
export class NewTaskPage {

      addIcon = add;

  // Props recibidas desde componentProps al crear el modal
 @Input() taskToEdit?: Task;

  taskName = '';
  taskDescription = '';
  taskCategory = '';
  categories: Category[] = [];

  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private storage: LocalStorageService
  ) {}

  // Este método se ejecuta automáticamente cada vez que la vista o modal
  // está a punto de mostrarse. Ideal para cargar datos iniciales.
  ionViewWillEnter() {
    this.categories = this.storage.getCategories();

    //  Si se recibió una tarea para editar (taskToEdit),
    //  precargamos sus datos en los campos del formulario.
    //  Esto permite mostrar la información actual para modificarla.
    if (this.taskToEdit) {
      this.taskName = this.taskToEdit.title;
      this.taskDescription = this.taskToEdit.description ?? '';
      this.taskCategory = this.taskToEdit.categoryId ?? '';
    }
  }


  // Guardamos y editamos la tarea, Task
  saveTask() {
    if (!this.taskName.trim()) return alert('El nombre de la tarea es obligatorio.');
    if (!this.taskCategory) return alert('Debes seleccionar una categoría.');

    if (this.taskToEdit) {
      // Actualizamos la tarea manteniendo su ID y datos previos
      this.storage.updateTask({
        ...this.taskToEdit,
        title: this.taskName.trim(),
        description: this.taskDescription.trim(),
        categoryId: this.taskCategory
      });
    } else {
      // Creamos una tarea nueva con un ID único generado.
      this.storage.addTask({
        id: uuidv4(),
        title: this.taskName.trim(),
        description: this.taskDescription.trim(),
        categoryId: this.taskCategory,
        completed: false,
        createdAt: Date.now()
      });
    }
    this.modalCtrl.dismiss(null, 'confirm');
    }

  // Cierra el modal indicando que la acción fue cancelada
  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }
}
