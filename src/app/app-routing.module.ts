import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalyticsComponent } from './analytics/analytics.component';
import { CommentsComponent } from './comments/comments.component';
import { PostsComponent } from './posts/posts.component';

const routes: Routes = [
  {path: 'posts', component: PostsComponent, pathMatch: 'full'},
  { path: 'anapostslytics',  component: PostsComponent}, 
  { path: 'analytics',  component: AnalyticsComponent}, 
  { path: 'comments',  component: CommentsComponent}, 
  {path: '', pathMatch: 'full', redirectTo: 'posts'},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
