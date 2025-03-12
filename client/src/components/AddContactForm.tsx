import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formSchema, TFormSchema } from "../../lib/types";
import { Loader2 } from "lucide-react"

export default function ContactForm() {
    // setts up the useForm hook from react hook form, with a zod resolver that takes an schema
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm<TFormSchema>({
        resolver: zodResolver(formSchema)
    });

    const onSubmit = async (data: TFormSchema) => {
        try {
            // TODO: send data to server
            // false api call after 2 seconds
            await new Promise((resolve) => setTimeout(resolve, 2000));
            console.log(data);
            // reset the form
            reset();
        } catch (error) {
            console.error("submit failed,", error);
        }
    }

    return (
        // form to add contacts
        <form onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-3xl flex flex-col justify-center gap-2 
        [&_input]:pb [&_input]:border-1 [&_input]:rounded-sm [&_input]:w-full [&_input]:border [&_input]:p-2 [&_input]:hover:border-gray-400 [&_input]:active:border-gray-200 [&_input]:border-2">
            {/* first name input */}
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" {
                ...register("firstName")
            } />
            {errors.firstName && (
                <span className="text-red-500">{`${errors.firstName.message}`}</span>
            )}

            {/* last name inpuit  */}
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" {
                ...register("lastName")
            } />
            {errors.lastName && (
                <span className="text-red-500">{`${errors.lastName.message}`}</span>
            )}

            {/* email input */}
            <label htmlFor="email">Email</label>
            <input type="email" id="email" {
                ...register("email")
            } />
            {errors.email && (
                <span className="text-red-500">{`${errors.email.message}`}</span>
            )}

            {/* phone input */}
            <label htmlFor="phone">Phone</label>
            <input type="tel" id="phone" {
                ...register("phone")
            } />
            {errors.phone && (
                <span className="text-red-500">{`${errors.phone.message}`}</span>
            )}

            {/* company input */}
            <label htmlFor="company">Company</label>
            <input type="text" id="company" {
                ...register("company")
            } />
            {errors.company && (
                <span className="text-red-500">{`${errors.company.message}`}</span>
            )}

            {/* role input */}
            <label htmlFor="role">role</label>
            <input type="text" id="role" {
                ...register("role")
            } />
            {errors.role && (
                <span className="text-red-500">{`${errors.role.message}`}</span>
            )}

            {/* notes input */}
            <label htmlFor="notes">Notes</label>
            <input type="text" id="notes" {
                ...register("notes")
            } />
            {errors.notes && (
                <span className="text-red-500">{`${errors.notes.message}`}</span>
            )}

            <button
                disabled={isSubmitting}
                type="submit"
                className={`text-white px-4 py-2 rounded border-1 transition-all duration-2000 ${isSubmitting ? "bg-gray-700" : "bg-blue-500 hover:bg-blue-700 active:bg-blue-800"}`}
            >
                {/* if its submitting, show a loader, if not, the normal text */}
                {isSubmitting ? (<Loader2 className="w-6 h-6 animate-spin mx-auto" />) : "Add Contact"
                }
            </button>
        </form>
    );
}