import { Injectable } from '@angular/core';
import { LocalStorageService } from 'src/app/core/storage/local-storage.service';
import { Task } from 'src/app/domain/models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskRepository {
  private readonly KEY = 'tasks';

  constructor(private storage: LocalStorageService) {}

  getAll(): Task[] {
    return this.storage.getItem<Task[]>(this.KEY) || [];
  }

  saveAll(tasks: Task[]) {
    this.storage.setItem(this.KEY, tasks);
  }
}
