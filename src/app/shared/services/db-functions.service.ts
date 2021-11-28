import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PostItDetails } from '../models/post-it-details.model';
import { environment } from 'src/environments/environment';
import { Jobs } from '../models/jobs.model';
import { WorkingPlaces } from '../models/working-places.model';

@Injectable()
export class DbFunctionService {
    //postItDetails: PostItDetails;

    constructor(private http: HttpClient) { }

    getPostsFromDb() {
        // let options: any = {
        //     //params: {BoardId: boardId, SerialNumber: serialNumber}, 
        //     observe: 'response'
        // }
        return this.http.get<PostItDetails>(environment.postItRepoURL);
    }

    postNewPostToDb(postItDetails: PostItDetails) {
        let options: any = {
            //params: {BoardId: boardId, SerialNumber: serialNumber, EventTypeId: eventTypeId, MONumber: moNumber}, 
            observe: 'response'
        }
        return this.http.post(environment.postItRepoURL, postItDetails, options);
    }


    getJobsListFromAdminDb() {
        // let options: any = {
        //     //params: {BoardId: boardId, SerialNumber: serialNumber}, 
        //     observe: 'response'
        // }
        return this.http.get<string>(environment.postItAdminRepoURL + environment.jobNamesTable);
    }

    getWorkingPlacesListFromAdminDb() {
        // let options: any = {
        //     //params: {BoardId: boardId, SerialNumber: serialNumber}, 
        //     observe: 'response'
        // }
        return this.http.get<string>(environment.postItAdminRepoURL + environment.workingPlacesTable);
    }


    postJobsToDb(jobs: Jobs) {
        let options: any = {
            //params: {BoardId: boardId, SerialNumber: serialNumber, EventTypeId: eventTypeId, MONumber: moNumber}, 
            observe: 'response'
        }
        return this.http.post(environment.postItAdminRepoURL + environment.jobNamesTable, jobs, options);
    }

    postPlacesToDb(places: WorkingPlaces) {
        let options: any = {
            //params: {BoardId: boardId, SerialNumber: serialNumber, EventTypeId: eventTypeId, MONumber: moNumber}, 
            observe: 'response'
        }
        return this.http.post(environment.postItAdminRepoURL + environment.workingPlacesTable, places, options);
    }

    deletePostsFromDb(id: string) {
        // key = '-MpZDsQS7qi_PIv4toUL';
        console.log(id)
        const url = 'https://post-it-4f3cb-default-rtdb.europe-west1.firebasedatabase.app/posts/' + id + '.json';
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'my-auth-token'
            })
        };

        return this.http.delete(url, httpOptions);
    }

}
