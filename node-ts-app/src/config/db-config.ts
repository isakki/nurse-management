import { DataSource } from 'typeorm';
import { join } from 'path';
import dotenv from 'dotenv';

dotenv.config();

export const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.MYSQL_HOST || 'localhost',
    port: parseInt(process.env.MYSQL_PORT || '3306', 10),
    username: process.env.MYSQL_USERNAME || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || '',
    entities: [join(__dirname, '../model/entities/*{.ts,.js}')],
    synchronize: true
});

export default async function getDataSource(): Promise<DataSource> {
    if (!dataSource.isInitialized) {
        await dataSource.initialize()
            .then(() => {
                console.log("Data Source has been initialized!");
            })
            .catch((err: any) => {
                console.error("Error during Data Source initialization", err);
                throw err;
            });
    }
    return dataSource;
}
