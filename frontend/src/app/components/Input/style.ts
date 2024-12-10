import styled from "styled-components";

export const Label = styled.label`
    color: #666666;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    
    width: 100%;
`

export const TextField = styled.input`
    padding: 1rem;
    border-radius: 0.5rem;
    border: 1px solid transparent;
    background-color: #f8f8f8;
    outline: 0;
    color: #1a237e;

    &:hover{
        background-color: transparent;
        border: 1px solid #1a237e;
    }
`