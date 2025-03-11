
export default function ContactForm() {
    return (
        // form to add contacts
        <form className="w-full max-w-3xl flex flex-col justify-center gap-2 
        [&_input]:pb [&_input]:border-1 [&_input]:rounded-sm [&_input]:w-full [&_input]:border [&_input]:p-2 [&_input]:hover:border-gray-400 [&_input]:active:border-gray-200 [&_input]:border-2">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" />

            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" />

            <label htmlFor="email">Email</label>
            <input type="email" id="email" />

            <label htmlFor="phone">Phone</label>
            <input type="tel" id="phone" />

            <label htmlFor="company">Company</label>
            <input type="text" id="company" />

            <label htmlFor="role">role</label>
            <input type="text" id="role" />

            <label htmlFor="notes">Notes</label>
            <input type="text" id="notes" />

            <button
                type="submit"
                className="text-white px-4 py-2 rounded"
            >
                Add Contact
            </button>
        </form>
    );
}