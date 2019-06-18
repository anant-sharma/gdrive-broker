/**
 * This file contins the config
 * required to run the app
 */

/**
 * App Config
 */
export const appConfig = {
    auth: false,
    http2port: process.env.HTTP2_PORT || 21001,
    port: process.env.PORT || 21000,
};

/**
 * DB Connection
 */
export const dbConfig = {
    connectionString: process.env.dbConnectionString || '',
    // connectionString: `mongodb://<username>:<password>@chipserver.ml:27017/fleet-management?authSource=admin`,
};

/**
 * JWT Config
 */
export const jwtConfig = {
    options: {
        algorithm: 'HS256',
        expiresIn: 3600,
        issuer: 'Chipserver',
    },
    secret: 'appsecret',
};

/**
 * Paths
 */
export const paths = {
    whitelisted: ['/auth'],
};

/**
 * Google Config Keys
 */
export const googleKeys = {
    web: {
        auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
        auth_uri: 'https://accounts.google.com/o/oauth2/auth',
        client_id: '476822498363-6ij7qii21o1mmhiscf0qijiag1rf1jfh.apps.googleusercontent.com',
        client_secret: 'CuIT2qn0K0RYKUSsEJuUQu1M',
        javascript_origins: ['http://chipserver.ml'],
        project_id: 'chipserver-01',
        redirect_uris: ['http://localhost:21000/api/v1/gauth/oauth2callback', 'http://chipserver.ml/authorised'],
        token_uri: 'https://oauth2.googleapis.com/token',
    },
};

/**
 * Redis Config
 */
export const redisConfig = {
    db: 0,
    family: 4, // 4 (IPv4) or 6 (IPv6)
    host: 'redis-10411.c14.us-east-1-2.ec2.cloud.redislabs.com',
    password: 'o8axTRVc1VKVe88V45i4Cyzb4pLluBoE',
    port: 10411,
};
