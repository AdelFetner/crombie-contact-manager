import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import ContactDetails from './components/ContactDetails.tsx'
import ContactList from './components/ContactList.tsx'
import { NewContactPage } from './pages/newContactPage.tsx'
import EditContactPage from './pages/editContactPage.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        {/* router setup */}
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>

                    {/* pages for new and edit form */}
                    <Route path="contacts/new" element={< NewContactPage />} />
                    <Route path="contacts/:id/edit" element={<EditContactPage />} />

                    {/* route all contacts */}
                    <Route path="contacts" element={<ContactList />} />

                    <Route path="/contacts/:id" element={<ContactDetails />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>
)
