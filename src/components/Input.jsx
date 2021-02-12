export const Input = ({
    className,
    style,
    type,
    value,
    defaultValue,
    placeholder,
    autoFocus,
    onChange,
    Ref,
}) => {
    return (
        <input
            className={className}
            style={style}
            type={type}
            value={value}
            defaultValue={defaultValue}
            placeholder={placeholder}
            autoFocus={autoFocus}
            onChange={onChange}
            ref={Ref}
        />
    )
}
