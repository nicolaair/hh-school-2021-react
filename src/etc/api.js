import { apiBaseUrl } from './constants'

export const getUserRepos = async (username) => {
    const setupCustomErrors = await request(`users/${username}/repos`)

    return setupCustomErrors([[404, `User ${username} not found`]])
}

export const getRepoContributors = async (username, repo) => {
    const setupCustomErrors = await request(`repos/${username}/${repo}/contributors`)
    
    return setupCustomErrors([[404, `Repository ${repo} not found`]])
}

async function request(url, params) {
    const res = await fetch(`${apiBaseUrl}${url}`, params)
    const data = await res.json()

    return (customErrors = []) => {
        switch (res.status) {
            case 200:
                return data
            default:
                customErrors.length > 0 && customErrors.forEach(([status, message]) => {
                    if (status === res.status) {
                        throw new Error(message)
                    }
                })

                throw new Error('Something went wrong')
        }
    }
}
