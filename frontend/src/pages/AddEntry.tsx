import styled from "styled-components";
import {Link, useNavigate} from "react-router-dom";

type DiaryEntry = {
    id: string;
    description: string;
    status: string;
    imageUrl?: string;
};

type AddEntryPageProps = {
    entries: DiaryEntry[];
    description: string;
    setDescription: (value: string) => void;
    handelStatusChange: (id: string, newStatus: "LESS_THAN_SIX_THOUSAND_STEPS" | "SIX_THOUSAND_STEPS" | "EIGHT_THOUSAND_STEPS" | "TEN_THOUSAND_STEPS" | "MORE_THAN_TEN_THOUSAND_STEPS") => void;
    handleDescriptionChange: (id: string, newDescription: string) => void;
    deleteEntry: (id: string) => void;
    updateEntry: (id: string, updatedDescription: string, updatedFile: File | null) => void;
    addEntry: (description: string, file: File | null) => void;
    selectedFile: File | null;
    setSelectedFile: (file: File | null) => void;
    deleteImage: (id: string) => void;
};

export default function AddEntry({

                                     description,
                                     setDescription,

                                     addEntry,
                                     selectedFile,
                                     setSelectedFile,

                                 }: AddEntryPageProps) {
    const navigate = useNavigate();

    const handleAddEntry = () => {
        addEntry(description, selectedFile);
        navigate("/diary");
    };
    return (
        <Container>
            <Container2>
                <h2>Add new Entry</h2>
                <TextField
                    type={"text"}
                    value={description}
                    onChange={event => setDescription(event.target.value)}
                    placeholder={"add Entry"}
                />
                <InputButton htmlFor="file-upload">Image Upload</InputButton>
                <HiddenFileInput
                    id="file-upload"
                    type="file"
                    onChange={event => setSelectedFile(event.target.files ? event.target.files[0] : null)}
                />
                <AddEntryButton onClick={handleAddEntry}>Hinzufügen</AddEntryButton>
                <StyledBack to="/diary">◁</StyledBack>
            </Container2>
        </Container>
    )
}


const StyledBack = styled(Link)`
    text-decoration: none;
    color: black;
    font-size: 0.8rem;
    font-weight: 500;
    padding: 15px 15px;
    margin: 15px;
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

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    margin-top: 15px;
    margin-bottom: 15px;
`

const Container2 = styled.div`
    width: 90%;
    max-width: 800px;
    background-color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 75px;
    margin-top: 10px;
`;

const AddEntryButton = styled.button`
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

const InputButton = styled.label`
    background-color: #79b4f5;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    display: inline-block;
    margin: 10px 0;

    &:hover {
        background-color: #1e88e5;
    }

    &:active {
        background-color: #1565c0;
    }
`;

const HiddenFileInput = styled.input`
    display: none;
`;

const TextField = styled.input`
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