import { _Evento, _Media, EventosService } from './../eventos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Media } from '../../model/media-model';

@Component({
  selector: 'app-view-evento',
  templateUrl: './view-evento.page.html',
  styleUrls: ['./view-evento.page.scss'],
})
export class ViewEventoPage implements OnInit {
  evento: any
  medias: any
  constructor(private route: ActivatedRoute,
    private eventoSerice: EventosService,
    private router: Router) {
    this.route.queryParams.subscribe((par) => {
      this.evento = par
      console.log(this.evento.key)
      this.eventoSerice.getMedias(this.evento.key)
        .subscribe(result => {
          this.medias = result
        })
    })

  }

  ngOnInit() {
  }

  viewFoto(item: string, texto: string) {
    this.router.navigate([`/view-foto/`], { queryParams: { foto: item, texto: texto } })
  }

}
