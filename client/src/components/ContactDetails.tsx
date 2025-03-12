import { useParams } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import { Contact } from "../../lib/types";
import { ContactCard } from "./ContactCard";
import { Loader2 } from "lucide-react";

export default function ContactDetails() {
    // gets id from url
    const { id } = useParams<{ id: string }>();
    const [contact, setContact] = useState<Contact | null>();
    const [loading, setLoading] = useState(true);

    // fetches the contact with the given id and sets it on state
    const fetchContact = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/contacts/${id}`);

            setContact(response.data.data[0]);
        } catch (error) {
            console.error("Failed to get contact", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContact();
    }, []);

    if (loading) return <Loader2 className="w-6 h-6 animate-spin mx-auto" />;
    if (!contact) return <p>Contact not found</p>;

    return (
        <div>
            <ContactCard contact={contact} />
        </div>
    );
}