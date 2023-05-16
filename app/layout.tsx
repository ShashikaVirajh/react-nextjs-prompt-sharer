import '@styles/globals.css';
import { FC, ReactNode } from 'react';

export const metadata = {
    title: "Prompt Sharer",
    description: 'Discover & Share AI Prompts'
}

const RootLayout: FC<Props> = ({children}): JSX.Element => {
    return (
     <html>
        <body>
            <div className='main'>
                <div className='gradient' />
            </div>

            <main className="app">
                {children}
            </main>
        </body>
     </html>
    )
  }

  type Props = {
    children: ReactNode
  }
  
  export default RootLayout