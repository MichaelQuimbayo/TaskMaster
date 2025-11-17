import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category } from 'src/app/domain/models/category.model';
import {
  IonSelect,
  IonItem,
  IonList,
  IonSelectOption
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [
    CommonModule,
    IonItem,
    IonList,
    IonSelect,
    IonSelectOption
  ],
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss']
})
export class CategoryFilterComponent {

  @Input() placeholder: string = 'Selecciona una categoría';

  // 👇 Solo UNA VEZ, bien definida
  @Input() categories: Category[] = [];

  // 👇 Emitimos solo el ID de la categoría
  @Output() selectedChange = new EventEmitter<string>();

  onChange(event: any) {
    // event.detail.value → será el category.id
    this.selectedChange.emit(event.detail.value);
  }
}
