import {ChangeEvent, FormEvent, useState} from "react";
import axios from "axios";

export default function ImageUpload(){
    const [json, setJson] = useState<{title: string}>({title: ""})
    const [image, setImage] = useState<File>()
    const [imageUrl, setImageUrl] = useState<string>("")

    function onFileChange(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.files) {
            setImage(event.target.files[0])
        }
    }

    function submitForm(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const data: FormData = new FormData()

        if (image) {
            data.append("file", image)
        }

        data.append("data", new Blob([JSON.stringify(json)], {'type': "application/json"}))

        axios.post('/api/images', data, {headers: { "Content-Type": "multipart/form-data"}})
            .then(response => {
                setImageUrl(response.data)
            })
            .catch(console.error)
    }

    return (
        <div className="App">
            <form onSubmit={submitForm}>
                <input type='text' value={json.title} onChange={event => setJson(prevState => ({...prevState, title: event.target.value}))}/>
                <input type='file' onChange={onFileChange}/>
                <button type='submit'>Save</button>
            </form>
            {imageUrl && <img src={imageUrl} alt="Uploaded" />}
        </div>
    );
}
