import { ButtonField } from "./style";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
}

export default function Button({ text, ...rest }: ButtonProps) {
    return (
        <ButtonField {...rest}>
            {text}
        </ButtonField>
    );
}
