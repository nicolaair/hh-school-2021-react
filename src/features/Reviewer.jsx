import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { createContext, useContext } from 'react'
import { Plate } from '../components/Plate'

export const ReviewerContext = createContext([])

const SPlate = styled(Plate)`
    ${({ theme }) => css`
        margin-top: ${theme.gap * 2}px;
    `}
`

const SLogin = styled.div`
    ${({ theme }) => css`
        margin-bottom: ${theme.gap}px;
    `}
`

export const Reviewer = () => {
    const {reviewer} = useContext(ReviewerContext)

    return (
        <SPlate title="Reviewer">
            <SLogin>{reviewer.login}</SLogin>
            <div>
                <img src={reviewer.avatar_url} alt={reviewer.login} />
            </div>
        </SPlate>
    )
}
