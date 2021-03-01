import { Migration } from '@mikro-orm/migrations';

export class Migration20210227145504 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "task" ("id" serial primary key, "type" varchar(255) not null, "location" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "due_date" timestamptz(0) not null);');
  }

}
