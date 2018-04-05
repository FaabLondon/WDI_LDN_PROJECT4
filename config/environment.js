const env = process.env.NODE_ENV || 'dev';
const port = process.env.PORT || 4000;
const dbURI = process.env.MONGODB_URI || `mongodb://localhost/rentastyle-${env}`;
const secret = process.env.SECRET || 'a^yd%2GH!)zI*_4fsQ';

module.exports = { env, port, dbURI, secret };
