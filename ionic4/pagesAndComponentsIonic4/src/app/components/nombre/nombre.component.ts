import { Component,Input,  OnInit } from '@angular/core';

@Component({
  selector: 'app-nombre',
  templateUrl: './nombre.component.html',
  styleUrls: ['./nombre.component.scss'],
})
export class NombreComponent implements OnInit {

  @Input('nombre') nombre : string;

  constructor() { }

  ngOnInit() {}

}
