import { DataSource } from 'typeorm';
import { Shop } from '../shop/shop.entity';
import { Customization } from '../customization/customization.entity';
import { Translation } from '../translation/translation.entity';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '1234',
    database: 'training_bss',
    synchronize: true,
    logging: false,
    entities: [Shop, Customization, Translation], //  entity
    migrations: [__dirname + '/migrations/*.ts'],
});
