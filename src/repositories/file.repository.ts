import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import { MongoDbDataSource} from '../datasources';
import {File, FileRelations} from '../models';

export class FileRepository extends DefaultCrudRepository<
  File,
  typeof File.prototype.id,
  FileRelations
> {
  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource,
  ) {
    super(File, dataSource);
  }
}
