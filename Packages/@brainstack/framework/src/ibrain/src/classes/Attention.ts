// src/classes/Attention.ts continued...
import { AttentionalControl, AttentionalShiftType } from '../enums';
import { FacultyType } from '../enums/FacultyType';
import { AttentionalShift } from './AttentionalShift';
import { MentalFaculty } from './MentalFaculty';

type FocusType = 'selective' | 'sustained' | 'divided';

export class Attention extends MentalFaculty {
  focusType: FocusType;
  focusObject: string; // The object or task that attention is focused on
  attentionalShift: AttentionalShift | null; // The ongoing attentional shift, if any

  constructor(intensity: number, activationLevel: number, focusType: FocusType, focusObject: string) {
    super(FacultyType.Attention, intensity, activationLevel);
    this.focusType = focusType;
    this.focusObject = focusObject;
    this.attentionalShift = null;
  }

  // Initiate an attentional shift
  initiateAttentionalShift(control: AttentionalControl, shiftType: AttentionalShiftType): void {
    this.attentionalShift = new AttentionalShift(control, shiftType);
    this.attentionalShift.simulateShift();
  }
}
