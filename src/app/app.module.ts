import { HttpClientModule } from "@angular/common/http";
import { ErrorHandler, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { IonicStorageModule } from "@ionic/storage";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
// import { Pro } from '@ionic/pro';

import { GameService } from "../pages/game/game-service";
import { CapitalizePipe } from "../pipes/capitalize.pipe";

import { GameEndedPage } from "../pages/game-ended/game-ended";
import { GamePage } from "../pages/game/game";
import { HomePage } from "../pages/home/home";
import { NextPlayerPage } from "../pages/next-player/next-player";
import { RulesPage } from "../pages/rules/rules";
import { SettingsPage } from "../pages/settings/settings";
import { TeamsCreatePage } from "../pages/teams-create/teams-create";
import { ThemePage } from "../pages/theme/theme";

import { MyApp } from "./app.component";

// Pro.init('YOUR_APP_ID', {
//   appVersion: 'APP_VERSION'
// })

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    GamePage,
    NextPlayerPage,
    ThemePage,
    TeamsCreatePage,
    GameEndedPage,
    SettingsPage,
    RulesPage,
    CapitalizePipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    GamePage,
    NextPlayerPage,
    ThemePage,
    TeamsCreatePage,
    GameEndedPage,
    SettingsPage,
    RulesPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ],
})
export class AppModule {}
