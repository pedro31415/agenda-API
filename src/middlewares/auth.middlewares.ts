import { FastifyReply, FastifyRequest } from "fastify";

export async function authMiddlewares(req: FastifyRequest, reply: FastifyReply) {
    const apiEmail = req.headers['email'];

    if (!apiEmail) {
        reply.status(401).send({
            message: "Email is required",
        })
    }
}