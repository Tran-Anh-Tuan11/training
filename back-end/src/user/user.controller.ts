import { Request, Response } from 'express';
import { UserService } from './user.services';


export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public async createUser(req: Request, res: Response) {
        const user = await this.userService.create(req.body);
        res.status(201).json(user);
    }

    public async getUsers(req: Request, res: Response) {
        const users = await this.userService.findAll();
        res.status(200).json(users);
    }

    public async getUserById(req: Request, res: Response) {
        const userId = parseInt(req.params.id);
        const user = await this.userService.findById(userId);

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    }
}
