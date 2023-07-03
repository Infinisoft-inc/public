import { MentalStateType } from '../enums/MentalStateType';
import { MentalFaculty } from './MentalFaculty';
import { Attention } from './Attention';

export class MentalState {
  type: MentalStateType;
  state: string;
  duration: number; // Duration of the mental state in seconds
  intensity: number; // Intensity of the mental state on a scale of 1-10
  voluntary: boolean; // Whether the mental state change was voluntary or not
  faculties: MentalFaculty[]; // List of associated mental faculties
  attention: Attention; // Attention faculty associated with the mental state

  constructor(type: MentalStateType, state: string, duration: number, intensity: number, voluntary: boolean, faculties: MentalFaculty[], attention: Attention) {
    this.type = type;
    this.state = state;
    this.duration = duration;
    this.intensity = intensity;
    this.voluntary = voluntary;
    this.faculties = faculties;
    this.attention = attention;
  }
}