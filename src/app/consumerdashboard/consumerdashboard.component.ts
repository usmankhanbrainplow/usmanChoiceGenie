import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Headers, Response, Http } from "@angular/http"
import { Config } from "../Config";

@Component({
  selector: 'app-consumerdashboard',
  templateUrl: './consumerdashboard.component.html',
  styleUrls: ['./consumerdashboard.component.scss']
})
export class ConsumerdashboardComponent implements OnInit {
  private notifier: NotifierService;
  user;
  total;
  results;
  constructor(private http: Http, notifier: NotifierService) {

    this.notifier = notifier;
  }

  ngOnInit() {
    this.user = localStorage.getItem('username');
    this.fun()
this.fetchzip();
  }
  id;
  fun() {
    if (this.user) {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.get(Config.api + 'get_unread_notifications/' + this.user, { headers: headers }).subscribe(Res => {
this.results=Res.json()['Results']
for (let i of this.results) {
  this.id=i.id;     
  console.log(this.id)

  
}
        this.total = Res.json()['Total Result']
        console.log(this.total);
        for (let i = 0; i < this.total ; i++) {
          
          this.notifier.show({
            type: 'success',
            message: 'Admin Approve your Review!',
            id: 'THAT_NOTIFICATION_ID' // Again, this is optional
            
          });
          console.log(i);
        }

      });

    }
  }
  data;
  fetchzip() {
  
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.get(Config.api + 'user_profile/' + this.user + '/', { headers: headers })
    
          .subscribe(Res => {
            this.data = Res.json()['user'].id;
            console.log(this.data,'yyyyyyyyyyyyyyy');
          });
    
      }
  onclick() {
    for (let i of this.results) {
      this.id=i.id;     
      console.log(this.id)
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.put(Config.api + 'edit_status_user_notify/' + this.user +'/'+ this.id, JSON.stringify({
   
        
       
          "verb": "Notification for review change status..",
          "description": null,
          "nf_type": "Information",
          "target_object_id": null,
          "target_text": null,
          "target_url_text": null,
          "obj_object_id": null,
          "obj_text": null,
          "obj_url_text": null,
          "extra": null,
          "read": true,
          "deleted": false,
          "recipient": this.data 
    
      }), 
      {headers: headers}).subscribe(Res => {


      console.log(Res)
      });

    }
  }
}