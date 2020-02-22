import { Component, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage";
import { NavController, NavParams, ViewController } from "ionic-angular";

@Component({
  selector: "settings-page",
  templateUrl: "settings.html",
})
export class SettingsPage implements OnInit {

  public settings = {};
  public settingsList = ["turns"];

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    private storage: Storage) {
  }

  public ngOnInit() {
    this.settingsList.forEach((setting) => {
      this.storage.get(setting).then((val) => {
        if (!val) {
          this.initSetting(setting);
        } else {
          this.settings[setting] = val;
        }
      });
    });
    // this.storage.forEach((key, val) => {
    //   // console.log(key, val);
    //   if (this.settingsList.includes(key)) {
    //     this.settings[key] = val;
    //   }
    // });
  }

  public initSetting(setting) {
    switch (setting) {
      case "turns":
        this.storage.set("turns", 4);
        this.settings["turns"] = 4;
        break;
      default:
    }
  }

  public addTurn() {
    this.settings["turns"] += 1;
  }

  public removeTurn() {
    if (this.settings["turns"] > 1) {
      this.settings["turns"] -= 1;
    }
  }

  public dismiss() {
    this.saveSettings();
    // let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss();
  }

  public saveSettings() {
    Object.keys(this.settings).map((key, index) => {
      this.storage.set(key, this.settings[key]);
    });
  }

}
