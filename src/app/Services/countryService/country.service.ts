import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }

  url="https://localhost:7027/api/Country";
          
    // Get all locations
    getLocations(){
      return this.http.get<any>(this.url);  
    }

   //Insert Country
   insertCountry(data: any){
    return this.http.post<any>(this.url, data); 
  }

  //Update Country
  updateCountry(data:any){
    const response = this.http.put<any>(this.url, data); 
    return response;
  }

  //Delete Country
  deleteLocation(countryId:any){
    const url = `${this.url}/${countryId}`;
    return this.http.delete<any>(url);
  }
  //GetById Country
  getCountryById(countryId:number){
    const url = `${this.url}/${countryId}`;
    return this.http.get<any>(url);
   
  }
  uploadFile(file:any): Observable<any> {
    const url = `${this.url}/import`;
    return this.http.post(url, file);
  }

// -------------------------------DivisionOne-------------------------------------------------------------

   divOneUrl="https://localhost:7027/api/DivisionOne";


  getDivisionOneByCountryId(countryId:string){
    const apiUrl=`${this.divOneUrl}?id_t2_1_country=${countryId}`
    return this.http.get<any>(apiUrl);
  }
  
  ///Insert Division One-----------------
  insertDivisionOne(data:any){
    return this.http.post<any>(this.divOneUrl, data); 
  }
// ---------Update Division One-----------------
updateDivisionOne(data:any){
  return this.http.put<any>(this.divOneUrl, data); 
}
// -----------Delete Division One-------------------
deleteDivisionOne(id:any){
  return this.http.delete<any>(`${this.divOneUrl}/${id}`);

}
getDivisionOneId(divisionOneId:any){
  const apiUrl=`${this.divOneUrl}/${divisionOneId}`
  return this.http.get<any>(apiUrl);
}
uploadFileDivisionOne(file:any): Observable<any> {
  const url = `${this.divOneUrl}/import`;
  return this.http.post(url, file);
}

// ----------------------DivisionTwo--------------------------------------------------------------------------------
   divTwourl="https://localhost:7027/api/DivisionTwo";

   getDivisionTwoByDivisionOneId(divisionOneId:string){
    const apiUrl=`${this.divTwourl}?id_t2_1_div1=${divisionOneId}`
    console.log(apiUrl);
    
    return this.http.get<any>(apiUrl);
  }
    ///Insert Division Two-----------------
    insertDivisionTwo(data:any){
      return this.http.post<any>(this.divTwourl, data); 
    }
    // ---------Update Division Two-----------------
    updateDivisionTwo(data:any){
      return this.http.put<any>(this.divTwourl, data); 
    }
    // -----------Delete Division Two-------------------
    deleteDivisionTwo(id:any){
      return this.http.delete<any>(`${this.divTwourl}/${id}`); 
    }
    uploadFileDivisionTwo(file:any): Observable<any> {
      const url = `${this.divTwourl}/import`;
      return this.http.post(url, file);
    }
// ----------------------DivisionThree--------------------------------------------------------------------------------
  divThreeurl="https://localhost:7027/api/DivisionThree";

  //Insert Division Two-----------------

    insertDivisionThree(data:any){
        return this.http.post<any>(this.divThreeurl, data); 
    }

  // ---------Update Division Three-----------------

  updateDivisionThree(data:any){
    return this.http.put<any>(this.divThreeurl, data); 
  }
    // -----------Delete Division Two-------------------

    deleteDivisionThree(id:any){
      return this.http.delete<any>(`${this.divThreeurl}/${id}`); 
    }
   //---------------------Get ---------------------------

   //Get Division3 By Division 2--------------------------
 
   getDivisionThreeByDivisionTwoId(divisionTwoId:string){
    const apiUrl=`${this.divThreeurl}?id_t2_1_div2=${divisionTwoId}`
    console.log(apiUrl);
    return this.http.get<any>(apiUrl);
  }
  // ---------------Import----------------------------------
  uploadFileDivisionThree(file:any): Observable<any> {
    const url = `${this.divThreeurl}/import`;
    console.log(url);
    console.log(file);
    
    
    return this.http.post(url, file);
  }
}
