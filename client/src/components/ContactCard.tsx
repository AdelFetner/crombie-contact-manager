import { useState } from 'react'
import { Contact } from '../../lib/types'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router'

export const ContactCard = ({ contact }: { contact: Contact }) => {
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleDelete = async () => {
        setLoading(true)
        try {
            const response = await axios.delete(`http://localhost:3000/api/contacts/${contact.id}`)
            if (response.status === 200) {
                // if the request is successful, reloads
                window.location.reload()
            }
        } catch (error) {
            console.error('Failed to delete contact', error)
        } finally {
            setLoading(false)
        }
    }

    const handleEdit = () => {
        // redirects to the edit page
        navigate(`/contacts/${contact.id}/edit`)
    }
    // destruct the contact
    const { firstName, lastName, email, phone, company, role, notes } = contact

    if (loading) return <Loader2 className="w-6 h-6 animate-spin mx-auto" />

    return (
        <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h1>{firstName} {lastName}</h1>
            <p>Email: {email}</p>
            <p>phone: {phone}</p>
            <p>Company: {company}</p>
            <p>Role: {role}</p>
            <p>Notes: {notes}</p>
            <button className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleDelete}>Delete</button>
            <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleEdit}>Edit</button>
        </a>
    )
}
