import { useState, useEffect } from "react";

import { Contact } from "../../lib/types";
import axios from "axios";
import { ContactCard } from "./ContactCard";
import { Loader2 } from "lucide-react";

export default function ContactList() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // fetches all contacts and sets them on state
    const fetchContacts = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/contacts");

            setContacts(response.data.data);
            if (response.data.data.length === 0) {
                setError("No contacts found");
            }
        } catch (err) {
            setError("Failed to get contacts");
            console.error("Failed to get contacts", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    if (loading) return <Loader2 className="w-6 h-6 animate-spin mx-auto" />;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="min-h-full h-auto min-w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {contacts.map((contact) => (
                <ContactCard key={contact.id} contact={contact} />
            ))}
        </div>
    );
}