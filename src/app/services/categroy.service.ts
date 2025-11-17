import { Injectable } from '@angular/core';
import { Category } from '../domain/models/category.model';
import { CategoryRepository } from '../data/repositories/category.repository';

@Injectable({ providedIn: 'root' })
export class CategoryService {

  constructor(private repo: CategoryRepository) {}

  getCategories(): Category[] {
    return this.repo.getAll();
  }

  create(name: string, color?: string) {
    const categories = this.repo.getAll();
    
    const newCategory: Category = {
      id: crypto.randomUUID(),
      name,
    };

    categories.push(newCategory);
    this.repo.saveAll(categories);
  }

  update(category: Category) {
    const list = this.repo.getAll().map(c => c.id === category.id ? category : c);
    this.repo.saveAll(list);
  }

  delete(id: string) {
    const list = this.repo.getAll().filter(c => c.id !== id);
    this.repo.saveAll(list);
  }
}
