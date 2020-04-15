import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-foto',
  templateUrl: './view-foto.page.html',
  styleUrls: ['./view-foto.page.scss'],
})
export class ViewFotoPage implements OnInit {
foto: string
texto:string
  constructor(private route: ActivatedRoute) { 
   route.queryParams.subscribe((par)=>{
     this.foto = par['foto']
     this.texto = par['texto']

   })
  }

  ngOnInit() {
  }

}
