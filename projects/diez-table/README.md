# diez-table

A small, responsive table for Angular. On a large screen it is a real table; on a small screen every row becomes a card where each value shows its own label. You write the markup once.

It is built from six tiny standalone components (`dz-table`, `dz-table-header`, `dz-table-head`, `dz-table-body`, `dz-table-row`, `dz-table-cell`), has no dependencies and no JavaScript layout logic: the switch between table and cards is pure CSS.

## Installation

```bash
npm install @diezproyectos/diez-table
```

Requires Angular 22 (any 22.x version): `@angular/core` and `@angular/common` `^22.0.0`.

## Quick start

Import the components in any standalone component with `DZ_TABLE_IMPORTS` and write the table in its template.

```ts
import { Component, signal } from '@angular/core';
import { DZ_TABLE_IMPORTS } from '@diezproyectos/diez-table';

@Component({
  selector: 'app-people',
  imports: [DZ_TABLE_IMPORTS],
  templateUrl: './people.html',
})
export class People {
  protected readonly people = signal([
    { id: 1, name: 'Ana Gil', role: 'Designer', score: 91 },
    { id: 2, name: 'Luis Pérez', role: 'Developer', score: 78 },
  ]);
}
```

```html
<dz-table>
  <dz-table-header>
    <dz-table-head width="30%">Name</dz-table-head>
    <dz-table-head>Role</dz-table-head>
    <dz-table-head align="flex-end">Score</dz-table-head>
  </dz-table-header>

  <dz-table-body>
    @for (p of people(); track p.id) {
      <dz-table-row>
        <dz-table-cell label="Name" width="30%">{{ p.name }}</dz-table-cell>
        <dz-table-cell label="Role">{{ p.role }}</dz-table-cell>
        <dz-table-cell label="Score" align="flex-end">{{ p.score }}</dz-table-cell>
      </dz-table-row>
    }
  </dz-table-body>
</dz-table>
```

You can also import only the components you use (`TableComponent`, `TableHeaderComponent`, `TableHeadComponent`, `TableBodyComponent`, `TableRowComponent`, `TableCellComponent`).

## How it behaves

| | Large screen (≥ 64em) | Small screen |
| --- | --- | --- |
| `dz-table-header` | Shown as the table header | Hidden |
| `dz-table-row` | A table row | A card |
| `dz-table-cell` | A table cell | A line: `label` + value |

The `label` of each cell is what a small screen shows in place of the hidden header, so **always set it**.

## Components and inputs

| Component | Purpose | Inputs |
| --- | --- | --- |
| `dz-table` | The table container | none |
| `dz-table-header` | Groups the column titles | none |
| `dz-table-head` | One column title | `width`, `align` |
| `dz-table-body` | Groups the rows | none |
| `dz-table-row` | One row | none |
| `dz-table-cell` | One value | `width`, `align`, `padding`, `label`, `column`, `maxWidthDesktop` |

| Input | Default | Meaning |
| --- | --- | --- |
| `width` | `auto` | Column width on large screens (`30%`, `12em`...). Set it on the head and on the cells of the same column. |
| `align` | `flex-start` | Horizontal alignment of the column on large screens: `flex-start`, `center` or `flex-end`. |
| `padding` | theme value | Replaces the cell padding on large screens (`0.5em 1em`). |
| `label` | empty | Text shown before the value on small screens. |
| `column` | `false` | On small screens, puts the label above the value instead of beside it. |
| `maxWidthDesktop` | `none` | Maximum width of the cell on large screens. |

## Customizing the style

All the visual settings are CSS custom properties, so you never need `::ng-deep`. Set them where you want the change to apply: globally on `:root`, on a class, or on a single table.

| Variable | Default | What it changes |
| --- | --- | --- |
| `--dz-table-border-color` | `#e0e0e0` | Lines between rows |
| `--dz-table-head-color` | `inherit` | Text colour of the column titles |
| `--dz-table-head-font-weight` | `bold` | Weight of the column titles |
| `--dz-table-cell-padding` | `0.5em 1em` | Padding of every cell |
| `--dz-table-cell-gap` | `1em` | Space between label and value (small screens) |
| `--dz-table-label-color` | `inherit` | Colour of the labels (small screens) |
| `--dz-table-label-font-size` | `0.9em` | Size of the labels (small screens) |
| `--dz-table-label-width` | `0` | Minimum label width; set it (e.g. `6em`) to line the values up (small screens) |
| `--dz-table-row-gap` | `1em` | Space between cards (small screens) |

