/* eslint-disable  no-plusplus  */
import React, { FC } from 'react';

interface Props {
  text: string;
  searchTerm: string;
  color?: string;
}

type TextOccurence = [string, boolean]
const textToOccurences = (text : string, searchTerm : string) : TextOccurence[] => {
  const result :TextOccurence[] = [];
  let currentText = '';
  for (let i = 0; i < text.length; i++) {
    if (text[i] === searchTerm[0]) {
      let match = true;
      for (let j = 0; j < searchTerm.length; j++) {
        if (text[i + j] !== searchTerm[j]) {
          match = false;
          break;
        }
      }
      if (match) {
        if (currentText) result.push([currentText ?? searchTerm, false]);
        result.push([searchTerm, true]);
        currentText = '';
        i += searchTerm.length - 1;
      } else {
        currentText += text[i];
      }
    } else {
      currentText += text[i];
    }
  }
  if (currentText) result.push([currentText, false]);
  return result;
};

const Highlight: FC<Props> = ({ text, searchTerm, color }) => (
  <div>
    { textToOccurences(text, searchTerm)?.map(([t, match], i) => (
      <span key={`highlight-${i}-${text}`} style={{ color: match ? color ?? 'red' : 'black' }}>
        {t}
      </span>
    ))}
  </div>
);
export default Highlight;
