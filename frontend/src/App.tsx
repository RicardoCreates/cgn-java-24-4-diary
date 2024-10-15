import './App.css'
import {useEffect, useState} from "react";
import axios from "axios";

type Entry = {
    id: string;
    description: string;
    status: string;
};

export default function App() {
    const [entries, setEntries] = useState<Entry[]>([]);

// Get Entries
    useEffect(() => {
        axios.get("/api/diary")
            .then(response => setEntries(response.data))
            .catch(error => console.log(error));
    }, []);

    return (
        <>
            <h1>DiaryApp</h1>
            <ul>
                {entries.map((entry) => (
                    <li key={entry.id}>{entry.description} - {entry.status}</li>
                ))}
            </ul>
        </>);
}
