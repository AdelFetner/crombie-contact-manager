import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import ContactForm from './components/AddContactForm.tsx'
import ContactDetails from './components/ContactDetails.tsx'
import ContactList from './components/ContactList.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        {/* router setup */}
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route path="new" element={<ContactForm />} />
                    <Route path="contacts" element={<ContactList />} />
                    <Route path="/contacts/:id" element={<ContactDetails />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>
)
