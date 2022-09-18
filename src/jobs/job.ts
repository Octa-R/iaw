import {CronJob, cronJob} from '@loopback/cron';
import {repository} from '@loopback/repository';
import {File} from '../models';
import {FileRepository} from '../repositories';
// la idea es mostrar cada 10 segundos los files
@cronJob()
export class Job extends CronJob {
 constructor(@repository(FileRepository) public fileRepository: FileRepository,) {
   super({
     name: 'job-B', onTick: async () => {
       let files: File[] = await fileRepository.find();
       // se podria hacer que cada dia el job ejecute este metodo y que el repositorio borre
       // los archivos de más de 30 días
      //  await fileRepository.deleteExpiredVersions();
       console.log(new Date());
       console.log(files);
     },
     cronTime: '*/10 * * * * *',
     start: true,
   });}}
