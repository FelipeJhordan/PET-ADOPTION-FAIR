const connection = process.env.DB_CONNECTION;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;

module.exports = {
  type: connection,
  host: host,
  port: port,
  username: username,
  password: password,
  database: database,

  entities: ['dist/infra/database/**/*.entity.js'],

  synchronize: false,

  logging: true,
  logger: 'file',

  migrationsTableName: 'migrations',
  migrations: ['dist/infra/database/migrations/*.js'],
  cli: {
    migrationsDir: 'src/infra/database/migrations',
  },
};
