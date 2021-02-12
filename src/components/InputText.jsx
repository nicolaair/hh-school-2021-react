import { Input } from './Input'

export const InputText = ({
    className,
    style,
    value,
    defaultValue,
    placeholder,
    autoFocus,
    onChange,
    Ref,
}) => {
    return (
        <Input
            className={className}
            style={style}
            type="text"
            value={value}
            defaultValue={defaultValue}
            placeholder={placeholder}
            autoFocus={autoFocus}
            onChange={onChange}
            Ref={Ref}
        />
    )
}
