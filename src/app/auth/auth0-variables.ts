interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: 'WNjXlR4ChTqf2azaWhPk4MPzViNqoQft',
  domain: 'werner.eu.auth0.com',
  callbackURL: 'http://localhost:4200/callback'
};
