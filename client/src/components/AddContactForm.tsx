import { FieldValues, useForm } from "react-hook-form";

export default function ContactForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm();

    const onSubmit = async (data: FieldValues) => {
        console.log(data);
        reset();
    }

    return (
        // form to add contacts
        <form onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-3xl flex flex-col justify-center gap-2 
        [&_input]:pb [&_input]:border-1 [&_input]:rounded-sm [&_input]:w-full [&_input]:border [&_input]:p-2 [&_input]:hover:border-gray-400 [&_input]:active:border-gray-200 [&_input]:border-2">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" {
                ...register("firstName", {
                    required: "First Name is required",
                    minLength: {
                        value: 2,
                        message: "First Name must be at least 2 characters"
                    }
                })
            } />
            {errors.firstName && (
                <span className="text-red-500">{`${errors.firstName.message}`}</span>
            )}

            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" {
                ...register("lastName", {
                    required: "Last Name is required",
                    minLength: {
                        value: 2,
                        message: "Last Name must be at least 2 characters"
                    }
                })
            } />
            {errors.lastName && (
                <span className="text-red-500">{`${errors.lastName.message}`}</span>
            )}

            <label htmlFor="email">Email</label>
            <input type="email" id="email" {
                ...register("email", {
                    required: "Email is required",
                    pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Invalid email address"
                    }
                })
            } />
            {errors.email && (
                <span className="text-red-500">{`${errors.email.message}`}</span>
            )}

            <label htmlFor="phone">Phone</label>
            <input type="tel" id="phone" />
            {errors.phone && (
                <span className="text-red-500">{`${errors.phone.message}`}</span>
            )}

            <label htmlFor="company">Company</label>
            <input type="text" id="company" />
            {errors.company && (
                <span className="text-red-500">{`${errors.company.message}`}</span>
            )}

            <label htmlFor="role">role</label>
            <input type="text" id="role" />
            {errors.role && (
                <span className="text-red-500">{`${errors.role.message}`}</span>
            )}

            <label htmlFor="notes">Notes</label>
            <input type="text" id="notes" />
            {errors.notes && (
                <span className="text-red-500">{`${errors.notes.message}`}</span>
            )}

            <button
                disabled={isSubmitting}
                type="submit"
                className="text-white px-4 py-2 rounded"
            >
                Add Contact
            </button>
        </form>
    );
}