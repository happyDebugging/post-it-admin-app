import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AppIssues } from '../shared/models/app-issues.model';
import { AdminDbFunctionService } from '../shared/services/admin-db-functions.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  newIssueTitle: string = '';
  newIssueDescription: string ='';
  issues: AppIssues[] = [];
  isLoadingResults: boolean = false;

  constructor(private adminDbFunctionService: AdminDbFunctionService) { }

  ngOnInit(): void {
    this.OnFetchIssuesFromDb();
  }

  postIssueToDb() {
    let issue = new AppIssues;

    issue.Title = this.newIssueTitle;
    issue.Description = this.newIssueDescription;

    this.adminDbFunctionService.postNewIssueToDb(issue)
      .subscribe(
        async (res: any) => {
          //console.log(res);
          if ((res != null) || (res != undefined)) {
            //const responseData = new Array<AppIssues>(...res);
            await this.onClearTable();
          }
        },
        err => {
          //console.log(err);
        }
      );
  }

  OnFetchIssuesFromDb() {
    this.adminDbFunctionService.getPostsFromDb()
    .pipe(map((response: any) => {
      const jobsArray: AppIssues[] = [];

      for (const key in response) {
        if (response.hasOwnProperty(key)) {
          jobsArray.push({ ...response[key], id: key })
        }
      }
      return jobsArray;
    }))
    .subscribe(
      (res: any) => {
        if ((res != null) || (res != undefined)) {
          console.log(res)
          const responseData = new Array<AppIssues>(...res);

          for (const data of responseData) {
            const resObj = new AppIssues();

            resObj.id = data.id;
            resObj.Title = data.Title;
            resObj.Description = data.Description;

            this.issues.push(resObj);

          }
          //console.log(this.posts);
        }
        this.isLoadingResults = false;
      },
      err => {
        //console.log(err);
        this.isLoadingResults = false;
      }
    );
  }

  async refreshResults() {
    await this.OnFetchIssuesFromDb();
  }

  onClearTable() {
    this.issues = [];

    this.refreshResults();
  }

}
