import { Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'nasa';
  manifestSol = [];
  photos: any;
  fetchPhotos: boolean = false;
  rovers = [
    {name: 'Curiosity'},
    {name: 'Opportunity'},
    {name: 'Spirit'},
  ];
  selectedRover: any;
  selectedCamera: any;
  selectedSol: any = null;
  roversCameras: any;
  curiosityCameras = [
    {abbreviation: 'FHAZ', name: 'Front Hazard Avoidance Camera'},
    {abbreviation: 'RHAZ', name: 'Rear Hazard Avoidance Camera'},
    {abbreviation: 'MAST', name: 'Mast Camera'},
    {abbreviation: 'CHEMCAM', name: 'Chemistry and Camera Complex'},
    {abbreviation: 'MAHLI', name: 'Mars Hand Lens Imager'},
    {abbreviation: 'MARDI', name: 'Mars Descent Imager'},
    {abbreviation: 'NAVCAM', name: 'Navigation Camera'}
  ];
  opportunitySpiritCameras = [
    {abbreviation: 'FHAZ', name: 'Front Hazard Avoidance Camera'},
    {abbreviation: 'RHAZ', name: 'Rear Hazard Avoidance Camera'},
    {abbreviation: 'NAVCAM', name: 'Navigation Camera'},
    {abbreviation: 'PANCAM', name: 'Panoramic Camera'},
    {abbreviation: 'MINITES', name: 'Miniature Thermal Emission Spectrometer (Mini-TES)'}
  ];
  p: number = 1;
  itemsPerPage: number = 5;
  totalPhotos: any;

  constructor(private http: HttpClient) { }

  getPhotos() {
    this.http.get<any>(`https://api.nasa.gov/mars-photos/api/v1/rovers/${this.selectedRover}/photos?sol=${+this.selectedSol}&camera=${this.selectedCamera.abbreviation}&api_key=tGp4b8kAlchB0pvLpHNeWHVCKRyMpPPy1pQ0jhlK`)
      .subscribe((response) => {
        this.photos = response.photos
        this.fetchPhotos = false
        this.totalPhotos = response.photos.length
        console.log(this.totalPhotos)
      })
  };

  setCameraOptions() {
    if(this.selectedRover == 'Curiosity'){
      this.roversCameras = this.curiosityCameras
    }
    else if(this.selectedRover == 'Opportunity' && 'Spirit'){
      this.roversCameras = this.opportunitySpiritCameras
    }
  };

  getCamera(chosenCamera: any) {
    this.selectedCamera = chosenCamera
  };
}