### Change it for the whole app

```css
/* styles.css */
:root {
  --dz-table-border-color: #cfd8dc;
  --dz-table-head-font-weight: 600;
}
```

### Change it for one table

```html
<dz-table class="dark"> ... </dz-table>
```

```css
.dark {
  --dz-table-border-color: #444;
  --dz-table-label-color: #9aa;
  --dz-table-head-color: #ff9f43;
  --dz-table-cell-padding: 0.75em 1.25em;
  --dz-table-row-gap: 0.5em;
  background: #1e1e24;
  color: #eee;
  border-radius: 8px;
}
```

### Style rows and cells with plain CSS

The components are ordinary elements in *your* template, so your component's CSS can style them directly.

```css
dz-table-row { cursor: pointer; }
dz-table-row:hover { background: #f5f5f5; }
dz-table-row.selected { background: #fff3e0; }
```

## Customizing the behaviour

The table only lays data out; sorting, selection or filtering are plain Angular code in your component, and the table follows your data.

### Columns driven by data

```ts
protected readonly columns = [
  { key: 'name', title: 'Name', width: '30%' },
  { key: 'role', title: 'Role', width: '20%' },
  { key: 'email', title: 'Email', width: '' },
] as const;
```

```html
<dz-table>
  <dz-table-header>
    @for (c of columns; track c.key) {
      <dz-table-head [width]="c.width || 'auto'">{{ c.title }}</dz-table-head>
    }
  </dz-table-header>
  <dz-table-body>
    @for (p of people(); track p.id) {
      <dz-table-row>
        @for (c of columns; track c.key) {
          <dz-table-cell [label]="c.title" [width]="c.width || 'auto'">{{ p[c.key] }}</dz-table-cell>
        }
      </dz-table-row>
    }
  </dz-table-body>
</dz-table>
```

### Sorting

Put any content in a `dz-table-head`, such as a button, and sort the data with a `computed`.

```ts
protected readonly descending = signal(true);
protected readonly sorted = computed(() =>
  [...this.people()].sort((a, b) => (this.descending() ? b.score - a.score : a.score - b.score)),
);
protected toggleSort() { this.descending.update((v) => !v); }
```

```html
<dz-table-head align="flex-end">
  <button type="button" (click)="toggleSort()">Score {{ descending() ? '↓' : '↑' }}</button>
</dz-table-head>
...
@for (p of sorted(); track p.id) { ... }
```

### Clickable rows

Rows are regular elements, so you can bind events and classes on them.

```html
<dz-table-row (click)="selected.set(p)" [class.selected]="selected()?.id === p.id">
  ...
</dz-table-row>
```

### Custom cell content

A cell projects whatever you write inside it: badges, buttons, links, icons or other components.

```html
<dz-table-cell label="Score" align="flex-end">
  <span class="badge">{{ p.score }}</span>
</dz-table-cell>
```

### Empty state

`@empty` works inside the body, because rows are just an `@for`.

```html
<dz-table-body>
  @for (p of people(); track p.id) {
    <dz-table-row> ... </dz-table-row>
  } @empty {
    <p>No people yet.</p>
  }
</dz-table-body>
```

### Layout of each cell

```html
<!-- long text: limit the width on large screens -->
<dz-table-cell label="Name" maxWidthDesktop="14em">...</dz-table-cell>

<!-- label above the value on small screens -->
<dz-table-cell label="Email" [column]="true">...</dz-table-cell>

<!-- custom padding on large screens -->
<dz-table-cell label="Notes" padding="1em 2em">...</dz-table-cell>
```

## Good to know

- **The breakpoint is fixed at 64em.** CSS cannot read variables inside media queries, so it cannot be a custom property.
- **`width`, `align`, `padding` and `maxWidthDesktop` only apply on large screens**, where cells are real table cells. On small screens each row is a card.
- **Not a native `<table>`.** The components are custom elements styled to look like a table, so they do not carry table semantics for assistive technologies. For data where that matters, consider a native `<table>`.
- No built-in sorting, pagination, selection or virtual scrolling: compose them as shown above.

## License

MIT
