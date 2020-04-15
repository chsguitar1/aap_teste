import { AngularFireDatabase } from '@angular/fire/database';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AlunoService } from '../aluno.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-edit-aluno',
  templateUrl: './edit-aluno.page.html',
  styleUrls: ['./edit-aluno.page.scss'],
})
export class EditAlunoPage implements OnInit {
  nomeAluno: string
  foto: string
  base64Image

  constructor(private storage: Storage,
    private camera: Camera,
    private db: AngularFireDatabase,
    private alunoService: AlunoService,
    private router: Router, ) {

    storage.get('nomeAluno').then((valor) => {
      this.nomeAluno = valor
    })
    storage.get('foto').then((valor) => {
      this.foto = valor
    })
  }

  ngOnInit() {
  }
  editFoto() {
    alert('teste')
  }
  getFoto(tipo) {
    const options: CameraOptions = {
      quality: 10,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType:
        tipo == "picture"
          ? this.camera.PictureSourceType.CAMERA
          : this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      correctOrientation: true,
      saveToPhotoAlbum: false
    };

    this.camera.getPicture(options).then(
      imageData => {
        this.base64Image = "data:image/jpeg;base64," + imageData
        this.alunoService.pushUpload(this.base64Image)
      },
      err => {
      },
    )
    this.router.navigate([`/alunof`])
  }
}
