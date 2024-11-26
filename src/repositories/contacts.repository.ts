import { prisma } from "../database/prisma-clients";
import { Contact, ContactCreate, ContactCreateData, ContactRepository } from "../interface/contacts.interface";


class ContactRepositoryPrisma implements ContactRepository {
    async create(data: ContactCreateData): Promise<Contact> { 
        const result = await prisma.contacts.create({
            data: {
                email: data.email,
                name: data.name,
                phone: data.phone,
                userId: data.userId
            }
        })

        return result
    } 

    async findByEmailOrPhone(
        email: string,
        phone: string,
    ): Promise <Contact | null> {
        const result = await prisma.contacts.findFirst({
            where: {
                OR: [
                    {email},
                    {phone},
                ],
            },
        });

        return result || null;
    }

    async findAllContacts(userId: string): Promise<Contact[]> {
        const data = await prisma.contacts.findMany({
            where: {
                userId,
            }
        })

        return data
    }

    async updateContact({id, name, email, phone}: Contact): Promise<Contact> {
        const updateData  = await prisma.contacts.update({
            where: {
                id,
            },
            data: {
                email,
                name,
                phone, 
            }
        })

        return updateData
    }

    async deleteContact(id: string): Promise<Boolean> {
        const deletUser = await prisma.contacts.delete({
            where: {
                id,
            }
        })

        return deletUser ? true : false
    }
}



export {ContactRepositoryPrisma}