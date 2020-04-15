import { _Comunicado } from './../comunicado.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';
import { CalendarComponentOptions } from 'ion2-calendar';

@Component({
  selector: 'app-view-comunicado',
  templateUrl: './view-comunicado.page.html',
  styleUrls: ['./view-comunicado.page.scss'],
})
export class ViewComunicadoPage implements OnInit {
  comunicado: any
  date: string;
  type: 'string'; 
  
  options: CalendarComponentOptions = {
    from: new Date(2000, 0, 1),
  };

  constructor(private route: ActivatedRoute,
    private navCtrl: NavController,
    private router:Router,
    public modalCtrl: ModalController) {
    this.route.queryParams.subscribe((par) => {
      this.comunicado = par
      console.log(par)
    })
  }

  ngOnInit() {
  }
  
  voltar() {
    this.navCtrl.back()
  }
  goComunicados() {
    this.router.navigate([`/tabs-home/`])
  }
  onChange($event) {
    console.log($event);
  }

}
