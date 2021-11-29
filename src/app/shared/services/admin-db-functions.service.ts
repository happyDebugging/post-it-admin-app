import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AppIssues } from '../models/app-issues.model';
import { ContactDetails } from '../models/contact-details.model';

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

    getUserMessagesFromAdminDb() {
        // let options: any = {
        //     //params: {BoardId: boardId, SerialNumber: serialNumber}, 
        //     observe: 'response'
        // }
        return this.http.get<ContactDetails>(environment.postItAdminRepoURL + environment.contactMessagesTable);
    }

}
