/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { SpeechRecognition } from '@awesome-cordova-plugins/speech-recognition/ngx';

@Injectable({
  providedIn: 'root',
})
export class SpeechToTextService {
  bgColor = 'white';

  constructor(private speechRecognition: SpeechRecognition) {}

  isRecognitionAvailable() {
    this.speechRecognition
      .isRecognitionAvailable()
      .then((available: boolean) => console.log(available));
  }

  startListening() {
    this.speechRecognition.startListening().subscribe(
      (matches: string[]) => {
        console.log(matches);
        this.bgColor = matches[0];
      },
      (onerror) => console.log('error:', onerror)
    );
  }

  stopListening() {
    this.speechRecognition.stopListening();
  }

  getSupportedLanguages() {
    this.speechRecognition.getSupportedLanguages().then(
      (languages: string[]) => console.log(languages),
      (error) => console.log(error)
    );
  }

  checkPermission() {
    this.speechRecognition.hasPermission().then((hasPermission: boolean) => {
      if (!hasPermission) {
        this.requestPermission();
      }
    });
  }

  requestPermission() {
    this.speechRecognition.requestPermission().then(
      () => console.log('Granted'),
      () => console.log('Denied')
    );
	}

	get color() {
		this.startListening();
		return this.bgColor;
	}
}
