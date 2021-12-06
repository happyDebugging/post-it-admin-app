import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { map } from 'rxjs/operators';
import { ContactDetails } from '../shared/models/contact-details.model';
import { PostItDetails } from '../shared/models/post-it-details.model';
import { AdminDbFunctionService } from '../shared/services/admin-db-functions.service';
import { DbFunctionService } from '../shared/services/db-functions.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

  posts: PostItDetails[] = [];
  dbUsage: number = 0;
  userMessages: ContactDetails[] = [];
  isLoadingResults: boolean = false;
  getPosts: Subscription = new Subscription;

  constructor(private dbFunctionService: DbFunctionService, private adminDbFunctionService: AdminDbFunctionService) { }

  ngOnInit(): void {
    this.onGetPosts();
    this.onGetUserMessages();
  }

  onGetPosts() {
    this.isLoadingResults = true;

    let postItDetails = new Array<PostItDetails>();

    this.getPosts = this.dbFunctionService.getPostsFromDb()
      .pipe(map((response: any) => {
        const postsArray: PostItDetails[] = [];

        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            postsArray.push({ ...response[key], id: key })
          }
        }
        console.log(postsArray)
        return postsArray;
      }))
      .subscribe(
        (res: any) => {
          if ((res != null) || (res != undefined)) {
            console.log(res)
            const responseData = new Array<PostItDetails>(...res);

            for (const data of responseData) {
              const resObj = new PostItDetails();

              resObj.id = data.id;
              resObj.UserName = data.UserName;
              resObj.Phone = data.Phone;
              resObj.Email = data.Email;
              resObj.Notes = data.Notes;
              resObj.JobName = data.JobName;
              resObj.JobSearchType = data.JobSearchType;
              resObj.Place = data.Place;

              this.posts.push(resObj);

            //console.log(this.posts);
          }
          this.calculateDbUsage();
          this.isLoadingResults = false;
        }},
        (err: any) => {
          //console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  onGetUserMessages() {
    this.isLoadingResults = true;

    this.getPosts = this.adminDbFunctionService.getUserMessagesFromAdminDb()
      .pipe(map((response: any) => {
        const messagesArray: PostItDetails[] = [];

        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            messagesArray.push({ ...response[key], id: key })
          }
        }
        console.log(messagesArray)
        return messagesArray;
      }))
      .subscribe(
        (res: any) => {
          if ((res != null) || (res != undefined)) {
            console.log(res)
            const responseData = new Array<ContactDetails>(...res);

            for (const data of responseData) {
              const resObj = new ContactDetails();

              resObj.id = data.id;
              resObj.Type = data.Type;
              resObj.Title = data.Title;
              resObj.Description = data.Description;
              resObj.Email = data.Email;

              this.userMessages.push(resObj);

            //console.log(this.userMessages);
          }
          this.isLoadingResults = false;
        }},
        (err: any) => {
          //console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  calculateDbUsage() {
    const approximatePostSpace = '0.65'; //kB
    const usage =((+(approximatePostSpace)*this.posts.length)/1000000).toString();
    this.dbUsage = +usage;
    //this.dbUsage = (+(approximatePostSpace)*this.posts.length);
  }

  ngOnDestroy() {
    if (this.getPosts && !this.getPosts.closed) {
      this.getPosts.unsubscribe();
    }
  }

}
