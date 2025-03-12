import { Link, Outlet } from "react-router";

export default function App() {
    return (
        <div className="mx-auto p-6 place-items-center w-screen h-screen">
            <nav className="mb-8 absolute top-0">
                <Link to="/contacts" className="text-3xl font-bold">Crombiterate</Link>
                <div className="">
                    <Link
                        to="/contacts/new"
                        className="text-white py-2 rounded"
                    >
                        New Contact
                    </Link>
                </div>
            </nav>

            {/* main route */}
            <main className="w-5xl max-w-5xl h-full flex justify-center">
                {/* using outlet to render child components */}
                <Outlet />
            </main>
        </div>
    )
}