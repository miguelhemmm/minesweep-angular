import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoryComponent } from './history.component';
import { Firestore } from '@angular/fire/firestore';
import { RoundPipe } from 'src/app/pipes/round-pipe.pipe';
import { FirebaseAppModule } from '@angular/fire/app';

const firestoreStub = jasmine.createSpyObj('Firestore', [
  'collection',
  'collectionData',
]);

describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;
  let firestore: jasmine.SpyObj<Firestore>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryComponent, RoundPipe],
      providers: [{ provide: Firestore, useValue: firestoreStub }],
      imports: [FirebaseAppModule],
    });

    fixture = TestBed.createComponent(HistoryComponent);
    component = fixture.componentInstance;
    firestore = TestBed.inject(Firestore) as jasmine.SpyObj<Firestore>;
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
      const date = new Date(Date.UTC(2022, 4, 12, 14, 30));
      const localOffsetHours = date.getTimezoneOffset() / 60;
      let expectedHour = 14 - localOffsetHours;

      let amPm = 'AM';
      if (expectedHour >= 12) {
        amPm = 'PM';
        if (expectedHour > 12) {
          expectedHour -= 12;
        }
      }
      const expectedOutput = `05/12/2022, ${String(expectedHour).padStart(
        2,
        '0'
      )}:30 ${amPm}`;

      expect(component['formatDate'](date.getTime() / 1000)).toBe(
        expectedOutput
      );
    });
  });

  describe('Pagination Logic', () => {
    beforeEach(() => {
      component.totalItems = 50;
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

  describe('displayedLogs getter', () => {
    it('should return the correct logs for the current page', () => {
      component.logList = Array.from({ length: 100 }, (_, i) => ({
        ellapsedTime: i,
        difficulty: 'easy',
        status: 'success',
        startTime: { seconds: 10000 + i },
        endTime: { seconds: 10100 + i },
      })) as any;

      component.itemsPerPage = 10;

      component.currentPage = 1;
      let logs = component.displayedLogs;
      expect(logs.length).toBe(10);
      expect(logs[0].ellapsedTime).toBe(0);
      expect(logs[9].ellapsedTime).toBe(9);

      component.currentPage = 5;
      logs = component.displayedLogs;
      expect(logs.length).toBe(10);
      expect(logs[0].ellapsedTime).toBe(40);
      expect(logs[9].ellapsedTime).toBe(49);

      component.currentPage = 10;
      logs = component.displayedLogs;
      expect(logs.length).toBe(10);
      expect(logs[0].ellapsedTime).toBe(90);
      expect(logs[9].ellapsedTime).toBe(99);
    });
  });
});
