import { Component, ViewChild, ElementRef  } from '@angular/core';
import { GifService } from '../../services/gif.service';

@Component({
  selector: 'gifs-search-box',
  template: `
  <h5>Buscar:</h5>
  <input type="text"
  class= "form-control"
  placeholder="Buscar gifs."
  (keyup.enter)="searchTag()"
  #txtTagInput>
  `,
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {

  constructor(private gifService:GifService){}

  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  searchTag(){
    const newTag = this.tagInput.nativeElement.value;
    this.gifService.searchTag(newTag);
    this.tagInput.nativeElement.value='';
    //console.log(newTag)
  }

}
