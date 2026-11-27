import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'dz-table-cell',
  imports: [],
  templateUrl: './table-cell.component.html',
  styleUrl: './table-cell.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableCellComponent {
  width = input<string>('auto');
  align = input<string>('flex-start');
  padding = input<string>('');
  label = input<string>('');
  column = input<boolean>(false);
  maxWidthDesktop = input<string>('none');

  // `align` only applies on large screens, where the cell is a real table cell.
  // Flex properties such as justify-content do not work on table cells, so the
  // flex-style value is translated to text-align.
  protected textAlign = computed(() => {
    switch (this.align()) {
      case 'center':
        return 'center';
      case 'flex-end':
        return 'end';
      default:
        return 'start';
    }
  });
}
