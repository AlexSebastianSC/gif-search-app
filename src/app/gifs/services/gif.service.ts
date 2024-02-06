import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifService {

  public gifList:Gif[] = [];

  private _tagsHistory:string[]=[];
  private apiKey:string = "OrnXUdlAUNSlaxkh7QzlV4LpMt3pR31b";
  private serviceUrl:string = "http://api.giphy.com/v1/gifs";

  constructor(private http:HttpClient) {
    this.loadLocalStorage();
    console.log("gif service storage ready");
  }

  get tagsHistory(){
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string){
    tag = tag.toLocaleLowerCase();

    if(this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter((oldtag)=>oldtag!== tag);
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0,10);
    this.saveLocalStorage();
  }

  private saveLocalStorage():void{
    localStorage.setItem('history',JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void{
    if(!localStorage.getItem('history')) return;

    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    if(this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);
  }

  searchTag(tag: string):void{
    if(tag.length===0) return;
    this.organizeHistory(tag)

    const params = new HttpParams()
    .set('api_key',this.apiKey)
    .set('limit','20')
    .set('q',tag)

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`,{params})
    .subscribe(resp=>{
      this.gifList =resp.data;
      console.log({gifs:this.gifList});
    })
  }


  /*
  async searchTag(tag: string):Promise<void>{
    if(tag.length===0) return;
    this.organizeHistory(tag)

    fetch('http://api.giphy.com/v1/gifs/search?api_key=OrnXUdlAUNSlaxkh7QzlV4LpMt3pR31b&q=Kratos&limit=20')
    .then(resp => resp.json())
    .then(data => console.log(data))
  }
  */
}
