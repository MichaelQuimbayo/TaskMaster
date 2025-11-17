import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterContentInit,
  ContentChild,
  TemplateRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonContent,
  IonIcon
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader, 
    IonToolbar, 
    IonButtons, 
    IonButton, 
    IonTitle,
    IonContent,
    IonIcon
  ],
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss']
})
export class TaskModalComponent implements AfterContentInit {
  // Inputs que puedes pasar desde componentProps (cuando se usa como modal)
  // o como atributos en el template embebido
  @Input() titleTask: string = '';
  @Input() initialMessage?: string;

  // Si modalMode = true => el componente estará dentro de un modal y al confirmar
  // llamará a modalCtrl.dismiss(). Si false => emitirá eventos y no tocará ModalController
  @Input() modalMode: boolean = false;

  
  // Eventos para uso embebido
  @Output() confirmed = new EventEmitter<{ name: string; category: string }>();
  @Output() cancelled = new EventEmitter<void>();

  // Detectar si hay contenido proyectado dentro del componente
  @ContentChild(TemplateRef) projectedTemplate?: TemplateRef<any>;
  hasProjectedContent = false;

  constructor(private modalCtrl: ModalController) {}

  ngAfterContentInit(): void {
    this.hasProjectedContent = !!this.projectedTemplate;
  }

  // Uso común: cancelar, si es modal, dismiss; si embebido, emitir evento
  cancel() {
    if (this.modalMode) {
      this.modalCtrl.dismiss(null, 'cancel');
    } else {
      this.cancelled.emit();
    }
  }

}
