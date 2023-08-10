import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MinesweeperComponent } from './components/minesweeper/minesweeper.component';
import { MinesweeperLayoutComponent } from './components/minesweeper/minesweeper-layout/minesweeper-layout.component';
import { MinesweeperFormComponent } from './components/setup/minesweeper-form/minesweeper-form.component';
import { MinesweeperHeaderComponent } from './components/minesweeper/minesweeper-header/minesweeper-header.component';
import { SetupComponent } from './components/setup/setup.component';
import { HistoryComponent } from './components/history/history.component';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { RoundPipe } from './pipes/round-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MinesweeperComponent,
    MinesweeperLayoutComponent,
    MinesweeperFormComponent,
    MinesweeperHeaderComponent,
    SetupComponent,
    HistoryComponent,
    RoundPipe,
  ],
  imports: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
