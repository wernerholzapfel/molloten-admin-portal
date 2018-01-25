interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  // clientID: 'WNjXlR4ChTqf2azaWhPk4MPzViNqoQft',
  clientID: 'EiV9guRsd4g8R360ifx3nkIhdc1iezQD',
  domain: 'werner.eu.auth0.com',
  callbackURL: 'http://localhost:4200/callback'
  // callbackURL: 'https://molloot-admin-portal.herokuapp.com/'
};
