import styled from "styled-components";
import {Link} from "react-router-dom";
import {useState} from "react";


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
    handleStatusChange: (id: string, newStatus: "LESS_THAN_SIX_THOUSAND_STEPS" | "SIX_THOUSAND_STEPS" | "EIGHT_THOUSAND_STEPS" | "TEN_THOUSAND_STEPS" | "MORE_THAN_TEN_THOUSAND_STEPS") => void;
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
                                        handleStatusChange,
                                        handleDescriptionChange,
                                        deleteEntry,
                                        updateEntry,
                                        selectedFile,
                                        setSelectedFile,
                                        deleteImage
                                    }: ContentPageProps) {
const [searchTerm, setSearchTerm] = useState("");

    return (
        <ContentContainer>
            <SearchInput
                type="text"
                placeholder="️‍👁️‍🗨️ Search entries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <StyledAdd to="/addentry">✚</StyledAdd>
            <StyledContainer>
                <StyledList>
                    {entries
                        .filter(entry => entry.description.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map((entry) => (
                            <StyledListItem key={entry.id}>
                            <p>Diary Entry</p>
                                <StyledTextarea
                                    value={entry.description}
                                    onChange={(event) => handleDescriptionChange(entry.id, event.target.value)}
                                />
                            <p>Steps done Today</p>
                            <StyledSelect
                                value={entry.status}
                                onChange={(event) => handleStatusChange(entry.id, event.target.value as "LESS_THAN_SIX_THOUSAND_STEPS" | "SIX_THOUSAND_STEPS" | "EIGHT_THOUSAND_STEPS" | "TEN_THOUSAND_STEPS" | "MORE_THAN_TEN_THOUSAND_STEPS")}
                            >
                                <option value="LESS_THAN_SIX_THOUSAND_STEPS">under ♿︎ 6000 STEPS</option>
                                <option value="SIX_THOUSAND_STEPS">6000 STEPS</option>
                                <option value="EIGHT_THOUSAND_STEPS">8000 STEPS</option>
                                <option value="TEN_THOUSAND_STEPS">10.000 STEPS</option>
                                <option value="MORE_THAN_TEN_THOUSAND_STEPS">over ⚡︎ 10.000 STEPS</option>
                            </StyledSelect>
                            {entry.imageUrl && <img src={entry.imageUrl} alt="Uploaded"/>}
                            <br/>
                            <FileInputButton htmlFor={`file-upload-${entry.id}`}>📂</FileInputButton>
                            <HiddenFileInput
                                id={`file-upload-${entry.id}`}
                                type="file"
                                onChange={(event) => setSelectedFile(event.target.files ? event.target.files[0] : null)}
                            />
                            <FileInputButton onClick={() => deleteImage(entry.id)}>
                                🗑️
                            </FileInputButton>
                            <br/>
                            <Button onClick={() => updateEntry(entry.id, entry.description, selectedFile)}>
                                Save Changes
                            </Button>
                            <Button onClick={() => deleteEntry(entry.id)}>
                                Delete Entry
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
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    //margin-top: 15px;
    margin-bottom: 15px;
`;

const StyledContainer = styled.div`
    width: 90%;
    max-width: 800px;
    //background-color: white;
    background-color: ${({ theme }) => theme.inputBackground};
    color: ${({ theme }) => theme.text};
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
        //color: black;
        color: ${({ theme }) => theme.text};
    }
`;

const Button = styled.button`
    background-color: ${({ theme }) => theme.buttonBackground};
    color: ${({ theme }) => theme.text};
    padding: 5px 10px;
    border: 0.5px solid ${({ theme }) => theme.borderColor};
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    margin: 5px;

    &:hover {
        background-color: ${({ theme }) => theme.buttonHover};
    }
`;

const StyledTextarea = styled.textarea`
    width: 90%;
    height: 75px;
    padding: 12px;
    margin: 12px 0;
    border: 0.5px solid #303030;
    border-radius: 5px;
    resize: vertical;
    font-family: sans-serif;

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
    background-color: transparent;
    color: white;
    padding: 5px 10px;
    border: 0.5px solid #303030;
    border-radius: 5px;
    cursor: pointer;
    display: inline-block;
    margin: 10px;

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

const StyledAdd = styled(Link)`
    text-decoration: none;
    position: fixed;
    bottom: 100px;
    right: 10px;
    border: 0.5px solid #303030;
    border-radius: 5px;
    padding: 15px;
    margin: 10px;
    color: ${({ theme }) => theme.text};

    @media (min-width: 800px) {
        right: 20%;
    }
`;

const SearchInput = styled.input`
    width: 80%;
    max-width: 800px;
    padding: 12px;
    margin-top: 15px;
    background-color: ${({ theme }) => theme.inputBackground};
    color: ${({ theme }) => theme.text};
    border: 0.5px solid ${({ theme }) => theme.borderColor};
    border-radius: 5px;

    &:focus {
        outline: none;
        border-color: #42a5f5;
        box-shadow: 0 0 5px rgba(66, 165, 245, 0.5);
    }
`;