import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService} from 'ngx-toastr';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  userName;
  profile: any;
  newProfile;
  isAvailable = false;
  constructor(private httpClient: HttpClient, private toastr: ToastrService) { }
   
  ngOnInit() {
  }

  getDetails() {
     this.isAvailable = true;
   

     
     if (localStorage.getItem(this.userName)) {

       console.log(localStorage.getItem(this.userName))
       this.profile= JSON.parse( localStorage.getItem(this.userName));
        console.log('www')
        this.isAvailable = false;

      }
      else {
        return this.httpClient.get('https://api.github.com/users/' + this.userName )
      .subscribe((res: any) => {
        this.profile = res;
        console.log(this.profile);
        this.isAvailable = false;
        localStorage.setItem(this.userName, JSON.stringify(this.profile));
        console.log('com')
      },
        () => {
          //  alert('user not found') 
          this.toastr.error('User not found');
        this.isAvailable = false;

          }
      );
       
  };






}

}
