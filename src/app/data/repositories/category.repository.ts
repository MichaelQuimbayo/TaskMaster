import { Injectable } from '@angular/core';
import { LocalStorageService } from 'src/app/core/storage/local-storage.service';
import { Category } from 'src/app/domain/models/category.model';

@Injectable({ providedIn: 'root' })
export class CategoryRepository {
  private readonly KEY = 'categories';

  constructor(private storage: LocalStorageService) {}

  getAll(): Category[] {
    return this.storage.getItem<Category[]>(this.KEY) || [];
  }

  saveAll(categories: Category[]) {
    this.storage.setItem(this.KEY, categories);
  }
}
