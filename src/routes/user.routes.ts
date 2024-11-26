import { FastifyInstance } from "fastify";
import { UserUserCase } from "../usecases/user.usercase";
import { UserCreate } from "../interface/user.interface";


export async function userRoutes(fastify: FastifyInstance) {
    const userUserCase = new UserUserCase();
    fastify.post<{Body: UserCreate}>('/', async (req, reply) => {
        const {name, email} = req.body;
        try {
            const data =  await userUserCase.create({
                name,
                email,
            });

             return reply.send(data)
        } catch (error) {
            reply.send(error);
        }
    })

    fastify.get('/', (req, reply) => {
        reply.send({hello: "World"})
    })
}