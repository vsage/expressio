import { Component,OnInit } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { NextPlayerPage } from '../next-player/next-player';
import { GameEndedPage } from '../game-ended/game-ended';

@Component({
  selector: 'game',
  templateUrl: 'game.html'
})
export class GamePage implements OnInit{

  public time: number;
  public interval: any;
  public theme: string;
  public expressions: any[];
  public currentExpression: string;
  public questionIndex: number;
  public teamIndex: number;
  public currentTeam: string;
  public teams: string[];
  public score: number[];
  public rounds: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.teams = this.navParams.get('teams');
    this.score = new Array(this.teams.length).fill(0);
    this.rounds = 2; // To make parameter
  }

  ngOnInit(){

    this.expressions = [
      {expression: 'avoir du plomb dans l’aile'},
      {expression: 'avoir un fil à la patte'},
      {expression: 'avoir un sacré coup de patte'},
      {expression: 'donner des ailes'},
      {expression: 'faire patte de velours'},
      {expression: 'graisser la patte'},
      {expression: 'montrer patte blanche'},
    ]
    this.theme = this.navParams.get('theme');
    this.teamIndex = 0;
    this.currentTeam = this.teams[this.teamIndex];
    this.nextPlayer();
  }

  newTurn() {
    this.time = 5000;
    this.questionIndex = 0;
    this.interval = setInterval(() => this.decrement(), 100)
    this.currentExpression = this.expressions[this.questionIndex];
  }

  decrement(){
    if (this.time <= 0) {
      clearInterval(this.interval)
      this.rounds -= 1;
      this.teamIndex = (this.teamIndex + 1) % this.teams.length;
      this.currentTeam = this.teams[this.teamIndex];
      this.nextPlayer();
      return
    }
    this.time-=100;
  }

  ionViewDidLeave(){
    clearInterval(this.interval)
  }

  next(){
    this.questionIndex += 1;
    this.currentExpression = this.expressions[this.questionIndex];
    this.score[this.teamIndex]+=1;
  }

  nextPlayer(){
    if (this.rounds > 0) {
      let nextPlayerModal = this.modalCtrl.create(NextPlayerPage, {team: this.currentTeam});
      nextPlayerModal.onDidDismiss(data => {
        this.newTurn();
      });
      nextPlayerModal.present();
    } else {
      let gameEnded = this.modalCtrl.create(GameEndedPage, {teams: this.teams, score: this.score});
      gameEnded.onDidDismiss(data => {
        this.navCtrl.popToRoot();
      });
      gameEnded.present();
    }

  }
}
