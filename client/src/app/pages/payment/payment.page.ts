import { Component, OnInit } from '@angular/core';
import { SpeechRecognitionService } from 'src/app/services/speech-to-text.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
  providers: [SpeechRecognitionService],
})
export class PaymentPage implements OnInit {
  constructor(public speechRecService: SpeechRecognitionService) {
    this.speechRecService.init();
  }

  ngOnInit() {}

  startListening() {
    this.speechRecService.start();
  }

  stopListening() {
    this.speechRecService.stop();
  }
}
