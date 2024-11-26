import { User, UserCreate, UserRepository } from "../interface/user.interface";
import { UserRepositoryPrisma } from "../repositories/user.repository";

class UserUserCase {
    private userRepository: UserRepository
    constructor() {
        this.userRepository = new UserRepositoryPrisma()
    }

    async create({name, email}: UserCreate): Promise<User> {
        const verifyUserExist = await this.userRepository.findByEmail(email);

        if(verifyUserExist) {
            throw new Error("User already exists");
        }
        const result = await this.userRepository.create({name, email});

        return result;
    }
}


export { UserUserCase}