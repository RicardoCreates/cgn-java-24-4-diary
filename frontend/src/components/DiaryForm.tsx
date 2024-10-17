import {useState} from "react";
import axios from "axios";

export default function DiaryForm() {

    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [file, setFile] = useState(null);

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append('data', JSON.stringify({ description, status }));
        formData.append('file', file);

        try {
            const response = await axios.post('/api/diary', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Diary saved:', response.data);
        } catch (error) {
            console.error('Error saving diary:', error);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                />
                <input
                    type="text"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    placeholder="Status"
                />
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <button type="submit">Save Diary</button>
            </form>
        </>
    )
}