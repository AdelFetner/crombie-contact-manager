import React, { useEffect, useState } from 'react'
import ContactForm from '../components/ContactForm'
import { Contact } from '../../lib/types';
import axios from 'axios';
import { useParams } from 'react-router';

export default function EditContactPage() {
    const { id } = useParams<{ id: string }>();
    const [contact, setContact] = useState<Contact>();

    const fetchContact = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/contacts/${id}`);

            setContact(response.data.data[0]);
        } catch (error) {
            console.error("Failed to get contact", error);
        }
    };

    // call getContact on component mount
    useEffect(() => {
        fetchContact()
    }, [])

    return (
        <main className="flex flex-col items-center justify-center h-full">
            <h1 className="text-3xl font-bold">Edit Contact</h1>
            <ContactForm formType="edit" editData={contact} />
        </main>
    )
}
