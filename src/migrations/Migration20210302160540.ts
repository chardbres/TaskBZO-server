import { Migration } from '@mikro-orm/migrations';

export class Migration20210302160540 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add column "mil_rank" text not null;');
  }

}
