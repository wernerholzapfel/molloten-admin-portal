// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,
  api: 'http://localhost:3000/api/v1',
  api_domain: 'localhost:3000',
  firebase: {
    apiKey: 'AIzaSyCUxv__-yh5Od8WKj-gELaL8LXPNlxhUzk',
    authDomain: 'molloot-8de9b.firebaseapp.com',
    databaseURL: 'https://molloot-8de9b.firebaseio.com',
    projectId: 'molloot-8de9b',
    storageBucket: 'molloot-8de9b.appspot.com',
    messagingSenderId: '663216627263'
  },
  // api: 'https://molapi.herokuapp.com/api/v1'
};
