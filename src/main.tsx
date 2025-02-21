import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Theme } from "@radix-ui/themes";
import { ThemeProvider } from "next-themes";
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Theme
        grayColor="sage"
        radius="large"
      >
        <App />
      </Theme>
    </ThemeProvider>
  </StrictMode>,
)
