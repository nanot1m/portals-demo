import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { githubGist } from 'react-syntax-highlighter/dist/styles'
import './Pre.css'

export const Pre = ({ className, language = 'html', ...props }) => (
  <SyntaxHighlighter
    {...props}
    className={joinClasses(className, 'Pre-root')}
    language={language}
    style={githubGist}
  />
)

const joinClasses = (...classes) =>
  classes
    .reduce((acc, x) => acc.concat(x), [])
    .filter(Boolean)
    .join(' ')
