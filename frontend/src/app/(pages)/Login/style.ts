import * as Dialog from '@radix-ui/react-dialog';
import styled from "styled-components";

export const ContainerLogin = styled.div`
    width: 100%;
    height: 100%;
`

export const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: #0b1a5c;
  overflow: hidden;

  display: flex;
  align-items: center;

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(white 1px, transparent 1px);
    background-size: 20px 20px;
    opacity: 0.1; /* Pontos brancos no fundo */
  }

  .circle {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
  }

  .circle1 {
    width: 100px;
    height: 100px;
    top: 10%;
    left: 10%;
    animation: move1 6s infinite ease-in-out alternate;
  }

  .circle2 {
    width: 150px;
    height: 150px;
    bottom: 20%;
    left: 10%;
    animation: move2 7s infinite ease-in-out alternate;
  }

  .circle3 {
    width: 50px;
    height: 50px;
    bottom: 40%;
    left: 40%;
    animation: move3 5s infinite ease-in-out alternate;
  }

  .circle4 {
    width: 80px;
    height: 80px;
    top: 30%;
    left: 30%;
    animation: move4 8s infinite ease-in-out alternate;
  }

  @keyframes move1 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(30px, -50px);
    }
  }

  @keyframes move2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(-40px, 40px);
    }
  }

  @keyframes move3 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(20px, -20px);
    }
  }

  @keyframes move4 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(-50px, 30px);
    }
  }
`;

export const BoxLogin = styled.div`
    position: absolute;
    right: 15%;
    background-color: #ffffff;
    padding: 4rem;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    form {
      width: 100%;
    }
`

export const MessageUser = styled.h1`
  font-size: 1.5rem;
  color: #666666;
  font-weight: 600;
`

export const Instructions = styled.h6`
    color: #666666;
`

export const MessageModal = styled.h6`
  width: 100%;
  font-size: 0.75rem;
  text-align: end;
  color: #0b1a5c;
`

export const StyledOverlay = styled(Dialog.Overlay)`
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    inset: 0;
    z-index: 99;
`;

export const StyledContent = styled(Dialog.Content)`
    background: white;
    border-radius: 8px;
    padding: 20px;
    width: 25rem;
    max-width: 50%;
    margin: auto;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.3);

    z-index: 99;
`;

export const StyledTitle = styled(Dialog.Title)`
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
    z-index: 99;
`;

export const StyledDescription = styled(Dialog.Description)`
    margin-bottom: 1rem;
    font-size: 1rem;
    color: #555;
    z-index: 99;
`;

export const ContentModal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const FormModal = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const ButtonCloseModal = styled.button`
    width: 100%;
    border-radius: 0.5rem;
    outline: 0;
    background-color: transparent;
    border: 1px solid red;
    color: red;
    padding: 0.75rem;
    
    &:hover{
        background-color: red;
        color: #ffffff;
        border: 1px solid red;
        cursor: pointer;
    }
`

export const MessageError = styled.span`
  font-size: 1rem;
  color: red;
`