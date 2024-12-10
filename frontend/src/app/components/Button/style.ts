import styled from "styled-components";

export const ButtonField = styled.button`
    width: 100%;
    border-radius: 0.5rem;
    background-color: #1a237e;
    outline: 0;
    border: 1px solid transparent;
    color: #ffffff;
    padding: 0.75rem;
    
    &:hover{
        background-color: transparent;
        border: 1px solid #1a237e;
        color: #1a237e;

        cursor: pointer;
    }
`