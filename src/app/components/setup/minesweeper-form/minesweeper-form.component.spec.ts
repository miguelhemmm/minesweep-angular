import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinesweeperFormComponent } from './minesweeper-form.component';

describe('MinesweeperFormComponent', () => {
  let component: MinesweeperFormComponent;
  let fixture: ComponentFixture<MinesweeperFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinesweeperFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinesweeperFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
