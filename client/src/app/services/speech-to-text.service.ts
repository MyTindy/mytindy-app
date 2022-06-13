import { Injectable } from '@angular/core';

declare let webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root',
})
export class SpeechRecognitionService {
  recognition = new webkitSpeechRecognition();
  isStoppedSpeechRecognition = false;
  public text = '';
  tempWords;

  constructor() {}

  init() {
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-Us';

    this.recognition.addEventListener('result', (e) => {
      const transcript = Array.from(e.results)
        .map((res) => res[0])
        .map((res) => res.transcript)
        .join('');

      this.tempWords = transcript;
      console.log(transcript);
    });
  }

  start() {
    this.isStoppedSpeechRecognition = false;
    this.recognition.start();
    console.log('Listening in progress');
    this.recognition.addEventListener('end', (condition) => {
      if (this.isStoppedSpeechRecognition) {
        this.recognition.stop();
        console.log('Listening has stopped');
      } else {
        this.wordConcat();
        this.recognition.start();
      }
    });
  }

  stop() {
    this.isStoppedSpeechRecognition = true;
    this.wordConcat();
    this.recognition.stop();
    console.log('End Speech Recognition');
  }

  wordConcat() {
    this.text = this.text + '' + this.tempWords + '.';
    this.tempWords = '';
  }
}