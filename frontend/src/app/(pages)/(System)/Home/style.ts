import styled from "styled-components";

export const ContainerPage = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    gap: 2rem;

    padding: 2rem;
`

export const ContainerBalance = styled.div`
    width: 100%;
    background-color: white;

    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    gap: 1rem;

    padding: 2rem 1rem 3rem 2rem;
    border-radius: 1rem;
    box-shadow: 0.5rem 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
`

export const TitleBalance = styled.h6`
    font-size: 1rem;
    color: #666666;
`

export const ValueBalance = styled.h1`
    font-size: 2rem;
    font-weight: 600;
    color: #1a237e;
`

export const Operations = styled.div`
    display: flex;
    gap: 2rem;

    .NewEntry {
        color: green;

        &:hover {
            color: #ffffff;
            background-color: green;

            h6 {
                color: white;
            }
        }
    }

    .NewExit { 
        color: red;

        &:hover {
            color: #ffffff;
            background-color: red;

            h6 {
                color: white;
            }
        }
    }

    .Transfer {
        color: #d1d3e5;

        &:hover {
            color: #ffffff;
            background-color: #d1d3e5;

            h6 {
                color: white;
            }
        }
    }
`

export const ContainerOperation = styled.div`
    flex: 1;
    background-color: white;

    display: flex;
    align-items: center;
    justify-content: start;
    gap: 1rem;

    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0.5rem 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
    cursor: pointer;

    div{
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
`

export const TitleOperation = styled.h6`
    font-size: 1.25rem;
`

export const DescriptionOperation = styled.h6`
    color: #666666;
`

export const Extract = styled.h1`
    font-size: 1.5rem;
    font-weight: 600;
    color: #333333;
`

export const Extracts = styled.div`
    max-height: 100%;
    background-color: white;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    gap: 1rem;

    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0.5rem 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);

    overflow-y: auto;
`

export const ContainerExtract = styled.div`
    width: 100%;
    background-color: #f8f8f8;

    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 1rem;

    border-radius: 1rem;
    cursor: pointer;

    div {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .Exit {
        color: red;
    }

    .Entry {
        color: green;
    }
`

export const TitleExtract = styled.h6`

`

export const DateExtract = styled.h6`
    color: #666666;
`

export const ValueExtract = styled.h6`

`