const connection = process.env.DB_CONNECTION;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;
const environment = process.env.NODE_ENV;

module.exports = {
  type: connection,
  host: host,
  port: parseInt(port),
  username: username,
  password: password,
  database: database,

  entities: ['dist/src/infra/database/**/*.entity.{js,ts}'],
  extra: {
    trustServerCertificate: true,
  },
  synchronize: false,

  logging: true,
  logger: 'file',

  migrationsRun: environment === 'test',
  migrationsTableName: 'migrations',
  migrations: ['dist/src/infra/database/migrations/*.{js,ts}'],
  cli: {
    migrationsDir: 'src/infra/database/migrations',
  },
  keepConnectionAlive: true,
};
