import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'dz-table',
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {}
