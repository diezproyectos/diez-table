import { Component, computed, signal } from '@angular/core';
import { DZ_TABLE_IMPORTS } from '@diezproyectos/diez-table';

interface Person {
  id: number;
  name: string;
  role: string;
  email: string;
  score: number;
}

@Component({
  selector: 'app-root',
  imports: [DZ_TABLE_IMPORTS],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly people = signal<Person[]>([
    { id: 1, name: 'Ana Gil', role: 'Designer', email: 'ana@example.com', score: 91 },
    { id: 2, name: 'Luis Pérez', role: 'Developer', email: 'luis@example.com', score: 78 },
    { id: 3, name: 'Marta Ruiz', role: 'Developer', email: 'marta@example.com', score: 85 },
  ]);

  protected readonly descending = signal(true);
  protected readonly sorted = computed(() =>
    [...this.people()].sort((a, b) => (this.descending() ? b.score - a.score : a.score - b.score)),
  );
  protected readonly selected = signal<Person | null>(null);
  protected readonly none = signal<Person[]>([]);

  protected readonly columns = [
    { key: 'name', title: 'Name', width: '30%' },
    { key: 'role', title: 'Role', width: '20%' },
    { key: 'email', title: 'Email', width: '' },
  ] as const;

  protected toggleSort() {
    this.descending.update((value) => !value);
  }
}
