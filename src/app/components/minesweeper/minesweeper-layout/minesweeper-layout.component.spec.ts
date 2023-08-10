import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinesweeperLayoutComponent } from './minesweeper-layout.component';

describe('MinesweeperLayotComponent', () => {
  let component: MinesweeperLayoutComponent;
  let fixture: ComponentFixture<MinesweeperLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MinesweeperLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MinesweeperLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
