import styled from "styled-components";
import {Link, useNavigate} from "react-router-dom";
import {
    Button,
    ContentContainer,
    FileInputButton,
    HiddenFileInput,
    InputField,
    StyledContainer
} from "./ContentPage.tsx";

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
        <ContentContainer>
            <StyledContainer>
                <h2>Add new Entry</h2>
                <InputField
                    type={"text"}
                    value={description}
                    onChange={event => setDescription(event.target.value)}
                    placeholder={"add Entry"}
                />
                <FileInputButton htmlFor="file-upload">Image Upload</FileInputButton>
                <HiddenFileInput
                    id="file-upload"
                    type="file"
                    onChange={event => setSelectedFile(event.target.files ? event.target.files[0] : null)}
                />
                <Button onClick={handleAddEntry}>Hinzufügen</Button>
                <StyledBack to="/diary">◁</StyledBack>
            </StyledContainer>
        </ContentContainer>
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


