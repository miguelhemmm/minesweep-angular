import { MinesweeperFormComponent } from './minesweeper-form/minesweeper-form.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupComponent } from './setup.component';
import { FirebaseAppModule } from '@angular/fire/app';
import { Firestore } from '@angular/fire/firestore';

const firestoreStub = jasmine.createSpyObj('Firestore', [
  'collection',
  'collectionData',
]);

describe('SetupComponent', () => {
  let component: SetupComponent;
  let fixture: ComponentFixture<SetupComponent>;
  let firestore: jasmine.SpyObj<Firestore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SetupComponent, MinesweeperFormComponent],
      providers: [{ provide: Firestore, useValue: firestoreStub }],
      imports: [FirebaseAppModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SetupComponent);
    component = fixture.componentInstance;
    firestore = TestBed.inject(Firestore) as jasmine.SpyObj<Firestore>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
