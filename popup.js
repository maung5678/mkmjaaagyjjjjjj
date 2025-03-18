document.getElementById("markButton").addEventListener("click", () => {
    const answers = document.getElementById("aiAnswers").value;
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "markAnswers", data: answers });
    });
  });