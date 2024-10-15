import styled from "styled-components";
import {Link} from "react-router-dom";

type DiaryEntry = {
    id: string;
    description: string;
    status: string;
};

type ContentPageProps = {
    entries: DiaryEntry[];
    description: string;
    setDescription: (value: string) => void;
    handelStatusChange: (id: string, newStatus: "LESS_THAN_SIX_THOUSAND_STEPS" | "SIX_THOUSAND_STEPS" | "EIGHT_THOUSAND_STEPS" | "TEN_THOUSAND_STEPS" | "MORE_THAN_TEN_THOUSAND_STEPS") => void;
    handleDescriptionChange: (id: string, newDescription: string) => void;
    deleteEntry: (id: string) => void;
    updateEntry: (id: string, updatedDescription: string) => void;
    addEntry: () => void;
};


export default function ContentPage({
                                        entries,
                                        description,
                                        setDescription,
                                        handelStatusChange,
                                        handleDescriptionChange,
                                        deleteEntry,
                                        updateEntry,
                                        addEntry
                                    }: ContentPageProps) {
    return (
        <ContentContainer>
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
                            <Button onClick={() => updateEntry(entry.id, entry.description)}>
                                Save Changes
                            </Button>
                            <Button onClick={() => deleteEntry(entry.id)}>
                                Delete
                            </Button>
                        </StyledListItem>
                    ))}
                </StyledList>

                <h2>Neues Entry hinzufügen</h2>
                <InputField
                    type={"text"}
                    value={description}
                    onChange={event => setDescription(event.target.value)}
                    placeholder={"Entry eingeben"}
                />
                <Button onClick={addEntry}>Hinzufügen</Button>
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