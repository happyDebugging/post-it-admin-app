import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostItDetails } from '../shared/models/post-it-details.model';
import { DbFunctionService } from '../shared/services/db-functions.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Jobs } from '../shared/models/jobs.model';
import { WorkingPlaces } from '../shared/models/working-places.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: PostItDetails[] = [];

  jobSearchTypes: string[] = ['Αναζητώ Εργασία', 'Αναζητώ Εργαζόμενο'];
  jobNamesList: Jobs[] = [];
  workingPlacesList: WorkingPlaces[] = [];

  jobType: string = "";
  job: string = "";
  place: string = "";

  flagJobType: boolean = false;
  flagJob: boolean = false;
  flagPlace: boolean = false;

  getPosts: Subscription = new Subscription;

  filteredJobTypes?: any;
  filteredWorkingPlaces?: any;

  isLoadingResults: boolean = false;
  panelOpenState: boolean = true;

  constructor(private dbFunctionService: DbFunctionService) { }

  ngOnInit(): void {
    this.onGetPosts();
    this.OnFetchJobNamesFromDb();
    this.OnFetchWorkingPlacesFromDb();

    this.filteredJobTypes = this.jobNamesList;
    this.filteredWorkingPlaces = this.workingPlacesList;
  }

  applyJobFilter(evt: string) {
    evt = evt + '';
    if (!evt) this.filteredJobTypes = this.jobNamesList;
    else {
      /** uses both id and text fields for extensive filtering (case insensitive) . can be tailored for custom needs */
      this.filteredJobTypes = this.jobNamesList.filter(
        (item) =>
          item.Id + '' === evt ||
          item.JobName.toLocaleLowerCase().indexOf(evt.toLocaleLowerCase()) >= 0
      );
    }
  }

  applyPlacesFilter(evt: string) {
    evt = evt + '';
    if (!evt) this.filteredWorkingPlaces = this.workingPlacesList;
    else {
      /** uses both id and text fields for extensive filtering (case insensitive) . can be tailored for custom needs */
      this.filteredWorkingPlaces = this.workingPlacesList.filter(
        (itemm) =>
          itemm.Id + '' === evt ||
          itemm.Place.toLocaleLowerCase().indexOf(evt.toLocaleLowerCase()) >= 0
      );
    }
  }

  // public valueMapper = (key: any) => {
  //   let selection = this.jobNamesList.find((e) => {
  //     return e.id == key;
  //   });
  //   if (selection) {
  //     return selection.text;
  //   }
  //   return;
  // };

  OnFetchJobNamesFromDb() {
    this.getPosts = this.dbFunctionService.getJobsListFromAdminDb()
    .pipe(map((response: any) => {
      const jobsArray: Jobs[] = [];

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
          //console.log(res)
          const responseData = new Array<Jobs>(...res);

          for (const data of responseData) {
            const resObj = new Jobs();

            resObj.Id = data.Id;
            resObj.Category = data.Category;
            resObj.JobName = data.JobName;

            this.jobNamesList.push(resObj);

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

  OnFetchWorkingPlacesFromDb() {
    this.getPosts = this.dbFunctionService.getWorkingPlacesListFromAdminDb()
    .pipe(map((response: any) => {
      const placesArray: WorkingPlaces[] = [];

      for (const key in response) {
        if (response.hasOwnProperty(key)) {
          placesArray.push({ ...response[key], id: key })
        }
      }
      return placesArray;
    }))
    .subscribe(
      (res: any) => {
        if ((res != null) || (res != undefined)) {
          //console.log(res)
          const responseData = new Array<WorkingPlaces>(...res);

          for (const data of responseData) {
            const resObj = new WorkingPlaces();

            resObj.Id = data.Id;
            resObj.Place = data.Place;

            this.workingPlacesList.push(resObj);

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
        return postsArray;
      }))
      .subscribe(
        (res: any) => {
          if ((res != null) || (res != undefined)) {
            //console.log(res)
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
              if (resObj.JobSearchType == 'Αναζητώ Εργασία')
                resObj.Color = 'lime lighten-4';
              else
                resObj.Color = 'light-green lighten-4';

              if (resObj.JobSearchType == this.jobType)
                this.flagJobType = true;
              else
                this.flagJobType = false;

              if (resObj.JobName == this.job)
                this.flagJob = true;
              else
                this.flagJob = false;

              if (resObj.Place == this.place)
                this.flagPlace = true;
              else
                this.flagPlace = false;

              if (this.jobType == '' && this.job == '' && this.place == '') {
                if (!this.flagJobType && !this.flagJob && !this.flagPlace) {
                  postItDetails.push(resObj);
                  this.posts.push(resObj);

                  //this.flagJobType = false;
                  //this.flagJob = false;
                  //this.flagPlace = false;
                }
              }
              else if (this.jobType == '' && this.job == '') {
                if (!this.flagJobType && !this.flagJob && this.flagPlace) {
                  postItDetails.push(resObj);
                  this.posts.push(resObj);

                  //this.flagJobType = false;
                  //this.flagJob = false;
                  //this.flagPlace = false;
                }
              }
              if (this.jobType == '' && this.place == '') {
                if (!this.flagJobType && this.flagJob && !this.flagPlace) {
                  postItDetails.push(resObj);
                  this.posts.push(resObj);

                  //this.flagJobType = false;
                  //this.flagJob = false;
                  //this.flagPlace = false;
                }
              }
              if (this.job == '' && this.place == '') {
                if (this.flagJobType && !this.flagJob && !this.flagPlace) {
                  postItDetails.push(resObj);
                  this.posts.push(resObj);

                  //this.flagJobType = false;
                  //this.flagJob = false;
                  //this.flagPlace = false;
                }
              }
              else if (this.jobType == '') {
                if (!this.flagJobType && this.flagJob && this.flagPlace) {
                  postItDetails.push(resObj);
                  this.posts.push(resObj);

                  //this.flagJobType = false;
                  // this.flagJob = false;
                  // this.flagPlace = false;
                }
              }
              else if (this.job == '') {
                if (this.flagJobType && !this.flagJob && this.flagPlace) {
                  postItDetails.push(resObj);
                  this.posts.push(resObj);

                  //this.flagJobType = false;
                  //this.flagJob = false;
                  //this.flagPlace = false;
                }
              }
              else if (this.place == '') {
                if (this.flagJobType && this.flagJob && !this.flagPlace) {
                  postItDetails.push(resObj);
                  this.posts.push(resObj);

                  //this.flagJobType = false;
                  //this.flagJob = false;
                  //this.flagPlace = false;
                }
              }
              else {
                if (this.flagJobType && this.flagJob && this.flagPlace) {
                  postItDetails.push(resObj);
                  this.posts.push(resObj);

                  //this.flagJobType = false;
                  //this.flagJob = false;
                  //this.flagPlace = false;
                }
              }

            }
            //console.log(this.posts);
          }
          this.posts.reverse();
          this.isLoadingResults = false;
        },
        err => {
          //console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  async refreshResults() {
    await this.onClearLog();
    await this.onGetPosts();
    await  this.OnFetchJobNamesFromDb();
    await this.OnFetchWorkingPlacesFromDb();
  }

  onClearFilters() {
    this.jobType = '';
    this.job = '';
    this.place = '';

    this.refreshResults();
  }

  onClearLog() {
    this.posts = [];
    this.jobNamesList = [];
    this.workingPlacesList = [];
  }

  ngOnDestroy() {
    if (this.getPosts && !this.getPosts.closed) {
      this.getPosts.unsubscribe();
    }
  }

  jobCategory: string ='';
  jobbbbb: string ='';
  placeeee: string ='';

  OnPostJobsToDb() {
    let jobs = new Jobs;

    jobs.Id = this.jobNamesList.length+1;
    jobs.Category = this.jobCategory;
    jobs.JobName = this.jobbbbb;

    //console.log(postItDetails);

    this.dbFunctionService.postJobsToDb(jobs)
      // .pipe(
      //   catchError((error) => {
      //     this.isLoading = false;
      //     return of('Συνέβη κάποιο σφάλμα. Προσπαθήστε ξανά.');
      //   })
      //)
      .subscribe(
        (res: any) => {
          //console.log(res);
          if ((res != null) || (res != undefined)) {
            const responseData = new Array<Jobs>(...res);
          }
        },
        err => {
          //console.log(err);
        }
      );
  }

  OnPostPlacesToDb() {
    let placee = new WorkingPlaces;

    placee.Id = this.workingPlacesList.length+1;
    placee.Place = this.placeeee;

    //console.log(postItDetails);

    this.dbFunctionService.postPlacesToDb(placee)
      // .pipe(
      //   catchError((error) => {
      //     this.isLoading = false;
      //     return of('Συνέβη κάποιο σφάλμα. Προσπαθήστε ξανά.');
      //   })
      //)
      .subscribe(
        (res: any) => {
          //console.log(res);
          if ((res != null) || (res != undefined)) {
            const responseData = new Array<WorkingPlaces>(...res);
          }
        },
        err => {
          //console.log(err);
        }
      );
  }

  OnDeletePostFromDb(id: any){
    this.dbFunctionService.deletePostsFromDb(id).subscribe(() => {
      this.refreshResults();
    });
  }

  scrollToTopOfPage(el:  HTMLElement): void{
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }


}
