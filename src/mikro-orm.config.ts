import { Task, User } from './entities'
import { __prod__ } from './constants'
import { MikroORM } from '@mikro-orm/core'
import path from 'path'

export default {
    migrations: {
        path: path.join(__dirname, './migrations'),
        pattern: /^[\w-]+\d+\.[tj]s$/
    },
    entities: [Task, User],
    dbName: 'taskbzo',
    user: 'postgres',
    password: 'postgres',
    type: 'postgresql',
    debug: !__prod__
} as Parameters<typeof MikroORM.init>[0]