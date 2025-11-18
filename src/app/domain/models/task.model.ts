
//Definicion entidades de Tareas "Task"

export interface Task {
  id: string;
  title: string;
  description?: string;
  categoryId?: string;
  completed: boolean;
  createdAt: number;
}
