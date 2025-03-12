import { Contact } from '../../lib/types'

export const ContactCard = ({ contact }: { contact: Contact }) => {
    // destruct the contact
    const { firstName, lastName, email, phone, company, role, notes } = contact
    return (
        <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h1>{firstName} {lastName}</h1>
            <p>Email: {email}</p>
            <p>phone: {phone}</p>
            <p>Company: {company}</p>
            <p>Role: {role}</p>
            <p>Notes: {notes}</p>
        </a>
    )
}
