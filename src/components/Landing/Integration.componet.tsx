import CopyToClipboard from "react-copy-to-clipboard";
import SyntaxHighlighter from "react-syntax-highlighter";


export const Integration = () => {
  return (
    <div className="mx-auto container flex-col items-center justify-center p-8 border-t border-b border-accent-2">
      <h1 className="text-3xl text-center font-bold my-4">Easy no code integration within minutes!</h1>
      <p className="text-center text-accent-6">
        Few lines of code to include testimonial collection to your website!
      </p>
      <div className="max-w-4xl mx-auto my-8 border border-accent-2 rounded-xl overflow-hidden">
        <SyntaxHighlighter language="html">
          {/* pass in code here */}
          {`<script type="text/javascript" src="https://clientstrust.me/integration/sdk.v1.min.js"></script>
<script type="text/javascript">
  ctm.init('SECRET_KEY')
</script>`}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}
