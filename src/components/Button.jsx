export const Button = ({
    className,
    style,
    children,
    onClick,
}) => {
    return (
        <button
            className={className}
            style={style}
            onClick={onClick}
        >
            {children}
        </button>
    )
}
