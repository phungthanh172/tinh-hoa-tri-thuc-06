
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface BlogPostContentProps {
  content: string;
}

const BlogPostContent = ({ content }: BlogPostContentProps) => {
  return (
    <div className="prose prose-lg prose-gray max-w-none 
      prose-headings:text-gray-900 prose-headings:font-bold
      prose-h1:text-3xl prose-h1:mb-6 prose-h1:mt-8 prose-h1:border-b prose-h1:border-gray-200 prose-h1:pb-4
      prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-8 prose-h2:text-purple-800
      prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-6 prose-h3:text-purple-700
      prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
      prose-a:text-purple-600 prose-a:font-medium prose-a:no-underline hover:prose-a:underline
      prose-strong:text-gray-900 prose-strong:font-semibold
      prose-code:bg-gray-100 prose-code:text-purple-600 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono
      prose-pre:bg-gray-900 prose-pre:text-white prose-pre:rounded-lg prose-pre:p-4 prose-pre:overflow-x-auto
      prose-blockquote:border-l-4 prose-blockquote:border-purple-500 prose-blockquote:bg-purple-50 prose-blockquote:p-4 prose-blockquote:italic prose-blockquote:text-purple-800 prose-blockquote:rounded-r-lg
      prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-4
      prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-4
      prose-li:mb-2 prose-li:text-gray-700
      prose-table:border-collapse prose-table:w-full
      prose-th:border prose-th:border-gray-300 prose-th:bg-gray-100 prose-th:p-3 prose-th:text-left prose-th:font-semibold
      prose-td:border prose-td:border-gray-300 prose-td:p-3
      prose-img:rounded-lg prose-img:shadow-md prose-img:mx-auto">
      
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code(props) {
            const { children, className, ...rest } = props;
            const match = /language-(\w+)/.exec(className || '');
            return match ? (
              <SyntaxHighlighter
                style={tomorrow}
                language={match[1]}
                PreTag="div"
                className="rounded-lg shadow-lg"
                {...rest}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...rest}>
                {children}
              </code>
            );
          },
          h1: ({ children }) => (
            <h1 id={children.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}>
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 id={children.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}>
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 id={children.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}>
              {children}
            </h3>
          )
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default BlogPostContent;
