import CopyToClipboard from "react-copy-to-clipboard";
import SyntaxHighlighter from "react-syntax-highlighter";

interface Props {
  title: string;
  description: string;
  code: string;
}
export const Integration = ({ title, description, code }: Props) => {
  return (
    <div className="mx-auto container flex-col items-center justify-center p-8 border-t border-b border-accent-2">
      <h1 className="text-3xl text-center font-bold my-4">{title}</h1>
      <p className="text-center text-accent-6">
        {description}
      </p>
      <div className="max-w-4xl mx-auto my-8 border border-accent-2 rounded-xl overflow-hidden">
        <SyntaxHighlighter language="html">
          {/* pass in code here */}
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}
