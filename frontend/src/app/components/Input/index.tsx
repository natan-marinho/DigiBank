import { Label, TextField } from "./style";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    TextPlaceholder: string;
    TextLabel: string;
}

export default function Input({ TextPlaceholder, TextLabel, ...rest }: InputProps) {
    return (
        <Label>
            {TextLabel}
            <TextField placeholder={TextPlaceholder} {...rest} />
        </Label>
    );
}
