// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  
  postItRepoURL: 'https://post-it-4f3cb-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
  postItAdminRepoURL: 'https://post-it-admin-db-default-rtdb.europe-west1.firebasedatabase.app',

  jobNamesTable: '/jobNames.json',
  workingPlacesTable: '/workingPlaces.json',
  issuesTable: '/issues.json',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
