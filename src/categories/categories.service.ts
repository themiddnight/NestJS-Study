import { Injectable } from '@nestjs/common';
import { categories } from '../../data/data';

@Injectable()
export class CategoriesService {
  findAllCategories() {
    return categories;
  }

  findCategoryByName(name: string) {
    const result = categories.find((category) => category.name === name);
    return result;
  }

  findCategoryById(id: number) {
    const result = categories.find((category) => category.id === id);
    return result;
  }

  createCategory(category: any) {
    const newCategory = { id: categories.length + 1, ...category };
    categories.push(newCategory);
    return newCategory;
  }

  updateCategory(id: number, category: any) {
    const index = categories.findIndex((category) => category.id === id);
    const updatedCategory = { ...categories[index], ...category };
    categories[index] = updatedCategory;
    return updatedCategory;
  }

  deleteCategory(id: number) {
    const index = categories.findIndex((category) => category.id === id);
    const deletedCategory = categories[index];
    categories.splice(index, 1);
    return deletedCategory;
  }
}
