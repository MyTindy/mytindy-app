import { Component } from '@angular/core';

import { SpeechToTextService } from 'src/app/services/speech-to-text.service';

@Component({
  selector: 'app-speech-recognizer',
  templateUrl: './speech-recognizer.component.html',
  styleUrls: ['./speech-recognizer.component.scss'],
})
export class SpeechRecognizerComponent {
  constructor(public speechToTextService: SpeechToTextService) {
    this.speechToTextService.init();
  }

  startListening() {
    this.speechToTextService.start();
  }

  stopListening() {
    this.speechToTextService.stop();
  }
}
