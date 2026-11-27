/*
 * Public API Surface of diez-table
 */
import { TableComponent } from './lib/table/table.component';
import { TableHeaderComponent } from './lib/table/table-header/table-header.component';
import { TableHeadComponent } from './lib/table/table-head/table-head.component';
import { TableBodyComponent } from './lib/table/table-body/table-body.component';
import { TableRowComponent } from './lib/table/table-row/table-row.component';
import { TableCellComponent } from './lib/table/table-cell/table-cell.component';

export {
  TableComponent,
  TableHeaderComponent,
  TableHeadComponent,
  TableBodyComponent,
  TableRowComponent,
  TableCellComponent,
};

/** All the table components, ready to use in the `imports` of a standalone component. */
export const DZ_TABLE_IMPORTS = [
  TableComponent,
  TableHeaderComponent,
  TableHeadComponent,
  TableBodyComponent,
  TableRowComponent,
  TableCellComponent,
] as const;
