import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { DZ_TABLE_IMPORTS } from '../../public-api';

@Component({
  imports: [DZ_TABLE_IMPORTS],
  template: `
    <dz-table>
      <dz-table-header>
        <dz-table-head width="40%">Nombre</dz-table-head>
        <dz-table-head align="flex-end">Edad</dz-table-head>
      </dz-table-header>
      <dz-table-body>
        @for (p of people; track p.name) {
          <dz-table-row>
            <dz-table-cell label="Nombre" width="40%">{{ p.name }}</dz-table-cell>
            <dz-table-cell label="Edad" align="flex-end" [column]="true">{{ p.age }}</dz-table-cell>
          </dz-table-row>
        }
      </dz-table-body>
    </dz-table>
  `,
})
class HostComponent {
  people = [
    { name: 'Ana', age: 31 },
    { name: 'Luis', age: 45 },
  ];
}

describe('dz-table (integración)', () => {
  it('renderiza cabecera, filas y celdas con data-label', async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;

    expect(el.querySelectorAll('dz-table-row').length).toBe(2);
    expect(el.querySelectorAll('dz-table-head').length).toBe(2);

    const cells = el.querySelectorAll<HTMLElement>('dz-table-body .table-cell');
    expect(cells.length).toBe(4);
    expect(cells[0].getAttribute('data-label')).toBe('Nombre');
    expect(cells[0].textContent?.trim()).toBe('Ana');
    expect(cells[1].classList.contains('column')).toBe(true);
    expect(cells[0].getAttribute('style')).toContain('--width: 40%');
    expect(cells[1].getAttribute('style')).toContain('--text-align: end');
  });

  it('no define --padding ni data-label cuando no se indican', async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const header = fixture.nativeElement.querySelector('dz-table-header .table-cell') as HTMLElement;

    expect(header.getAttribute('data-label')).toBeNull();
    expect(header.style.getPropertyValue('--padding')).toBe('0.5em 1em 1em 1em');

    const cell = fixture.nativeElement.querySelector('dz-table-body .table-cell') as HTMLElement;
    expect(cell.style.getPropertyValue('--padding')).toBe('');
  });
});
