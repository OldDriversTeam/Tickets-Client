import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'movie-box',
  templateUrl: './movie-box.component.html',
  styleUrls: ['./movie-box.component.css']
})
export class MovieBoxComponent implements OnInit {
  @Input() movie;
  
  constructor() { }

  ngOnInit() {
    console.log(this.movie);
  }

}
