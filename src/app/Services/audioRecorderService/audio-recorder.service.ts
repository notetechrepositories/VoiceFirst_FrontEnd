import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AudioRecorderService {
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private audioBlob: Blob | null = null;

  startRecording(): Promise<void> {
    return new Promise((resolve, reject) => {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          this.mediaRecorder = new MediaRecorder(stream);
          this.audioChunks = [];

          this.mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
              this.audioChunks.push(event.data);
            }
          };

          this.mediaRecorder.onstop = () => {
            this.audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
          };

          this.mediaRecorder.start();
          resolve();
        })
        .catch(reject);
    });
  }

  stopRecording(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      if (this.mediaRecorder) {
        this.mediaRecorder.onstop = () => {
          this.audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
          resolve(this.audioBlob);
        };
        this.mediaRecorder.stop();
      } else {
        reject('MediaRecorder not initialized');
      }
    });
  }

  getAudioBlob(): Blob | null {
    return this.audioBlob;
  }
}
