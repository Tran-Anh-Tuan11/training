import { AppDataSource } from '../database/data-source';
import { User } from './user.entity';

import { DataSource } from 'typeorm';

export class UserService {
    private dataSource: DataSource;

    constructor() {
        this.dataSource = AppDataSource; // Lấy DataSource từ AppDataSource
    }

    public async create(userData: Partial<User>) {
        const user = this.dataSource.manager.create(User, userData);
        await this.dataSource.manager.save(User, user);
        return user;
    }

    public async findAll() {
        return await this.dataSource
            .getRepository(User)
            .createQueryBuilder("user")
            .getMany();
    }

    public async findById(id: number) {
        return await this.dataSource
            .getRepository(User)
            .createQueryBuilder("user")
            .where("user.id = :id", { id })
            .getOne();
    }

    // Thêm các phương thức khác nếu cần
}
