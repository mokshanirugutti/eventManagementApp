import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { ThemeProvider } from './components/theme-provider'
import { UserProvider } from './context/UserContext.tsx'
createRoot(document.getElementById('root')!).render(
  
      <UserProvider>
         <ThemeProvider>
         <App />
         </ThemeProvider>
      </UserProvider>
  
)
