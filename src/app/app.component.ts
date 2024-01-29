import { Component, OnInit } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{


  observer = new Subject<boolean>();

  ngOnInit(): void {

    this.observer.pipe(
      debounceTime(500)
    ).subscribe((res:any)=>{
        if(res!=""){

        }
    });
  }


  callApi(){}


  title = 'angular-awe';
}
