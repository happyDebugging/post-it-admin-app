import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { CdkAccordionModule } from '@angular/cdk/accordion';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DbFunctionService } from './shared/services/db-functions.service';
import { NavComponent } from './nav/nav.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { CommentsComponent } from './comments/comments.component';
import { AdminDbFunctionService } from './shared/services/admin-db-functions.service';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    NavComponent,
    AnalyticsComponent,
    CommentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatTabsModule,
    MatToolbarModule,
    MatGridListModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatIconModule,
    MatPaginatorModule,
    MatExpansionModule,
    CdkAccordionModule
  ],
  providers: [
    DbFunctionService,
    AdminDbFunctionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
