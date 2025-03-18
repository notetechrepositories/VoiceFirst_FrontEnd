import { Component, ElementRef, ViewChild } from '@angular/core';
import { AudioRecorderService } from '../../Services/audioRecorderService/audio-recorder.service';
import { DomSanitizer } from '@angular/platform-browser';




@Component({
  selector: 'app-branch-detail',
  templateUrl: './branch-detail.component.html',
  styleUrls: ['./branch-detail.component.css'] // Fixed "styleUrl" to "styleUrls"
})
export class BranchDetailComponent {
  selectedImages1: File[] = [];
  previews1: { url: string }[] = [];

  selectedImages2: File[] = [];
  previews2: { url: string }[] = [];

  selectedVideos: File[] = [];
  videoPreviews: { url: string }[] = [];

  constructor(
    private audioService: AudioRecorderService,
    private sanitizer: DomSanitizer,
  ){}

  onFileSelected(event: Event, type: string) {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    Array.from(input.files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const filePreview = { url: e.target!.result as string };

        if (type === 'images1') {
          this.selectedImages1.push(file);
          this.previews1.push(filePreview);
        } else if (type === 'images2') {
          this.selectedImages2.push(file);
          this.previews2.push(filePreview);
        } else if (type === 'videos') {
          this.selectedVideos.push(file);
          this.videoPreviews.push(filePreview);
        }
      };

      reader.readAsDataURL(file);
    });
  }

  removeFile(index: number, type: string) {
    if (type === 'images1') {
      this.selectedImages1.splice(index, 1);
      this.previews1.splice(index, 1);
    } else if (type === 'images2') {
      this.selectedImages2.splice(index, 1);
      this.previews2.splice(index, 1);
    } else if (type === 'videos') {
      this.selectedVideos.splice(index, 1);
      this.videoPreviews.splice(index, 1);
    }
  }

  // Audio recorder

  isRecording: boolean = false;
  isRecordBtn: boolean = true;
  audioUrl: any = null;
  audioBlob: Blob | null = null;


  async startRecording() {
    // this.isRecording = true;
    this.audioUrl=null;
    this.isRecordBtn = false;
    await this.audioService.startRecording();
  }

  async stopRecording() {
    // this.isRecording = false;
    
    this.isRecordBtn= true;
    this.audioBlob = await this.audioService.stopRecording();

    if (this.audioBlob) {
      this.audioUrl = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(this.audioBlob)
      );

      // Append to form
      const file = new File([this.audioBlob], 'audio_recording.wav', { type: 'audio/wav' });
      // this.audioForm.patchValue({ audioFile: file });
    }
  }

  deleteRecording() {
    this.audioUrl = null;
    this.audioBlob = null;
    // this.audioForm.patchValue({ audioFile: null });
  }

  // submitForm() {
  //   if (!this.audioBlob) {
  //     alert('Please record an audio before submitting.');
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append('audioFile', this.audioForm.get('audioFile')?.value);

  //   fetch('https://your-api-endpoint.com/upload-audio', {
  //     method: 'POST',
  //     body: formData,
  //   })
  //     .then((response) => response.json())
  //     .then((data) => console.log('Success:', data))
  //     .catch((error) => console.error('Error:', error));
  // }
}



