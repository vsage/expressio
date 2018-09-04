import { Component, OnInit } from "@angular/core";
import { NavController, NavParams, ViewController } from "ionic-angular";

import * as _ from "lodash";

@Component({
  selector: "game-ended-page",
  templateUrl: "game-ended.html",
})
export class GameEndedPage implements OnInit {

  public teams: any[];
  public score: any[];
  public displayedScores: any[];

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams) {
    this.teams = this.navParams.get("teams");
    this.score = this.navParams.get("score");
  }

  public ngOnInit() {
    this.displayedScores = _.orderBy(
      _.map(this.teams, (team, i) => ({team, score: this.score[i]})), "score", "desc");
  }

  public dismiss() {
    // let data = { 'teamName': this.teamName };
    this.viewCtrl.dismiss();
  }

}
