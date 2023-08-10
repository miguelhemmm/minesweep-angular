import { Log } from './../../models/mine';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { takeWhile, map } from 'rxjs';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit, OnDestroy {
  private uiService = inject(UiService);

  public logList: Log[] = [];
  public destroyed = false;
  public currentPage: number = 1;
  public itemsPerPage: number = 10;
  public totalItems: number = 0;

  constructor(private firestore: Firestore) {}

  public ngOnInit(): void {
    this.totalItems = this.logList.length;

    const log = collection(this.firestore, 'log');
    collectionData(log)
      .pipe(
        map((data) => this.mapCollectionData(data)),
        takeWhile(() => !this.destroyed)
      )
      .subscribe({
        next: (data) => {
          this.logList = data;
          this.totalItems = this.logList.length;
        },
      });
  }

  public mapCollectionData(data: any[]): Log[] {
    data.sort((a, b) => a.ellapsedTime - b.ellapsedTime);
    return data.map((log) => {
      return {
        ellapsedTime: this.formatEllapsedTime(log?.ellapsedTime),
        difficulty: log.difficulty,
        status: log.status,
        startTime: this.formatDate(log.startTime.seconds),
        endTime: this.formatDate(log.endTime.seconds),
      };
    });
  }

  private formatEllapsedTime(seconds: number): string {
    if (seconds < 60) return `${seconds} sec`;
    else if (seconds < 3600) return `${Math.floor(seconds / 60)} min`;
    else return `${Math.floor(seconds / 3600)} hr`;
  }

  private formatDate(unixTimestamp: number): string {
    const date = new Date(unixTimestamp * 1000);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }

  public ngOnDestroy(): void {
    this.destroyed = true;
  }

  public nextPage(): void {
    if (this.currentPage < Math.ceil(this.totalItems / this.itemsPerPage)) {
      this.currentPage++;
    }
  }

  public prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  get displayedLogs(): Log[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.logList.slice(start, end);
  }
}
