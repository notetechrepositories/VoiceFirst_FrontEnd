import { Component, ElementRef, ViewChild } from '@angular/core';
import { AudioRecorderService } from '../../Services/audioRecorderService/audio-recorder.service';
import { DomSanitizer } from '@angular/platform-browser';
import { BrachService } from '../../Services/branchService/brach.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { IssueService } from '../../Services/issueService/issue.service';
import { LocalstorageService } from '../../Services/localStorageService/localstorage.service';

@Component({
  selector: 'app-branch-detail',
  templateUrl: './branch-detail.component.html',
  styleUrls: ['./branch-detail.component.css'], // Fixed "styleUrl" to "styleUrls"
})
export class BranchDetailComponent {
  selectedImages1: File[] = [];
  previews1: { url: string }[] = [];

  selectedImages2: File[] = [];
  previews2: { url: string }[] = [];

  selectedVideos: File[] = [];
  videoPreviews: { url: string }[] = [];

  branchDetails: any[] = [];
  branchId: any;

  issueText: string = '';

  constructor(
    private audioService: AudioRecorderService,
    private sanitizer: DomSanitizer,
    private branchservice: BrachService,
    private route: ActivatedRoute,
    private router: Router,
    private issueservice: IssueService
  ) {}

  onFileSelected(event: Event, type: string) {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    const filesArray = Array.from(input.files);

    if (type === 'images1') {
      if (this.selectedImages1.length + filesArray.length > 4) {
        alert('You can only upload a maximum of 4 Bill Images.');
        return;
      }

      filesArray.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          const filePreview = { url: e.target!.result as string };
          this.selectedImages1.push(file);
          this.previews1.push(filePreview);
        };
        reader.readAsDataURL(file);
      });
    } else if (type === 'images2') {
      if (this.selectedImages2.length + filesArray.length > 2) {
        alert('You can only upload a maximum of 2 Evidence Images.');
        return;
      }

      filesArray.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          const filePreview = { url: e.target!.result as string };
          this.selectedImages2.push(file);
          this.previews2.push(filePreview);
        };
        reader.readAsDataURL(file);
      });
    } else if (type === 'videos') {
      if (this.selectedVideos.length + filesArray.length > 4) {
        alert('You can only upload a maximum of 4 Videos.');
        return;
      }

      filesArray.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          const filePreview = { url: e.target!.result as string };
          this.selectedVideos.push(file);
          this.videoPreviews.push(filePreview);
        };
        reader.readAsDataURL(file);
      });
    }
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

  isRecording: boolean = false;
  isRecordBtn: boolean = true;
  audioUrl: any = null;
  audioBlob: Blob | null = null;

  async startRecording() {
    // this.isRecording = true;
    this.audioUrl = null;
    this.isRecordBtn = false;
    await this.audioService.startRecording();
  }

  async stopRecording() {
    // this.isRecording = false;

    this.isRecordBtn = true;
    this.audioBlob = await this.audioService.stopRecording();

    if (this.audioBlob) {
      this.audioUrl = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(this.audioBlob)
      );

      const file = new File([this.audioBlob], 'audio_recording.wav', {
        type: 'audio/wav',
      });
      // this.audioForm.patchValue({ audioFile: file });
    }
  }

  deleteRecording() {
    this.audioUrl = null;
    this.audioBlob = null;
    // this.audioForm.patchValue({ audioFile: null });
  }

  ngOnInit(): void {
    this.branchId = localStorage.getItem('branchId');
    console.log('BranchDetailComponent loaded branchId:', this.branchId);
    this.getBranch();
  }

  getBranch(): void {
    const body = {
      filters: {
        id_t2_company_branch: this.branchId,
      },
    };

    console.log('Sending getBranch request body:', body);

    this.branchservice.getBranch(body).subscribe({
      next: (res) => {
        console.log('getBranch response:', res);
        this.branchDetails = res.data.Items || [];
      },
      error: (error) => {
        console.log('Failed to load branch details:', error);
        this.branchDetails = [];
      },
    });
  }

  submitForm() {
    const formData = new FormData();

    formData.append('id_t2_company_branch', this.branchId || '');
    formData.append('t11_issue_text', this.issueText || '');

    // Audio file (always append something)
    if (this.audioBlob) {
      const audioFile = new File([this.audioBlob], 'recorded_audio.wav', {
        type: 'audio/wav',
      });
      formData.append('t11_issue_voice', audioFile);
    } else {
      formData.append('t11_issue_voice', '');
    }

    // Bill Images - always append 4
    for (let i = 0; i < 4; i++) {
      if (this.selectedImages1[i]) {
        console.log(this.selectedImages1[i]);

        formData.append(`t11_issue_image${i + 1}`, this.selectedImages1[i]);
        console.log(formData);
      } else {
        formData.append(`t11_issue_image${i + 1}`, '');
      }
    }

    // Evidence Images - always append 4
    for (let i = 0; i < 2; i++) {
      if (this.selectedImages2[i]) {
        formData.append(`t11_evidence_image${i + 1}`, this.selectedImages2[i]);
      } else {
        formData.append(`t11_evidence_image${i + 1}`, '');
      }
    }

    // Videos - always append 4
    for (let i = 0; i < 4; i++) {
      if (this.selectedVideos[i]) {
        formData.append(`t11_issue_video${i + 1}`, this.selectedVideos[i]);
      } else {
        formData.append(`t11_issue_video${i + 1}`, '');
      }
    }

    console.log('--- FormData Contents ---');
    for (const pair of (formData as any).entries()) {
      console.log(`${pair[0]}:`, pair[1]);

      if (pair[1] instanceof File) {
        console.log(`  - File name: ${pair[1].name}`);
        console.log(`  - File type: ${pair[1].type}`);
        console.log(`  - File size: ${pair[1].size} bytes`);
      } else {
        console.log(`  - Value: ${pair[1]}`);
      }
    }
    this.issueservice.submitIssue(formData).subscribe({
      next: (response) => {
        console.log('Form submitted successfully:', response);
        alert('Your feedback has been submitted!');
        this.resetForm();
      },
      error: (error) => {
        console.error('Error submitting form:', error);
        alert('Error submitting your feedback.');
      },
    });
  }

  resetForm() {
    this.issueText = '';
    this.audioBlob = null;
    this.audioUrl = null;

    this.selectedImages1 = [];
    this.previews1 = [];

    this.selectedImages2 = [];
    this.previews2 = [];

    this.selectedVideos = [];
    this.videoPreviews = [];
  }
}
