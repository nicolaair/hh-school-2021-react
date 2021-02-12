import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useState } from 'react'
import { Button } from './Button'

const SSection = styled.section`
    max-width: 800px;
    margin-right: auto;
    margin-left: auto;

    ${({ theme }) => css`
        border: ${theme.border.width}px solid;
        border-radius: ${theme.border.radius}px;
    `}
`

const SHeader = styled.header`
    display: flex;
    justify-content: space-between;

    ${({ theme, folded }) => css`
        ${!folded ? `border-bottom: ${theme.border.width}px solid;` : ''}
        padding: ${theme.gap}px;
    `}
`

const SContainer = styled.div`
    ${({ theme, folded }) => css`
        display: ${folded ? 'none' : null};
        padding: ${theme.gap}px;
    `}
`

export const Plate = ({
    title,
    folding,
    fold = false,
    className,
    style,
    children,
}) => {
    const [folded, setFolded] = useState(!!fold);

    const handleClickFold = () => {
        setFolded(!folded)
    }

    return (
        <SSection
            className={className}
            style={style}
        >
            {title && (
                <SHeader folded={folded}>
                    <div>{title}</div>
                    {folding && (
                        <Button onClick={handleClickFold}>
                            {folded ? 'Show' : 'Hide'}
                        </Button>
                    )}
                </SHeader>
            )}
            <SContainer folded={folded}>
                {children}
            </SContainer>
        </SSection>
    )
}
