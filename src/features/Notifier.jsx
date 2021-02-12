import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { createContext, useContext } from 'react'

export const NotifierContext = createContext([])

const SSection = styled.section`
    position: fixed;
    
    ${({ theme }) => css`
        right: ${theme.gap}px;
        bottom: ${theme.gap}px;
    `}
`

const SArticle = styled.article`
    ${({ theme }) => css`
        margin: ${theme.gap}px 0 0;
        border: ${theme.border.width}px solid;
        padding: ${theme.gap}px;
    `}
`

export const Notifier = () => {
    const {notifies} = useContext(NotifierContext)

    return (
        <SSection>
            {notifies.map((notify, idx) => <SArticle key={idx}>{notify}</SArticle>)}
        </SSection>
    )
}
