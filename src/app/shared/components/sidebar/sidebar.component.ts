import { Component } from '@angular/core';
import { GifService } from 'src/app/gifs/services/gif.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private gifService: GifService){}

  get getGifsSearched(){
    return this.gifService.tagsHistory;
  }

  public searchHistoryTag(tag : string): void{
    this.gifService.searchTag(tag);
  }
}
