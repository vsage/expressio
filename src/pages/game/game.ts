import { Component, OnInit } from "@angular/core";
import { Insomnia } from "@ionic-native/insomnia";
import { Storage } from "@ionic/storage";
import { ModalController, NavController, NavParams } from "ionic-angular";
import { Observable } from "rxjs";
import { CapitalizePipe } from "../../pipes/capitalize.pipe";
import { GameEndedPage } from "../game-ended/game-ended";
import { NextPlayerPage } from "../next-player/next-player";
import { GameService, IExpression } from "./game-service";

@Component({
  providers: [GameService, Insomnia],
  selector: "game-page",
  templateUrl: "game.html",
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
  private starter: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public gameService: GameService,
    public storage: Storage,
    public insomnia: Insomnia) {
    this.type = this.navParams.get("type");
    this.theme = this.navParams.get("theme");
    // this.rounds = 2; // To make parameter
  }

  public back() {
    this.navCtrl.pop();
  }

  public ngOnInit() {

    this.insomnia.keepAwake();
    this.starter = true;

    if (this.type === "team") {
      this.teams = this.navParams.get("teams");
      this.score = new Array(this.teams.length).fill(0);
      this.storage.get("turns").then( (turns) => {
        this.rounds = turns ? turns * this.teams.length : 4 * this.teams.length;
        this.queryExps().subscribe((exps) => {
          this.expressions = this.shuffle(exps.body);
          this.startGame(this.type);
        });
      });
    } else {
      this.queryExps().subscribe((exps) => {
        this.expressions = this.shuffle(exps.body);
        this.startGame(this.type);
      });
    }

    // this.expressions = [
    //   {expression: 'avoir du plomb dans l’aile'},
    //   {expression: 'avoir un fil à la patte'},
    //   {expression: 'avoir un sacré coup de patte'},
    //   {expression: 'donner des ailes'},
    //   {expression: 'faire patte de velours'},
    //   {expression: 'graisser la patte'},
    //   {expression: 'montrer patte blanche'},
    // ]
    // if (this.theme === "random") {
    //   this.gameService.listExpressions().subscribe((exps) => {
    //     this.expressions = this.shuffle(exps.body);
    //     this.startGame(this.type);
    //   });
    // } else {
    //   this.gameService.listExpressionsCategory(this.theme).subscribe((exps) => {
    //     this.expressions = this.shuffle(exps.body);
    //     this.startGame(this.type);
    //   });
    // }
    // Right now, no theme so only all expressions
  }

  public queryExps(category?: string): Observable<any> {
    if (!category) {
      return this.gameService.listExpressions();
    } else {
      return this.gameService.listExpressionsCategory(category);
    }
  }

  public startGame(type) {
    this.questionIndex = 0;
    if (this.starter) {
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
      }
    }
  }

  public newTurn(type) {
    if (type === "team") {
      this.time = 45000;
      this.interval = setInterval(() => this.decrement(), 100);
    }
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
    this.starter = false;
    clearInterval(this.interval);
    this.insomnia.allowSleepAgain();
  }

  public ionViewWillEnter() {
    this.starter = true;
  }

  public next(answer) {
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
    if (this.type === "team" && answer === "ok") {
      this.score[this.teamIndex] += 1;
    }
  }

  public nextPlayer() {
    this.questionIndex += 1;
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
  /**
   * Shuffles array in place. ES6 version
   * @param {Array} a items An array containing the items.
   */
  private shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
}
