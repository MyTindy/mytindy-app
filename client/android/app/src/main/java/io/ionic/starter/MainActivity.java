package io.ionic.starter;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;

import java.util.ArrayList;
import com.getcapacitor.plugin.http.Http;

import com.getcapacitor.community.speechrecognition.SpeechRecognition;


public class MainActivity extends BridgeActivity {

  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // Initializes the Bridge
    this.init(
        savedInstanceState,
        new ArrayList<Class<? extends Plugin>>() {

          {
						add(Http.class)
            // Additional plugins you've installed go here
            // Ex: add(TotallyAwesomePlugin.class);
            add(SpeechRecognition.class);
          }
        }
      );
  }
}
