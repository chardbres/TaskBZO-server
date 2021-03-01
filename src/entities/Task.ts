import { Entity, PrimaryKey, Property } from '@mikro-orm/core'
import { ObjectType, Field, Int } from 'type-graphql'

@ObjectType()
@Entity()
export class Task {
    @Field(() => Int)
    @PrimaryKey()
    id!: number
    
    @Field(() => String)
    @Property()
    type: string

    @Field(() => String)
    @Property()
    location: string

    @Field(() => String)
    @Property({ type: 'date' })
    createdAt = new Date()

    @Field(() => String)
    @Property({ type: 'date', onUpdate: () => new Date() })
    updatedAt = new Date()

    @Field(() => String)
    @Property({ type: 'date'})
    dueDate = new Date()

}