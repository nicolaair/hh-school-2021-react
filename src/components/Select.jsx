export const Select = ({
    disabled,
    placeholder,
    children,
    Ref,
}) => {
    return (
        <select
            disabled={disabled}
            ref={Ref}
        >
            {children}
        </select>
    )
}
