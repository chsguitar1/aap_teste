import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.page.html',
  styleUrls: ['./cardapio.page.scss'],
})
export class CardapioPage implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }
  goAlmoco() {
 this.router.navigate(['/almoco'])
  }
  goLanche(){
    this.router.navigate(['/lanche'])
  }
}
