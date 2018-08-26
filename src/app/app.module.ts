import { HttpClientModule } from "@angular/common/http";
import { ErrorHandler, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";

import { GameService } from "../pages/game/game-service";

import { GameEndedPage } from "../pages/game-ended/game-ended";
import { GamePage } from "../pages/game/game";
import { HomePage } from "../pages/home/home";
import { NextPlayerPage } from "../pages/next-player/next-player";
import { TeamsCreatePage } from "../pages/teams-create/teams-create";
import { ThemesPage } from "../pages/themes/themes";
import { MyApp } from "./app.component";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    GamePage,
    NextPlayerPage,
    ThemesPage,
    TeamsCreatePage,
    GameEndedPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    GamePage,
    NextPlayerPage,
    ThemesPage,
    TeamsCreatePage,
    GameEndedPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ],
})
export class AppModule {}
