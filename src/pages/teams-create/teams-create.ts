import { Component,OnInit } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { ThemesPage } from '../themes/themes';
import { NameTeamPage } from '../name-team/name-team';

@Component({
  selector: 'teams-create',
  templateUrl: 'teams-create.html'
})
export class TeamsCreatePage implements OnInit{

  public inputsList: any[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController
  ) {

  }

  ngOnInit(){
    this.inputsList = ["", ""]
  }

  createTeam(){
    this.inputsList.push("")
    // let nameTeam = this.modalCtrl.create(NameTeamPage);
    // nameTeam.onDidDismiss(data => {
    //   console.log(data);
    // });
    // nameTeam.present();
  }

  removeTeam(){
    if (this.inputsList.length>2) {
      this.inputsList.pop()
    }
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  goToThemes() {
    this.navCtrl.push(ThemesPage, {
      type: this.navParams.get('type'),
      teams: this.inputsList
    })
  }
  
}
