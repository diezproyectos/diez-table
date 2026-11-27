import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TableCellComponent } from '../table-cell/table-cell.component';

@Component({
  selector: 'dz-table-head',
  imports: [TableCellComponent],
  templateUrl: './table-head.component.html',
  styleUrl: './table-head.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableHeadComponent {
  width = input<string>('auto');
  align = input<string>('flex-start');
}
