import { Component, OnInit } from "@angular/core";
import { ModalController, NavController, NavParams } from "ionic-angular";
import { GameEndedPage } from "../game-ended/game-ended";
import { NextPlayerPage } from "../next-player/next-player";
import { GameService, IExpression } from "./game-service";

@Component({
  selector: "game",
  templateUrl: "game.html",
  providers: [GameService],
})
export class GamePage implements OnInit {

  public time: number;
  public interval: any;
  public theme: string;
  public expressions: IExpression[];
  public currentExpression: IExpression;
  public questionIndex: number;
  public teamIndex: number;
  public currentTeam: string;
  public teams: string[];
  public score: number[];
  public rounds: number;
  public type: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public gameService: GameService) {
    this.type = this.navParams.get("type");
    this.theme = this.navParams.get("theme");
    if (this.type === "team") {
      this.teams = this.navParams.get("teams");
      this.score = new Array(this.teams.length).fill(0);
    }
    this.rounds = 2; // To make parameter
  }

  public back() {
    this.navCtrl.pop();
  }

  public ngOnInit() {

    // this.expressions = [
    //   {expression: 'avoir du plomb dans l’aile'},
    //   {expression: 'avoir un fil à la patte'},
    //   {expression: 'avoir un sacré coup de patte'},
    //   {expression: 'donner des ailes'},
    //   {expression: 'faire patte de velours'},
    //   {expression: 'graisser la patte'},
    //   {expression: 'montrer patte blanche'},
    // ]
    this.gameService.listExpressions().subscribe((exps) => {
        this.expressions = exps.body;
        this.startGame(this.type);
    });
  }

  public startGame(type) {
    switch (type) {
      case "free":
        this.newTurn(type);
        break;
      case "team":
        this.teamIndex = 0;
        this.currentTeam = this.teams[this.teamIndex];
        this.nextPlayer();
        break;
      default:
        console.log("can't find this type");
    }
  }

  public newTurn(type) {
    if (type === "team") {
      this.time = 10000;
      this.interval = setInterval(() => this.decrement(), 100);
    }
    this.questionIndex = 0;
    this.currentExpression = this.expressions[this.questionIndex];
  }

  public decrement() {
    if (this.time <= 0) {
      clearInterval(this.interval);
      this.rounds -= 1;
      this.teamIndex = (this.teamIndex + 1) % this.teams.length;
      this.currentTeam = this.teams[this.teamIndex];
      this.nextPlayer();
      return;
    }
    this.time -= 100;
  }

  public ionViewDidLeave() {
    clearInterval(this.interval);
  }

  public next() {
    if (this.questionIndex >= this.expressions.length - 1) {
      const gameEnded = this.modalCtrl.create(GameEndedPage, {teams: this.teams, score: this.score});
      gameEnded.onDidDismiss((data) => {
        this.navCtrl.popToRoot();
      });
      gameEnded.present();
      return;
    }
    this.questionIndex += 1;
    this.currentExpression = this.expressions[this.questionIndex];
    if (this.type === "team") {
      this.score[this.teamIndex] += 1;
    }
  }

  public nextPlayer() {
    if (this.rounds > 0) {
      const nextPlayerModal = this.modalCtrl.create(NextPlayerPage, {team: this.currentTeam});
      nextPlayerModal.onDidDismiss((data) => {
        this.newTurn(this.type);
      });
      nextPlayerModal.present();
    } else {
      const gameEnded = this.modalCtrl.create(GameEndedPage, {teams: this.teams, score: this.score});
      gameEnded.onDidDismiss((data) => {
        this.navCtrl.popToRoot();
      });
      gameEnded.present();
    }

  }
}
