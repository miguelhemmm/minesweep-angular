import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HistoryComponent } from './history.component';
import { Firestore } from '@angular/fire/firestore';
import { UiService } from 'src/app/services/ui.service';
import { RoundPipePipe } from 'src/app/pipes/round-pipe.pipe';
import { FirebaseAppModule } from '@angular/fire/app';

class MockFirestore {
  collection(path: string) {
    return {
      valueChanges: () =>
        of([
          /* Put your mock log data here */
        ]),
    };
  }
}

class MockUiService {}

describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistoryComponent, RoundPipePipe],
      providers: [
        { provide: Firestore, useClass: MockFirestore },
        { provide: UiService, useClass: MockUiService },
      ],
      imports: [FirebaseAppModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HistoryComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('formatEllapsedTime', () => {
    it('should format seconds correctly', () => {
      expect(component['formatEllapsedTime'](30)).toBe('30 sec');
    });

    it('should format minutes correctly', () => {
      expect(component['formatEllapsedTime'](1500)).toBe('25 min');
    });

    it('should format hours correctly', () => {
      expect(component['formatEllapsedTime'](7200)).toBe('2 hr');
    });
  });

  describe('formatDate', () => {
    it('should format Unix timestamp correctly', () => {
      const date = new Date('2022-05-12T14:30:00Z');
      expect(component['formatDate'](date.getTime() / 1000)).toBe(
        '05/12/2022, 09:30 PM'
      );
    });
  });

  describe('Pagination Logic', () => {
    beforeEach(() => {
      component.totalItems = 50;
      fixture.detectChanges();
    });

    it('should go to next page correctly', () => {
      component.currentPage = 1;
      component.totalItems = 50;
      component.itemsPerPage = 10;
      component.nextPage();
      expect(component.currentPage).toBe(2);
    });

    it('should not exceed max pages', () => {
      component.currentPage = 5;
      component.nextPage();
      expect(component.currentPage).toBe(5);
    });

    it('should go to previous page correctly', () => {
      component.currentPage = 3;
      component.prevPage();
      expect(component.currentPage).toBe(2);
    });

    it('should not go below the first page', () => {
      component.currentPage = 1;
      component.prevPage();
      expect(component.currentPage).toBe(1);
    });
  });
});
