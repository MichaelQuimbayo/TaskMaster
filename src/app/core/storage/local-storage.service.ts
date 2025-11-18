import { Injectable } from '@angular/core';
import { Task } from 'src/app/domain/models/task.model';
import { Category } from 'src/app/domain/models/category.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private TASK_KEY = 'tasks';
  private CATEGORY_KEY = 'categories';

  
  //  MÉTODOS GENÉRICOS (para repos)
 
  getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

 
  //  TASKS (UI directo)
 
  getTasks(): Task[] {
    return this.getItem<Task[]>(this.TASK_KEY) || [];
  }

  saveTasks(tasks: Task[]) {
    this.setItem(this.TASK_KEY, tasks);
  }

  addTask(task: Task) {
    const tasks = this.getTasks();
    tasks.push(task);
    this.saveTasks(tasks);
  }

  updateTask(updated: Task) {
    const tasks = this.getTasks().map(t => t.id === updated.id ? updated : t);
    this.saveTasks(tasks);
  }

  deleteTask(id: string) {
    const tasks = this.getTasks().filter(t => t.id !== id);
    this.saveTasks(tasks);
  }

  
  //  CATEGORIES (UI directo)
  
  getCategories(): Category[] {
    return this.getItem<Category[]>(this.CATEGORY_KEY) || [];
  }

  saveCategories(categories: Category[]) {
    this.setItem(this.CATEGORY_KEY, categories);
  }

  addCategory(category: Category) {
    const categories = this.getCategories();
    categories.push(category);
    this.saveCategories(categories);
  }

  updateCategory(updated: Category) {
    const categories = this.getCategories().map(c => c.id === updated.id ? updated : c);
    this.saveCategories(categories);
  }

  deleteCategory(id: string) {
    const categories = this.getCategories().filter(c => c.id !== id);
    this.saveCategories(categories);
  }
}
