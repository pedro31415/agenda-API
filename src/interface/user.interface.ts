export interface User {
    id: string;
    name: string;
    email: string;
    createAt: Date;
    updateAt: Date;
}

export interface UserCreate {
    name: string;
    email: string;
}

export interface UserRepository {
    create(data: UserCreate): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
}