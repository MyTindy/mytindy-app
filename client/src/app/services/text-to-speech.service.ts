import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TextToSpeechService {
  speechSynthesizer!: SpeechSynthesisUtterance;

  constructor() {
    this.initSynthesis();
  }

  initSynthesis(): void {
    this.speechSynthesizer = new SpeechSynthesisUtterance();
    this.speechSynthesizer.voice = window.speechSynthesis.getVoices()[2];
    this.speechSynthesizer.volume = 1;
    this.speechSynthesizer.rate = 1;
    this.speechSynthesizer.pitch = 0.2;
  }

  speak(word: string, language: string): void {
    this.speechSynthesizer.lang = language;
    this.speechSynthesizer.text = word;
    return speechSynthesis.speak(this.speechSynthesizer);
  }
}
