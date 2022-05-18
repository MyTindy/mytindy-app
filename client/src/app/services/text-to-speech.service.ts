import { Injectable } from '@angular/core';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';

@Injectable({
  providedIn: 'root',
})
export class TextToSpeechService {
  constructor(private textToSpeech: TextToSpeech) {}

  convertTextToSpeech(text) {
    this.textToSpeech
      .speak(text)
      .then(() => console.log('Done'))
      .catch((reason: any) => console.log(reason));
  }
}
