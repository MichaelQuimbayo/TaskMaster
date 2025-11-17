import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonFab, IonFabButton, IonIcon,IonFabList,
  IonButton,IonAlert,
} from '@ionic/angular/standalone';
import { add, pricetagOutline, clipboardOutline } from 'ionicons/icons';
import { ModalController } from '@ionic/angular';
import { TaskCardComponent } from 'src/app/shared/components/task-card/task-card.component';
import { CategoryFilterComponent } from 'src/app/shared/components/category-filters/category-filter.component';
import { NewTaskPage } from '../new-task/new-task.page';
import { Router } from '@angular/router';
import { LocalStorageService} from 'src/app/core/storage/local-storage.service';
import { Category } from 'src/app/domain/models/category.model';
import { Task } from 'src/app/domain/models/task.model';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonFab,
    IonFabButton,
    IonAlert,
    IonIcon,
    TaskCardComponent,
    CategoryFilterComponent,IonFabList, IonButton
  ],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {
  addIcon = add;
  pricetagOutlineIcon = pricetagOutline;
  clipboardOutlineIcon = clipboardOutline;

  tasks: Task[] = [];
  categories: Category[] = [];
  categoriesForFilter: Category[] = [];

  showAlert = false;
  idToDelete = '';

  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private storage: LocalStorageService
  ) {}

  // Se ejecuta cada vez que la vista está por mostrarse.
  // Recarga las categorías almacenadas.
  ionViewWillEnter() {

    this.categories = this.storage.getCategories();

    // Construye el listado de categorías para el filtro
    this.categoriesForFilter = [
      
      { id: '', name: 'Todas' }, 
      ...this.categories
    ];

    // Carga inicial de datos al entrar a la vista
    this.loadTasks();
    this.loadCategories();
    this.filterCategory();
  }

  // Obtiene todas las tareas desde el storage y las carga en el array local.
  // Se usa tanto al iniciar como luego de crear/editar una tarea.
  loadTasks() {
    this.tasks = this.storage.getTasks();
  }

  // Obtiene todas las categorías desde el storage.
  // Se usa para mantener sincronizada la lista cuando se crean/actualizan categorías.
  loadCategories() {
    this.categories = this.storage.getCategories();
  }

   // Filtra las tareas por categoría.
   // Si no se envía categoryId, se muestran todas.
   // Si se envía un id válido, solo se muestran las tareas que coincidan.
  filterCategory(categoryId?: string) {
     if (!categoryId) {
    // Sin filtro, mostrar todas las tareas
    this.tasks = this.storage.getTasks();
  } else {
    // Filtrar por la categoría seleccionada
    this.tasks = this.storage.getTasks().filter(t => t.categoryId === categoryId);
  }
  }

  // Se ejecuta cuando el usuario marca/desmarca una tarea como completada.
  // Actualiza el estado de la tarea y guarda el cambio en storage.
  onTaskToggle(task: Task, isCompleted: boolean) {
  task.completed = isCompleted;
  this.storage.updateTask(task); 
  }

  // Devuelve el nombre de la categoría desde su ID.
  // Si no se encuentra la categoría o el ID no existe, devuelve "Sin categoría".
  getCategoryName(categoryId?: string): string {
    if (!categoryId) return 'Sin categoría';
    const cat = this.categories.find(c => c.id === categoryId);
    return cat ? cat.name : 'Sin categoría';
  }

  // Abre el modal para crear una nueva tarea.
  // Si no existen categorías, muestra un alert (evita crear tareas sin categoría)
  async openNewTaskModal() {
  if (!this.categories.length) {
    
    const alertButton = document.getElementById('open-alert');
    if (alertButton) {
      alertButton.click();
    }
    return;
  }

  const modal = await this.modalCtrl.create({
    component: NewTaskPage
  });

  await modal.present();

  const { role } = await modal.onWillDismiss();
  if (role === 'confirm') {
    this.loadTasks(); 
  }
  }

  editTask(task: Task) {
    this.modalCtrl.create({
      component: NewTaskPage,
      componentProps: { taskToEdit: task }
    }).then(modal => modal.present().then(async () => {
      const { role } = await modal.onWillDismiss();
      if (role === 'confirm') this.loadTasks();
    }));
  }

  

deleteTask(id: string) {
  this.idToDelete = id;

  const btn = document.getElementById('delete-alert');
  if (btn) btn.click();
}

onAlertClosed(ev: any) {
  if (ev.detail.role === 'ok') {
    this.storage.deleteTask(this.idToDelete);
    this.loadTasks();
  }
}

  goToCreateCategory() {
    this.router.navigate(['/category']);
  }
}
