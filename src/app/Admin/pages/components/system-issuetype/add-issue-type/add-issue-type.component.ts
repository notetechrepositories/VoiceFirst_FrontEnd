import { Component } from '@angular/core';

@Component({
  selector: 'app-add-issue-type',
  templateUrl: './add-issue-type.component.html',
  styleUrl: './add-issue-type.component.css'
})
export class AddIssueTypeComponent {
  photoType: string = '';
  photoTypeList: string[] = [];

  addPhotoTypes() {
    if (this.photoType.trim() && !this.photoTypeList.includes(this.photoType.trim())) {
      this.photoTypeList.push(this.photoType.trim());
      this.photoType = '';
    }
  }

  removePhoteType(tagToRemove: string) {
    this.photoTypeList = this.photoTypeList.filter(tag => tag !== tagToRemove);
  }

  videoType: string = '';
  videoTypeList: string[] = [];

  addVideoType() {
    if (this.videoType.trim() && !this.videoTypeList.includes(this.videoType.trim())) {
      this.videoTypeList.push(this.videoType.trim());
      this.videoType = '';
    }
  }

  removevideoType(tagToRemove: string) {
    this.videoTypeList = this.videoTypeList.filter(tag => tag !== tagToRemove);
  }

}
