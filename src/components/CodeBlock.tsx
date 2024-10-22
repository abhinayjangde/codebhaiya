"use client"
import React, { useEffect } from 'react'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import "prismjs/components/prism-python"

interface CodeBlockProps {
    code: string;
    language: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
    useEffect(() => {
    Prism.highlightAll();
    }, []);

    return (
        <pre>
            <code className={`language-${language} m-0`}>
                {code}
            </code>
        </pre>
    );
};

export default CodeBlock;
