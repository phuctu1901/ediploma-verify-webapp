import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.diploma{
   export enum TypeProgram {
      ENGINEER,
      BACHELOR,
   }

   export class Diploma extends Asset {
      diplomaId: string;
      ipfsUrl: string;
      valid: boolean;
      date: Date;
      university: University;
      student: Student;
      program: Program;
   }
   export class Program extends Asset {
      programId: string;
      title: string;
      typeProgram: TypeProgram;
   }
   export class University extends Participant {
      universityId: string;
      name: string;
   }
   export class Student extends Participant {
      studentId: string;
      firstName: string;
      lastName: string;
      email: string;
   }
   export class PublishDiploma extends Transaction {
      diploma: Diploma;
      student: Student;
   }
// }
