import { QueryRunner } from 'typeorm';
import {IDatabaseTransaction} from '../../application/interfaces/IDatabaseTransaction';
import {AppDataSource} from './DatabaseConnection';

export class DatabaseTransactions implements IDatabaseTransaction {
  private queryRunner: QueryRunner = AppDataSource.createQueryRunner();

  async startTransaction(): Promise<void> {
    await this.queryRunner.startTransaction();
  }

  async commit(): Promise<void> {
    await this.queryRunner.commitTransaction();
  }

  async rollback(): Promise<void> {
    await this.queryRunner.rollbackTransaction();
  }

  async release(): Promise<void> {
    await this.queryRunner.release();
  }

  getManager() {
    return this.queryRunner.manager;
  }
}
