import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useEffect, useState, useRef, useContext } from 'react'
import { Button } from '../components/Button'
import { InputText } from '../components/InputText'
import { Plate } from '../components/Plate'
import { Select } from '../components/Select'
import { getRepoContributors, getUserRepos } from '../etc/api'
import { debounceTimeInput, listItemsDelimiter, initialSettings } from '../etc/constants'
import { debounce, randomInteger } from '../etc/utils'
import { NotifierContext } from './Notifier'
import { ReviewerContext } from './Reviewer'

const SPlate = styled(Plate)`
    ${({ theme }) => css`
        margin-top: ${theme.gap * 2}px;
    `}
`

const [initialUsername, initialRepos, initialIgnoreList] = initialSettings

const toLocalStorage = (ignoreList, username, repoAsString) => {
    localStorage.setItem('settings-ignore-list', JSON.stringify(ignoreList))
    localStorage.setItem('settings-username', username)
    localStorage.setItem('settings-repo', repoAsString)
}

const fromLocalStorage = () => ({
    cachedUsername: localStorage.getItem('settings-username'),
    cachedIgnoreList: localStorage.getItem('settings-ignore-list'),
    cachedRepo: localStorage.getItem('settings-repo'),
})

export const Settings = () => {
    const [username, setUsername] = useState(initialUsername)
    const [repos, setRepos] = useState(initialRepos)
    const { setReviewer } = useContext(ReviewerContext)
    const { pushNotify } = useContext(NotifierContext)
    const refIgnoreList = useRef(null)
    const refRepo = useRef(null)
    
    const throttledUsernameChange = useRef(debounce(async (username) => {
        try {
            const obtainedRepos = await getUserRepos(username.trim())

            setRepos(obtainedRepos)
        } catch ({ message }) {
            setRepos([])
            setReviewer(null)

            pushNotify(message)
        }
    }, debounceTimeInput))

    useEffect(() => {
        const elementIgnoreList = refIgnoreList.current
        const elementRepo = refRepo.current
        const { cachedUsername, cachedIgnoreList, cachedRepo } = fromLocalStorage()

        cachedUsername && setUsername(cachedUsername)
        
        if (elementIgnoreList && cachedIgnoreList) {
            elementIgnoreList.value = JSON.parse(cachedIgnoreList).join(listItemsDelimiter)
        }

        if (elementRepo && cachedRepo) {
            const repo = JSON.parse(cachedRepo)

            setRepos([{ id: repo.id, name: repo.name }])
        }
    }, [])

    useEffect(() => {
        username && throttledUsernameChange.current(username)
    }, [username])

    const handleUsernameChange = ({ target }) => {
        setUsername(target.value)
    }

    const handleGenerateClick = async () => {
        try {
            const elementIgnoreList = refIgnoreList.current
            const elementRepo = refRepo.current
            const ignoreList = elementIgnoreList.value.split(listItemsDelimiter)
            const repoAsString = elementRepo.value

            toLocalStorage(ignoreList, username, repoAsString)

            if (!username) {
                throw new Error('Username not entered')
            }

            if (!repoAsString) {
                throw new Error('Repository not selected')
            }

            const repo = JSON.parse(repoAsString)
            const obtainedContributors = await getRepoContributors(username, repo.name)
            const filteredContributors = obtainedContributors.filter((contributor) => !ignoreList.includes(contributor.login))
            const idx = randomInteger(0, filteredContributors.length - 1)

            setReviewer(filteredContributors[idx])
        } catch (error) {
            setReviewer(null)

            pushNotify(error.message)
        }
    }

    return (
        <SPlate
            title="Settings"
            folding={true}
        >
            <InputText
                defaultValue={initialIgnoreList}
                placeholder="Manage ignore list"
                Ref={refIgnoreList}
            />
            <InputText
                value={username}
                placeholder="Enter Github username"
                onChange={handleUsernameChange}
            />
            <Select Ref={refRepo}>
                {repos.map((repo) => (
                    <option
                        key={repo.id}
                        value={JSON.stringify({
                            id: repo.id,
                            name: repo.name,
                        })}
                    >
                        {repo.name}
                    </option>
                ))}
            </Select>
            <Button onClick={handleGenerateClick}>Generate</Button>
        </SPlate>
    )
}
