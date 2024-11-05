import {useEffect, useState} from "react";
import axios from "axios";
import {Route, Routes} from "react-router-dom";
import LandingPage from "./pages/LandingPage.tsx";
import ContentPage from "./pages/ContentPage.tsx";
import Navbar from "./components/Navbar.tsx";
import GlobalStyles from "./Globalstyles.ts";
import Footer from "./components/Footer.tsx";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute.tsx";
import AddEntry from "./pages/AddEntry.tsx";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

type Entry = {
    id: string;
    description: string;
    status: "LESS_THAN_SIX_THOUSAND_STEPS" | "SIX_THOUSAND_STEPS" | "EIGHT_THOUSAND_STEPS" | "TEN_THOUSAND_STEPS" | "MORE_THAN_TEN_THOUSAND_STEPS";
};

export default function App() {
    const [entries, setEntries] = useState<Entry[]>([]);
    const [description, setDescription] = useState<string>("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [username, setUsername] = useState<string>("")

    function login(){
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin
        window.open(host+'/oauth2/authorization/github', '_self')
    }

    function logout() {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin
        window.open(host+'/api/auth/logout', '_self')
    }


    function getMe() {
        axios.get("api/auth/me")
            .then(r => setUsername(r.data))
            .catch(() => setUsername(""))
    }

    function fetchData() {
        axios.get("/api/diary")
            .then(response => setEntries(response.data))
            .catch(error => console.log(error));
    }

    function addEntry(description: string, file: File | null) {
        const formData = new FormData();
        formData.append('description', description);
        formData.append('status', 'LESS_THAN_SIX_THOUSAND_STEPS');
        if (file) {
            formData.append('file', file);
        }

        toast.promise(
            axios.post('/api/diary', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(response => {
                    setEntries([...entries, response.data]);
                    setDescription('');
                    setSelectedFile(null);
                })
                .catch(error => console.log(error)),
            {
                pending: 'Adding is pending',
                success: 'Entry added! 👌',
                error: 'Adding rejected 🤯'
            }
        );
    }


    function updateEntry(id: string, updatedDescription: string, updatedFile: File | null) {
        const entryToUpdate = entries.find(entry => entry.id === id);

        if (!entryToUpdate) return;

        const formData = new FormData();
        formData.append('id', id);
        formData.append('description', updatedDescription);
        formData.append('status', entryToUpdate.status);

        if (updatedFile) {
            formData.append('file', updatedFile);
        }

        toast.promise(
        axios.put(`/api/diary/${id}/update`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                setEntries(entries.map(entry =>
                    entry.id === id ? response.data : entry
                ));
                setSelectedFile(null);
            })
            .catch(error => console.log(error)),
            {
                pending: 'Updating is pending',
                success: 'Entry updated! 👌',
                error: 'Updating rejected 🤯'
            }
        );
    }

    function deleteEntry(id: string) {
        toast.promise(
        axios.delete(`/api/diary/${id}`)
            .then(() => {
                setEntries(entries.filter(entry => entry.id !== id))
            })
            .catch(error => console.log(error)),
                {
                    pending: 'Deleting is pending',
                    success: 'Entry deleted! 👌',
                    error: 'Deleting rejected 🤯'
                }
            );
    }

    function handleDescriptionChange(id: string, newDescription: string) {
        setEntries(entries.map(entry =>
            entry.id === id ? {...entry, description: newDescription} : entry
        ));
    }

    function handleStatusChange(id: string, newStatus: "LESS_THAN_SIX_THOUSAND_STEPS" | "SIX_THOUSAND_STEPS" | "EIGHT_THOUSAND_STEPS" | "TEN_THOUSAND_STEPS" | "MORE_THAN_TEN_THOUSAND_STEPS") {
        setEntries(entries.map(entry =>
            entry.id === id ? {...entry, status: newStatus} : entry
        ));
    }

    function deleteImage(id: string) {
        toast.promise(
        axios.delete(`/api/diary/${id}/image`)
            .then(() => {
                setEntries(entries.map(entry =>
                    entry.id === id ? {...entry, imageUrl: undefined} : entry
                ));
            })
            .catch(error => console.log(error)),
        {
            pending: 'Deleting is pending',
                success: 'Image deleted! 👌',
            error: 'Deleting rejected 🤯'
        }
    );
    }

    useEffect(() => {
        fetchData()
        getMe()
    }, []);

    return(
        <>
            <GlobalStyles />
            <Navbar login={login} logout={logout} username={username}/>
            <Routes>
                <Route path="/" element={<LandingPage login={login} logout={logout} username={username} />} />
                <Route element={<ProtectedRoute username={username}/>}>
                <Route path="/diary" element={
                    <ContentPage
                        entries={entries}
                        description={description}
                        setDescription={setDescription}
                        handleStatusChange={handleStatusChange}
                        handleDescriptionChange={handleDescriptionChange}
                        deleteEntry={deleteEntry}
                        updateEntry={updateEntry}
                        addEntry={addEntry}
                        selectedFile={selectedFile}
                        setSelectedFile={setSelectedFile}
                        deleteImage={deleteImage}
                    />
                } />
                    <Route path="/addentry" element={
                        <AddEntry entries={entries}
                                  description={description}
                                  setDescription={setDescription}
                                  addEntry={addEntry}
                                  selectedFile={selectedFile}
                                  setSelectedFile={setSelectedFile}
                        />
                    }/>
                </Route>
            </Routes>
            <Footer />
            <ToastContainer />
        </>
    )
}
