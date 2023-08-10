import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirebaseAppModule } from '@angular/fire/app';
import { Firestore } from '@angular/fire/firestore';
import { MinesweeperComponent } from './minesweeper.component';
import { MinesweeperHeaderComponent } from './minesweeper-header/minesweeper-header.component';
import { MinesweeperLayoutComponent } from './minesweeper-layout/minesweeper-layout.component';
import { UiService } from 'src/app/services/ui.service';
import { ChangeDetectorRef } from '@angular/core';

const firestoreStub = jasmine.createSpyObj('Firestore', [
  'collection',
  'collectionData',
]);

const mockToastr = jasmine.createSpyObj('ToastrService', ['success']);

const mockUiService = jasmine.createSpyObj('UiService', [
  'setHistoryLog',
  'getHistoryLog',
  'getGameStatus',
  'getGameConfiguration',
  'getSelectedLevel',
]);

const mockChangeDetector = jasmine.createSpyObj('ChangeDetectorRef', [
  'detectChanges',
]);

describe('MinsesweeperComponent', () => {
  let component: MinesweeperComponent;
  let fixture: ComponentFixture<MinesweeperComponent>;
  let firestore: jasmine.SpyObj<Firestore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MinesweeperComponent,
        MinesweeperHeaderComponent,
        MinesweeperLayoutComponent,
      ],
      providers: [
        { provide: Firestore, useValue: firestoreStub },
        { provide: ToastrService, useValue: mockToastr },
        { provide: UiService, useValue: mockUiService },
        { provide: ChangeDetectorRef, useValue: mockChangeDetector },
      ],
      imports: [FirebaseAppModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MinesweeperComponent);
    component = fixture.componentInstance;
    firestore = TestBed.inject(Firestore) as jasmine.SpyObj<Firestore>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
