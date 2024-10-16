import styled from "styled-components";
import { Link } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";

type DiaryEntry = {
    id?: string;
    description: string;
    status: string;
    imageUrl?: string;
};

type ContentPageProps = {
    entries: DiaryEntry[];
    setEntries: (entries: DiaryEntry[]) => void;
    description: string;
    setDescription: (value: string) => void;
    handelStatusChange: (id: string, newStatus: "LESS_THAN_SIX_THOUSAND_STEPS" | "SIX_THOUSAND_STEPS" | "EIGHT_THOUSAND_STEPS" | "TEN_THOUSAND_STEPS" | "MORE_THAN_TEN_THOUSAND_STEPS") => void;
    handleDescriptionChange: (id: string, newDescription: string) => void;
    deleteEntry: (id: string) => void;
    updateEntry: (id: string, updatedEntry: Partial<DiaryEntry>) => void;
};

export default function ContentPage({
                                        entries,
                                        setEntries,
                                        description,
                                        setDescription,
                                        handelStatusChange,
                                        handleDescriptionChange,
                                        deleteEntry,
                                        updateEntry
                                    }: ContentPageProps) {
    const [image, setImage] = useState<File>();

    function onFileChange(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.files) {
            setImage(event.target.files[0]);
        }
    }

    function submitForm(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data: FormData = new FormData();

        if (image) {
            data.append("file", image);
        }

        const newEntry: Partial<DiaryEntry> = {
            description: description,
            status: "LESS_THAN_SIX_THOUSAND_STEPS"
        };

        data.append("data", new Blob([JSON.stringify(newEntry)], { type: "application/json" }));

        axios.post('/api/diary', data, { headers: { "Content-Type": "multipart/form-data" } })
            .then(response => {
                setEntries([...entries, response.data]);
                setDescription("");
            })
            .catch(console.error);
    }

    function handleUpdateEntry(id: string, updatedDescription: string) {
        const data: FormData = new FormData();

        if (image) {
            data.append("file", image);
        }

        const updatedEntry: Partial<DiaryEntry> = {
            description: updatedDescription,
            status: "LESS_THAN_SIX_THOUSAND_STEPS"
        };

        data.append("data", new Blob([JSON.stringify(updatedEntry)], { type: "application/json" }));

        axios.put(`/api/diary/${id}`, data, { headers: { "Content-Type": "multipart/form-data" } })
            .then(response => {
                const updatedEntries = entries.map(entry => entry.id === id ? response.data : entry);
                setEntries(updatedEntries);
            })
            .catch(console.error);
    }

    return (
        <ContentContainer>
            <StyledContainer>
                <StyledList>
                    {entries.map((entry) => (
                        <StyledListItem key={entry.id}>
                            <p>{entry.description}</p>
                            {entry.imageUrl && <img src={entry.imageUrl} alt="Entry" />}
                            <InputField
                                type="text"
                                value={entry.description}
                                onChange={event => handleDescriptionChange(entry.id!, event.target.value)}
                            />
                            <StyledSelect
                                value={entry.status}
                                onChange={event => handelStatusChange(entry.id!, event.target.value as any)}
                            >
                                <option value="LESS_THAN_SIX_THOUSAND_STEPS">Less than 6000 steps</option>
                                <option value="SIX_THOUSAND_STEPS">6000 steps</option>
                                <option value="EIGHT_THOUSAND_STEPS">8000 steps</option>
                                <option value="TEN_THOUSAND_STEPS">10000 steps</option>
                                <option value="MORE_THAN_TEN_THOUSAND_STEPS">More than 10000 steps</option>
                            </StyledSelect>
                            <Button onClick={() => handleUpdateEntry(entry.id!, entry.description)}>
                                Save Changes
                            </Button>
                            <Button onClick={() => deleteEntry(entry.id!)}>
                                Delete
                            </Button>
                        </StyledListItem>
                    ))}
                </StyledList>

                <h2>Neues Entry hinzufügen</h2>
                <form onSubmit={submitForm}>
                    <InputField
                        type="text"
                        value={description}
                        onChange={event => setDescription(event.target.value)}
                        placeholder="Entry eingeben"
                    />
                    <input type='file' onChange={onFileChange} />
                    <Button type="submit">Hinzufügen</Button>
                </form>
                <StyledLink to="/">Go Back</StyledLink>
            </StyledContainer>
        </ContentContainer>
    );
}

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    margin-bottom: 80px;
`;

const StyledContainer = styled.div`
    width: 90%;
    max-width: 800px;
    background-color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StyledList = styled.ul`
    list-style-type: none;
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
    background-color: transparent;
`;

const StyledListItem = styled.li`
    padding: 15px;
    margin: 10px;
    transition: background-color 0.2s ease;

    &:last-child {
        border-bottom: 10px;
    }

    p {
        margin: 5px 0;
        font-size: 16px;
        color: black;
    }

    img {
        max-width: 100%;
        height: auto;
        margin: 10px 0;
    }
`;

const Button = styled.button`
    background-color: transparent;
    color: #303030;
    padding: 5px 10px;
    border: 0.5px solid #303030;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;

    &:hover {
        background-color: rgba(144, 202, 249, 0.1);
    }

    &:active {
        background-color: rgba(144, 202, 249, 0.2);
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    }
`;

const InputField = styled.input`
    width: 90%;
    padding: 12px;
    margin: 12px 0;
    border: 0.5px solid #303030;
    border-radius: 5px;

    &:focus {
        outline: none;
        border-color: #42a5f5;
        box-shadow: 0 0 5px rgba(66, 165, 245, 0.5);
    }
`;

const StyledSelect = styled.select`
    width: 95%;
    padding: 12px;
    margin: 12px 0;
    border: 0.5px solid #303030;
    border-radius: 5px;
    background-color: white;
    color: #303030;
    cursor: pointer;

    &:focus {
        outline: none;
        border-color: #606060;
        box-shadow: 0 0 5px rgba(66, 165, 245, 0.5);
    }

    option {
        color: #303030;
        background-color: white;
    }
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
    font-size: 0.8rem;
    font-weight: 500;
    padding: 4px 2px;
    margin: 20px;
    box-shadow: 0 0 5px rgba(66, 165, 245, 0.5);
    transition: background-color 0.3s ease;

    @media (min-width: 650px) {
        font-size: 1.2rem;
        padding: 8px 16px;
    }

    &:hover {
        background-color: #34495e;
        border-radius: 5px;
    }
`;