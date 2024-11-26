import { FastifyInstance } from "fastify";
import { ContactUserCase } from "../usecases/contact.usercase";
import { Contact, ContactCreate } from "../interface/contacts.interface";
import { authMiddlewares } from "../middlewares/auth.middlewares";


export async function contactRoutes(fastify: FastifyInstance) {
    const contactUserCase = new ContactUserCase();
    fastify.addHook('preHandler', authMiddlewares)
    fastify.post<{Body: ContactCreate}>('/', async (req, reply) => {
        const {email, name, phone} = req.body;
        const emailUser = req.headers['email'];
        try {
            const data =  await contactUserCase.create({email, name, phone, userEmail: emailUser});

             return reply.send(data)
        } catch (error) {
            reply.send(error);
        }
    })

    fastify.get('/', async (req, reply) => {
        const emailUser = req.headers['email'];
        try {
            const data = await contactUserCase.listAllContacts(emailUser)
            return reply.send(data)
        } catch (error) {
            reply.send(error)
        }
    })

    fastify.put<{Body: Contact, Params: {id: string}}>("/:id", async (req, reply) => {
        const {id} = req.params
        const {name, email, phone} = req.body
        try {
            const data = await contactUserCase.updateContact({
                id,
                name,
                email,
                phone
            })

            return reply.send(data)
        } catch (error) {
            reply.send(error)
        }
    })

    fastify.delete<{Params: {id: string}}>("/:id", async (req, reply) => {
        const {id} = req.params
        try {
            const data = await contactUserCase.deleteContact(id)
            return reply.send(data)

        } catch (error) {
            reply.send(error)
        }
    })
}