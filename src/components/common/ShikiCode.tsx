import ShikiHighlighter from "react-shiki";

function CodeBlock() {
  return (
      <ShikiHighlighter language="jsx" theme="github-dark">
          {code.trim()}
      </ShikiHighlighter>
  );
}