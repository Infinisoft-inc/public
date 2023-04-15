import { AttentionalControl, AttentionalShiftType, AttentionOrientingStage } from '../enums';

export class AttentionalShift {
  control: AttentionalControl;
  shiftType: AttentionalShiftType;
  currentStage: AttentionOrientingStage | null;

  constructor(control: AttentionalControl, shiftType: AttentionalShiftType) {
    this.control = control;
    this.shiftType = shiftType;
    this.currentStage = null;
  }

  // Simulate the attentional shift process
  simulateShift() {
    console.log(`Attentional Control: ${this.control}`);
    console.log(`Attentional Shift Type: ${this.shiftType}`);
    console.log('Starting attentional shift simulation...');

    // Go through each stage of attention orienting
    for (const stage in AttentionOrientingStage) {
      this.currentStage = AttentionOrientingStage[stage as keyof typeof AttentionOrientingStage];
      console.log(`Current Stage: ${this.currentStage}`);
    }

    console.log('Attentional shift simulation complete.');
  }
}

