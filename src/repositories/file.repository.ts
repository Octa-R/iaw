import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
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

  deleteExpiredVersions(){
    // encuentra los archivos creados hace más de 30 dias
    const ONE_MONTH = 30 * 24 * 60 * 60 * 1000;
    this.find({ where:
      { creationDate:
        {
          lt: Date.now() - ONE_MONTH
        }
      }
    })
  }
}
