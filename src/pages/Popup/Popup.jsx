import { isProbablyReaderable, Readability } from '@mozilla/readability';
import React from 'react';

function getBodyHTML() {
  return {
    innerHTML: document.body.innerHTML,
    title: document.title,
  };
}

const Popup = () => {
  return (
    <div>
      <p>testing</p>
      {chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        const activeTabId = tabs[0].id;
        chrome.scripting.executeScript({
          target: { tabId: activeTabId },
          func: getBodyHTML,
        }).then(d => {
          const result = d[0].result;
          const title = result.title;
          const innerHTML = result.innerHTML;
          const thisDocument = document.implementation.createHTMLDocument(title);
          thisDocument.body.innerHTML = innerHTML;
          if (isProbablyReaderable(thisDocument)) {
            const article = new Readability(thisDocument).parse();
            console.log(article);
          } else {
            console.log("Not readerable");
          }
        })
      })}
    </div>
  );
};

export default Popup;
