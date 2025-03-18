chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "markAnswers") {
      const answers = parseAnswers(message.data);
      markAndHighlightAnswers(answers);
    }
  });
  
  function parseAnswers(rawAnswers) {
    const answerMap = {};
    rawAnswers.split("\n").forEach((line) => {
      const [question, answer] = line.split(":");
      if (question && answer) {
        answerMap[question.trim()] = answer.trim();
      }
    });
    return answerMap; // เช่น { "ข้อ 1": "ก", "ข้อ 2": "ข" }
  }
  
  function markAndHighlightAnswers(answers) {
    // ปรับแต่งตามโครงสร้างจริงของ Microsoft Forms
    const questions = document.querySelectorAll("div[role='question']"); // ตัวอย่างคลาสของ Microsoft Forms
    questions.forEach((question, index) => {
      const qNum = `ข้อ ${index + 1}`;
      const correctAnswer = answers[qNum];
      if (correctAnswer) {
        const options = question.querySelectorAll("input[type='radio'], input[type='checkbox']");
        options.forEach((option) => {
          const label = option.nextElementSibling?.textContent.trim();
          if (label && label.startsWith(correctAnswer)) {
            option.checked = true; // มาร์คคำตอบ
            option.parentElement.style.backgroundColor = "yellow"; // ไฮไลท์
          }
        });
      }
    });
  }