import React from "react";

interface CodeBlockProps {
    code?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
    return (
        <pre className="w-full max-w-full overflow-x-auto rounded-xl bg-gray-800 p-4 text-white">
            <code className="block max-w-full whitespace-pre">{code}</code>
        </pre>
    );
};

export default CodeBlock;
