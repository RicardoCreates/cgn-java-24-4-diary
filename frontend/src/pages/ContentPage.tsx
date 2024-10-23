import styled from "styled-components";
import {Link} from "react-router-dom";


type DiaryEntry = {
    id: string;
    description: string;
    status: string;
    imageUrl?: string;
};

type ContentPageProps = {
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


export default function ContentPage({
                                        entries,
                                        handelStatusChange,
                                        handleDescriptionChange,
                                        deleteEntry,
                                        updateEntry,
                                        selectedFile,
                                        setSelectedFile,
                                        deleteImage
                                    }: ContentPageProps) {


    return (
        <ContentContainer>
            <StyledLink to="/addentry">✚</StyledLink>
            <StyledContainer>
                <StyledList>
                    {entries.map((entry) => (
                        <StyledListItem key={entry.id}>
                            <p>Diary Entry</p>
                            <InputField
                                type="text"
                                value={entry.description}
                                onChange={(event) => handleDescriptionChange(entry.id, event.target.value)}
                            />
                            <p>Steps done Today</p>
                            <StyledSelect
                                value={entry.status}
                                onChange={(event) => handelStatusChange(entry.id, event.target.value as "LESS_THAN_SIX_THOUSAND_STEPS" | "SIX_THOUSAND_STEPS" | "EIGHT_THOUSAND_STEPS" | "TEN_THOUSAND_STEPS" | "MORE_THAN_TEN_THOUSAND_STEPS")}
                            >
                                <option value="LESS_THAN_SIX_THOUSAND_STEPS">under ♿︎ 6000 STEPS</option>
                                <option value="SIX_THOUSAND_STEPS">6000 STEPS</option>
                                <option value="EIGHT_THOUSAND_STEPS">8000 STEPS</option>
                                <option value="TEN_THOUSAND_STEPS">10.000 STEPS</option>
                                <option value="MORE_THAN_TEN_THOUSAND_STEPS">over ⚡︎ 10.000 STEPS</option>
                            </StyledSelect>
                            {entry.imageUrl && <img src={entry.imageUrl} alt="Uploaded"/>}
                            <FileInputButton htmlFor={`file-upload-${entry.id}`}>Update Image</FileInputButton>
                            <HiddenFileInput
                                id={`file-upload-${entry.id}`}
                                type="file"
                                onChange={(event) => setSelectedFile(event.target.files ? event.target.files[0] : null)}
                            />
                            <FileInputButton onClick={() => deleteImage(entry.id)}>
                                Delete Image
                            </FileInputButton>
                            <Button onClick={() => updateEntry(entry.id, entry.description, selectedFile)}>
                                Save Changes
                            </Button>
                            <Button onClick={() => deleteEntry(entry.id)}>
                                Delete
                            </Button>
                        </StyledListItem>
                    ))}
                </StyledList>
            </StyledContainer>
        </ContentContainer>
    );
}

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    margin-top: 15px;
    margin-bottom: 15px;
`

const StyledContainer = styled.div`
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



const FileInputButton = styled.label`
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

const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
    font-size: 0.8rem;
    font-weight: 500;
    padding: 15px 15px;
    margin: 15px;
    box-shadow: 0 0 5px rgba(66, 165, 245, 0.5);
    transition: background-color 0.3s ease;
    position: fixed;
    bottom: 100px;
    right: 20px;

    @media (min-width: 650px) {
        font-size: 1.2rem;
        padding: 8px 16px;
    }

    &:hover {
        background-color: #34495e;
        border-radius: 5px;
    }
`;