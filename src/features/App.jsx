import { ThemeProvider } from '@emotion/react'
import { useState } from 'react'
import { notificationsDuration } from '../etc/constants'
import { theme } from '../etc/theme'
import { Notifier, NotifierContext } from './Notifier'
import { Reviewer, ReviewerContext } from './Reviewer'
import { Settings } from './Settings'

function App() {
  const [notifies, setNotifies] = useState([])
  const [reviewer, setReviewer] = useState(null)

  const pushNotify = (message) => {
    setNotifies((prevState) => [...prevState, message])

    setTimeout(() => {
      setNotifies(([_, ...prevState]) => prevState)
    }, notificationsDuration)
  }
  
  return (
    <ThemeProvider theme={theme}>
      <NotifierContext.Provider value={{
        notifies,
        pushNotify,
      }}>
          <ReviewerContext.Provider value={{
            reviewer,
            setReviewer,
          }}>
            <Settings />
            {reviewer && <Reviewer />}
          </ReviewerContext.Provider>
          {notifies.length > 0 && <Notifier />}
      </NotifierContext.Provider>
    </ThemeProvider>
  )
}

export default App
