import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { map } from 'rxjs/operators';
import { PostItDetails } from '../shared/models/post-it-details.model';
import { DbFunctionService } from '../shared/services/db-functions.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

  posts: PostItDetails[] = [];
  isLoadingResults: boolean = false;
  getPosts: Subscription = new Subscription;

  constructor(private dbFunctionService: DbFunctionService) { }

  ngOnInit(): void {
    this.onGetPosts();
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
          this.isLoadingResults = false;
        }},
        (err: any) => {
          //console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  ngOnDestroy() {
    if (this.getPosts && !this.getPosts.closed) {
      this.getPosts.unsubscribe();
    }
  }

}
