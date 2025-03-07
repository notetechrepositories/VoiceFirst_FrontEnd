import { Component, ElementRef, ViewChild } from '@angular/core';
import { FileUploadEvent } from 'primeng/fileupload';



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


 
}



