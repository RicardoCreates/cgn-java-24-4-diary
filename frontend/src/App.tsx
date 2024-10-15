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
    const [description, setDescription] = useState<string>("");


    useEffect(() => {
        axios.get("/api/diary")
            .then(response => setEntries(response.data))
            .catch(error => console.log(error));
    }, []);

    function addEntry() {
        const newEntry : Partial<Entry> = {
            description: description,
            status: "OPEN"
        };

        axios.post("/api/diary", newEntry)
            .then(response => {
                setEntries([...entries, response.data]);
                setDescription("");
            })
            .catch(error => console.log(error));
    }

    function updateEntry(id: string, updatedDescription: string) {
        const entryToUpdate = entries.find(entry => entry.id === id);

        if (!entryToUpdate) return;

        const updatedEntry = {
            id: id,
            description: updatedDescription,
            status: entryToUpdate.status
        };

        axios.put(`/api/diary/${id}`, updatedEntry)
            .then(response => {
                setEntries(entries.map(entry =>
                    entry.id === id ? response.data : entry
                ));
            })
            .catch(error => console.log(error));
    }

    function deleteEntry(id: string) {
        axios.delete(`/api/diary/${id}`)
            .then(() => {
                setEntries(entries.filter(entry => entry.id !== id))
            })
            .catch(error => console.log(error));
    }

    function handleDescriptionChange(id: string, newDescription: string) {
        setEntries(entries.map(entry =>
            entry.id === id ? {...entry, description: newDescription} : entry
        ));
    }

    function handelStatusChange(id: string, newStatus: string) {
        setEntries(entries.map(entry =>
            entry.id === id ? {...entry, status: newStatus} : entry
        ));
    }

    return(
        <>
            <h1>DiaryApp</h1>
            <ul>
                {entries.map((entry) => (
                    <li key={entry.id}>
                        <input
                            type="text"
                            value={entry.description}
                            onChange={(event) => handleDescriptionChange(entry.id, event.target.value)}
                        />
                        <select
                            value={entry.status}
                            onChange={(event) => handelStatusChange(entry.id, event.target.value)}
                        >
                            <option value={"OPEN"}>OPEN</option>
                            <option value={"IN_PROGRESS"}>IN PROGRESS</option>
                            <option value={"DONE"}>DONE</option>
                        </select>
                        <button onClick={() => updateEntry(entry.id, entry.description)}>
                            Save Changes
                        </button>
                        <button onClick={() => deleteEntry(entry.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>

            <h2>Neues Entry hinzufügen</h2>
            <input
                type={"text"}
                value={description}
                onChange={event => setDescription(event.target.value)}
                placeholder={"Entry eingeben"}
            />
            <button onClick={addEntry}>Hinzufügen</button>
        </>
    )
}
