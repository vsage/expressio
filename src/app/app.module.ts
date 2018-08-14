import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { GamePage } from '../pages/game/game';
import { NextPlayerPage } from '../pages/next-player/next-player';
import { ThemesPage } from '../pages/themes/themes';
import { TeamsCreatePage } from '../pages/teams-create/teams-create';
import { GameEndedPage } from '../pages/game-ended/game-ended';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    GamePage,
    NextPlayerPage,
    ThemesPage,
    TeamsCreatePage,
    GameEndedPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    GamePage,
    NextPlayerPage,
    ThemesPage,
    TeamsCreatePage,
    GameEndedPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
