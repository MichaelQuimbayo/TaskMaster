import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { ellipsisHorizontal} from 'ionicons/icons';

@Component({
  selector: 'app-task-card',
  standalone: true,
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
  imports: [
    CommonModule,
    IonicModule,
  ]
})
export class TaskCardComponent {

ellipsisHorizontalIcon = ellipsisHorizontal;


// Inputs propiedades que recibe este componente desde el padre
@Input() title = '';
@Input() subtitle?: String;
@Input() content?: String;

@Input() completed: boolean = false;

@Input() showToggle = false;

@Input() action1Label?: string;
@Input() action2Label?: string;

// Outputs eventos que el componente emite hacia el padre
@Output() action1 = new EventEmitter<void>();
@Output() action2 = new EventEmitter<void>();
@Output() toggleChange = new EventEmitter<boolean>();


menuOpen = false;
menuEvent: any;

openMenu(ev: any) {
    this.menuEvent = ev;
    this.menuOpen = true;
}

edit() {
  // cerrar popover visualmente
  this.menuOpen = false;

  // emitir al padre, pequeña demora para evitar conflictos si el padre remueve el componente
  setTimeout(() => this.action1.emit(), 120);
}

// cerrando el menú antes de emitir el evento
delete() {
  this.menuOpen = false;

  setTimeout(() => this.action2.emit(), 120);
}

// Detecta el cambio del toggle
// Actualiza internamente el estado `completed`
onToggleChange(event: any) {
    this.completed = event.detail.checked;
    this.toggleChange.emit(this.completed);
  }

}
