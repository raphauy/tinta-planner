
interface CodeBlockProps {
  code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  return (
    <div className="p-3 overflow-x-auto font-mono text-sm text-white bg-gray-800 rounded-lg">
      <pre>
        <code dangerouslySetInnerHTML={{ __html: code }}></code>
      </pre>
    </div>
  );
};

export default CodeBlock;
