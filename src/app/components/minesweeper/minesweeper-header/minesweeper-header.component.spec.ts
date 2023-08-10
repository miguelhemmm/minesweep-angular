import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinesweeperHeaderComponent } from './minesweeper-header.component';

describe('MinesweeperHeaderComponent', () => {
  let component: MinesweeperHeaderComponent;
  let fixture: ComponentFixture<MinesweeperHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinesweeperHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinesweeperHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
