export default function sayString(str) {
  const synthesis = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(str);
  utterance.rate = 0.5;
  utterance.lang = 'en-US';
  if (!synthesis.pending && !synthesis.speaking) {
    synthesis.speak(utterance);
  } else {
    synthesis.cancel();
    synthesis.speak(utterance);
  }
}
