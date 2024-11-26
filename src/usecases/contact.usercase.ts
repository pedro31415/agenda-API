import { Contact, ContactCreate, ContactRepository } from "../interface/contacts.interface";
import { UserRepository } from "../interface/user.interface";
import { ContactRepositoryPrisma } from "../repositories/contacts.repository";
import { UserRepositoryPrisma } from "../repositories/user.repository";

class ContactUserCase {
    private userRepository: UserRepository
    private contactRepository: ContactRepository
    constructor() {
        this.contactRepository = new ContactRepositoryPrisma();
        this.userRepository = new UserRepositoryPrisma();
    }

    async create({email, name, phone, userEmail} : ContactCreate)  {
        
        const user = await this.userRepository.findByEmail(userEmail)

        if(!user) {
            throw new Error("User not found");
        }

        const verifyExistContact =  await this.contactRepository.findByEmailOrPhone(email,phone);

        if (verifyExistContact) {
            throw new Error("Contact already exists");
        }

        const contact = await this.contactRepository.create({
            email,
            name,
            phone,
            userId: user.id,
        });

        return contact
    }

    async listAllContacts(userEmail: string) {
        const user = await this.userRepository.findByEmail(userEmail)

        if(!user) {
            throw new Error("User not found");
        }

        const contacts = await this.contactRepository.findAllContacts(user.id)

        return contacts
    }


    async updateContact({id, name, email, phone}: Contact) {
        const data = await this.contactRepository.updateContact({id,name,email,phone})

        return data
    }

    async deleteContact(id: string) {
        const data = await this.contactRepository.deleteContact(id)

        return data
    }

}


export {ContactUserCase}