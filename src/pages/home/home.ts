import { Component, OnInit } from "@angular/core";
import { ModalController, NavController } from "ionic-angular";
import { GameService } from "../game/game-service";
import { RulesPage } from "../rules/rules";
import { SettingsPage } from "../settings/settings";
import { TeamsCreatePage } from "../teams-create/teams-create";
import { ThemePage } from "../theme/theme";

@Component({
  providers: [GameService],
  selector: "page-home",
  templateUrl: "home.html",
})
export class HomePage implements OnInit {

  public teamsCreatePage: any;
  public themePage: any;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public gameService: GameService) {
    this.teamsCreatePage = TeamsCreatePage;
    this.themePage = ThemePage;

  }

  public ngOnInit() {
    this.gameService.launchServer();
  }

  public goToSettings() {
    const SettingsModal = this.modalCtrl.create(SettingsPage);
    SettingsModal.onDidDismiss((data) => {
        console.log(data);
      });
    SettingsModal.present();
  }

  public goToRules() {
    const RulesModal = this.modalCtrl.create(RulesPage);
    RulesModal.onDidDismiss((data) => {
      console.log(data);
    });
    RulesModal.present();
  }

}
