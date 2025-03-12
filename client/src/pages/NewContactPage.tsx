import ContactForm from '../components/ContactForm'

export const NewContactPage = () => {
    return (
        <main className="flex flex-col items-center justify-center h-full">
            <h1 className="text-3xl font-bold">New Contact</h1>
            <ContactForm formType="add" />
        </main>
    )
}
