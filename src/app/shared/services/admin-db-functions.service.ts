import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AppIssues } from '../models/app-issues.model';

@Injectable()
export class AdminDbFunctionService {

    constructor(private http: HttpClient) { }

    postNewIssueToDb(issue: AppIssues) {
        let options: any = {
            //params: {BoardId: boardId, SerialNumber: serialNumber, EventTypeId: eventTypeId, MONumber: moNumber}, 
            observe: 'response'
        }
        return this.http.post(environment.postItAdminRepoURL + environment.issuesTable, issue, options);
    }

    getPostsFromDb() {
        // let options: any = {
        //     //params: {BoardId: boardId, SerialNumber: serialNumber}, 
        //     observe: 'response'
        // }
        return this.http.get<AppIssues>(environment.postItAdminRepoURL + environment.issuesTable);
    }

    // getJobsListFromAdminDb() {
    //     // let options: any = {
    //     //     //params: {BoardId: boardId, SerialNumber: serialNumber}, 
    //     //     observe: 'response'
    //     // }
    //     return this.http.get<string>(environment.postItAdminRepoURL + environment.jobNamesTable);
    // }

    // getWorkingPlacesListFromAdminDb() {
    //     // let options: any = {
    //     //     //params: {BoardId: boardId, SerialNumber: serialNumber}, 
    //     //     observe: 'response'
    //     // }
    //     return this.http.get<string>(environment.postItAdminRepoURL + environment.workingPlacesTable);
    // }

    // deletePostsFromDb(id: string) {
    //     // key = '-MpZDsQS7qi_PIv4toUL';
    //     console.log(id)
    //     const url = 'https://post-it-4f3cb-default-rtdb.europe-west1.firebasedatabase.app/posts/' + id + '.json';
    //     const httpOptions = {
    //         headers: new HttpHeaders({
    //             'Content-Type': 'application/json',
    //             Authorization: 'my-auth-token'
    //         })
    //     };

    //     return this.http.delete(url, httpOptions);
    // }

}
