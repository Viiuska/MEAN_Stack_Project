import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Http, Headers } from '@angular/http';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  booktitle:String="";
  title: String="";
  author:String="";
  genre:String="";
  desc:String="";

  newBook: String="";
  newAuthor:String="";
  newGenre:String="";
  newDescription:String="";

  constructor(
    private flashMessage: FlashMessagesService,
    private http:Http,
    private authService: AuthService
    ) { }

    onBookSubmit(){
      const book ={
        title: this.newBook,
        author:this.newAuthor,
        genre:this.newGenre,
        description:this.newDescription
      }

      this.authService.newBook(book).subscribe(data=>{
        console.log(data)
        if(data.success){
          this.flashMessage.show('Book added', {cssClass: 'alert-success', timeout: 3000});
        }
        else{
          this.flashMessage.show('Book already exists', {cssClass: 'alert-danger', timeout: 3000});
        }
      })
      this.newBook= "";
      this.newAuthor= "";
      this.newGenre= "";
      this.newDescription= "";
      
    }


    onSearchSubmit() {
      var as = this.http.post("http://localhost:3000/users/dashboard/" + this.booktitle, {responseType:'object'}).subscribe((resultData: any)=>{
        
        let info = JSON.parse(resultData._body)
        this.title = "";
        this.author = "";
        this.genre="";
        this.desc="";
    
        if(info.data =='Book not found') {
          this.flashMessage.show('Book not found', {cssClass: 'alert-success', timeout: 5000});
        }
        else{
          this.title = info.data.title;
          this.author = info.data.author;
          this.genre=info.data.genre;
          this.desc=info.data.description;
        }
      })
  
  }

  ngOnInit() {
  }


}
