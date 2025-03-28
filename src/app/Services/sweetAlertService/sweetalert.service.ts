import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';



@Injectable({
  providedIn: 'root'
})
export class SweetalertService {

  Toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    iconColor: 'white',
    customClass: {
      popup: 'colored-toast',
    },
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  });

  constructor() { }

  success(){
    Swal.fire("SweetAlert2 is working!");;
  }

delete(){
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {

      this.showToast('success','Succefully deleted');
    }
  });
}

 showToast(type: 'success' | 'error' | 'warning' | 'info' | 'question', title: string) {
   this.Toast.fire({
    icon: type,
    title: title,
  });
}

}

