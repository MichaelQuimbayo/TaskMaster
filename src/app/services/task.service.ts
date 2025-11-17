import { Injectable } from '@angular/core';
import { Task } from '../domain/models/task.model';
import { TaskRepository } from '../data/repositories/task.repository';

@Injectable({ providedIn: 'root' })
export class TaskService {

  constructor(private repo: TaskRepository) {}

  getTasks(): Task[] {
    return this.repo.getAll();
  }

  getTasksByCategory(categoryId: string) {
    return this.repo.getAll().filter(t => t.categoryId === categoryId);
  }

  create(data: {
    title: string;
    description?: string;
    categoryId?: string;
  }) {
    const list = this.repo.getAll();

    const task: Task = {
      id: crypto.randomUUID(),
      title: data.title,
      description: data.description,
      categoryId: data.categoryId,
      completed: false,
      createdAt: Date.now()
    };

    list.push(task);
    this.repo.saveAll(list);
  }

  update(task: Task) {
    const list = this.repo.getAll().map(t => t.id === task.id ? task : t);
    this.repo.saveAll(list);
  }

  delete(id: string) {
    const list = this.repo.getAll().filter(t => t.id !== id);
    this.repo.saveAll(list);
  }

  toggleComplete(id: string) {
    const list = this.repo.getAll();
    const task = list.find(t => t.id === id);

    if (task) {
      task.completed = !task.completed;
      this.repo.saveAll(list);
    }
  }
}
