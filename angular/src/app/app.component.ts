import { Component, OnInit } from '@angular/core';
import { StarWarsService } from './starwars.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  people: any[];
  search = '';
  show: boolean = false;
  sub: any;
  constructor(private swService: StarWarsService) {}

  ngOnInit() {
    this.swService.getPeople(this.search).subscribe(result => {
      this.people = result;
      this.show = true;
    });
  }
  onKey(event: any) {
    this.show = false;
    this.search = event.target.value;
    if (this.sub) {
      this.sub.unsubscribe();
    }

    this.sub = this.swService.getPeople(this.search).subscribe(result => {
      if (!result.length) {
        result = [{ name: 'Not Found' }];
      }
      this.people = result;
      this.show = true;
    });
  }

  searchHandler() {
    this.show = false;
    if (this.sub) {
      this.sub.unsubscribe();
    }
    this.sub = this.swService.getPeople(this.search).subscribe(result => {
      this.people = result;
      this.show = true;
    });
  }
}
