import { FacultyType } from "../enums/FacultyType";

export class MentalFaculty {
    type: FacultyType;
    intensity: number; // Intensity of the faculty on a scale of 1-10
    activationLevel: number; // Activation level of the faculty on a scale of 1-10
  
    constructor(type: FacultyType, intensity: number, activationLevel: number) {
      this.type = type;
      this.intensity = intensity;
      this.activationLevel = activationLevel;
    }
  }
  