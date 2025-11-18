import { LocalStorageService } from 'src/app/core/storage/local-storage.service';
import { Category } from 'src/app/domain/models/category.model';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonFab, IonFabButton, IonIcon, IonButtons,IonButton
} from '@ionic/angular/standalone';

// Importar los íconos que usarás
import { Location } from '@angular/common';
import { add, arrowBackOutline } from 'ionicons/icons';
import { ModalController } from '@ionic/angular';
import { TaskCardComponent } from 'src/app/shared/components/task-card/task-card.component';
import { NewCategoryPage } from '../new-category/new-category.page';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonFab, IonFabButton, IonIcon,
    TaskCardComponent,
    IonButtons,IonButton
  ],
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss']
})
export class CategoryPage {

  addIcon = add;
  arrowBackOutlineIcon = arrowBackOutline;
  
  categories: Category[] = [];

  constructor(
    private modalCtrl: ModalController,
    private location: Location,
    private storage: LocalStorageService,
    private router: Router,
  ) {}

  // Se ejecuta cada vez que la vista está por mostrarse (similar a ngOnInit pero repetible).
  // Aquí recargamos las categorias desde el servicio de almacenamiento
  // para asegurarnos de que la lista esté siempre actualizada.
  ionViewWillEnter() {
    this.categories = this.storage.getCategories();
  }

  // Navega a la página para crear una nueva categoría usando routing.
  // Esta opción se usa cuando no se quiere usar modal.
  goToNewCategory() {
    this.router.navigate(['/category']);
  }

  // Elimina una categoría por ID.
  // Luego vuelve a obtener la lista actualizada desde storage
  // para reflejar inmediatamente los cambios en pantalla.
  deleteCategory(id: string) {
    this.storage.deleteCategory(id);
    this.categories = this.storage.getCategories(); 
  }

  // Abre un modal de edición, enviando la categoría seleccionada como propiedad.
  // Espera a que el modal se cierre y si el rol devuelto es "saved",
  // vuelve a cargar la lista de categorías para mostrar los cambios realizados.
  async editCategory(category: Category) {
    const modal = await this.modalCtrl.create({
      component: NewCategoryPage,
      componentProps: {
        categoryToEdit: category
      }
    });

    await modal.present();

    const { role } = await modal.onWillDismiss();

    if (role === 'saved') {
      this.categories = this.storage.getCategories(); // refrescar lista
    }
  }
  // Abre un modal vacío para crear una nueva categoría.
  // Si el usuario guarda ("saved"), refresca la lista para mostrar la nueva categoría.
  async openNewCategoryModal() {
    const modal = await this.modalCtrl.create({
      component: NewCategoryPage
    });

    await modal.present();

    const { role } = await modal.onWillDismiss();
    if (role === 'saved') {
      this.categories = this.storage.getCategories(); // refrescar lista
    }
  }
  // Regresa a la vista anterior usando el servicio Location de Angular.
  // Muy útil cuando la navegación viene desde múltiples rutas.
  goBack() {
      this.location.back();
  }

}
