import React, { useState, useEffect } from 'react';
import Editor from './Editor';
import useLocalStorage from '../hooks/useLocalStorage'

export default function App() {
    
    const [html, setHtml] = useLocalStorage('html', ''); 
    const [css, setCss] = useLocalStorage('css', ''); 
    const [js, setJs] = useLocalStorage('js', '');
    const [srcDoc, setSrcDoc] = useState(''); 

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSrcDoc(`
                <html>
                <body>${html}</body>
                    <style>${css}</style>
                    <script>${js}</style>
                </html>
            `)
        }, 500)

        return () => clearTimeout(timeout)
        }, [html, css, js]
    ); 

    return (
        <div>
            <div className="bg-grey-200 flex h-50vh">
                <Editor language="xml" displayName="HTML" value={html} onChange={setHtml}/>
                <Editor language="css" displayName="CSS" value={css} onChange={setCss}/>
                <Editor language="javascript" displayName="JavaScript" value={js} onChange={setJs}/>
                
            </div>
            <div className="pane">
                <iframe
                    srcDoc={srcDoc}
                    title="output"
                    sandbox="allow-scripts"
                    frameBorder="0"
                    width="100%"
                    height="100%"
                />
            </div>
        </div>
    );
}
