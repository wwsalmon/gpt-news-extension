import React from 'react';

function getDOM() {
  console.log(document.body.innerHTML);
  return document.body.innerHTML;
}

const Popup = () => {
  return (
    <div>
      <p>testing</p>
      {chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        const activeTabId = tabs[0].id;
        chrome.scripting.executeScript({
          target: { tabId: activeTabId },
          func: getDOM,
        }, results => {
          console.log("results", results);
        })
      })}
    </div>
  );
};

export default Popup;
