import { Injectable } from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/map'
import {Config} from "../../Config";
@Injectable()
export class EditBlogService {

  constructor(private http: Http) { }
  

editTodoList(id,updatedheading,updatedcontent1,updatedblog_image) {
  
  console.log(id,updatedheading,updatedcontent1,updatedblog_image)
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  return this.http.put(Config.api+'blog_editordelete/'+ id +'/' , JSON.stringify({
   
    "heading": updatedheading,
    "content": updatedcontent1,
    // "Ch_image": updatedblog_image,
    
  }), 
  {headers: headers}).map((response: Response) => response.json());
  }

}