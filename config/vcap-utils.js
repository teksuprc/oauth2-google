/**
 * VCAP-UTILS.js
 * 
 */
const keys = require('./keys');

// check for VCAP_SERVICES env variable. If so, its running on PAAS so use the env variables for the oauth info.
let EnvConfig = {};

if(process.env.VCAP_SERVICES) {
    const vcap_services = JSON.parse(process.env.VCAP_SERVICES);

    EnvConfig.server = {
        port: process.env.Port || 8080
    };

    EnvConfig.logging = {
        logLocation: process.env.LogLocation || './server.log',
        timeFormat: process.env.LogFormat || 'YYYY-MM-dd HH:mm:ss',
        level: process.env.LogLevel || 'info'
    };

    EnvConfig.session = {
        maxAge: process.env.SessionMaxAge || 24 * 60 * 60 * 1000,    // 1 day
        expires: process.env.SessionExpires || 30 * 60 * 1000,        // 30 mins
        keys: ['7h3y@lll0v3rscQ7s', '7h3y@lll0v3rsd0gs'],
        name: process.env.SessionName || '3c0bar',
        domain: process.env.SessionDomain || 'localhost',
        path: process.env.SessionPath || '/',
        secure: process.env.SessionSecure || false
    };

    EnvConfig.gx = {
        client_id: vcap_services['p-identity'][0].credentials.client_id || "abcde",
        client_secret: vcap_services['p-identity'][0].credentials.client_secret || "abcde",
        callbackURL: vcap_services['p-identity'][0].credentials.callbackUrl || "/auth/gx/callback",
        authenticationURL: vcap_services['p-identity'][0].credentials.authUrl || "localhost/authorize",
        tokenURL: vcap_services['p-identity'][0].credentials.tokenUrl || "localhost/token",
        userInfoURL: vcap_services['p-identity'][0].credentials.userInfoUrl || "localhost/me"
    };
}
else {
    console.log('vcap services does not exist');
    EnvConfig.server = {
        port: 8080
    };

    EnvConfig.logging = {
        logLocation: './server.log',
        timeFormat: 'YYYY-MM-dd HH:mm:ss',
        level: 'info'
    };

    EnvConfig.session = {
        maxAge: 24 * 60 * 60 * 1000,    // 1 day
        expires: 30 * 60 * 1000,        // 30 mins
        keys: ['7h3y@lll0v3rscQ7s', '7h3y@lll0v3rsd0gs'],
        name: '3c0bar',
        domain: 'localhost',
        path: '/',
        secure: false
    };

    EnvConfig.gx = {
        client_id: keys.google.client_id || "abcde",
        client_secret: keys.google.client_secret || "abcde",
        callbackURL: keys.google.redirect_url || "/auth/gx/callback",
        authenticationURL: keys.google.auth_uri || "localhost/authorize",
        tokenURL: keys.google.token_uri || "localhost/token",
        userInfoURL: keys.google.userInfoUrl || "localhost/me"
    };
}

module.exports = EnvConfig;
