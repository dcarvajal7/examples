import { Component, OnInit } from '@angular/core';
import { AlbumService } from 'src/app/services/album.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-album',
  templateUrl: './album.page.html',
  styleUrls: ['./album.page.scss'],
})
export class AlbumPage implements OnInit {

  information = null;

  constructor(private activatedRoute: ActivatedRoute, private albumService: AlbumService) { }

  ngOnInit() {
    // Get the ID that was passed with the URL
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    // Get the information from the API
    this.albumService.getDetail(id).subscribe(result => {
      this.information = result;
    });
  }

}
