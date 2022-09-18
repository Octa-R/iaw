import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
// https://stackoverflow.com/questions/49023507/mongoerror-cannot-do-queries-on-admin-in-atlas
// le agrege '/test' luego del host y funciona
const config = {
  name: 'MongoDB',
  connector: 'mongodb',
  url: 'mongodb+srv://octouser:YATx0uHKFD7ghu3b@cluster-personal.dcmmhbf.mongodb.net/test?retryWrites=true&w=majority',
  // database: 'cluster-personal',
  // host: 'cluster-personal.dcmmhbf.mongodb.net',
  // // port: 0,
  // user: 'octouser',
  // password: 'YATx0uHKFD7ghu3b',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MongoDbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'MongoDB';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.MongoDB', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
