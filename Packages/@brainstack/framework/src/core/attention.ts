// Define the types of attentional control
enum AttentionalControl {
  Voluntary = 'Voluntary (Endogenous)',
  Automatic = 'Automatic (Exogenous)'
}

// Define the types of attentional shift
enum AttentionalShiftType {
  Overt = 'Overt (with eye movements)',
  Covert = 'Covert (without eye movements)'
}

// Define the stages of attention orienting
enum AttentionOrientingStage {
  Disengagement = 'Disengagement (take attention away from current focus)',
  Shifting = 'Shifting (redirect attention to a new target)',
  Engagement = 'Engagement (focus on the new target)'
}

// Define the AttentionalShift class
class AttentionalShift {
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

// Instantiate and simulate an overt, voluntary attentional shift
const overtVoluntaryShift = new AttentionalShift(AttentionalControl.Voluntary, AttentionalShiftType.Overt);
overtVoluntaryShift.simulateShift();

// Instantiate and simulate a covert, automatic attentional shift
const covertAutomaticShift = new AttentionalShift(AttentionalControl.Automatic, AttentionalShiftType.Covert);
covertAutomaticShift.simulateShift();

// AttentionalShift, AttentionalControl, AttentionalShiftType, and AttentionOrientingStage
// are defined as in the previous script

class Attention {
  private attentionalShift: AttentionalShift | null;
  private attentionSpan: number;
  private isDistracted: boolean;

  constructor() {
    this.attentionalShift = null;
    this.attentionSpan = 0;
    this.isDistracted = false;
  }

  // Set the attention span
  setAttentionSpan(span: number): void {
    this.attentionSpan = span;
  }

  // Set whether the individual is distracted
  setDistracted(distracted: boolean): void {
    this.isDistracted = distracted;
  }

  // Initiate an attentional shift
  initiateAttentionalShift(control: AttentionalControl, shiftType: AttentionalShiftType): void {
    this.attentionalShift = new AttentionalShift(control, shiftType);
    this.attentionalShift.simulateShift();
  }

  // Display the current state of attention
  displayAttentionState(): void {
    console.log('Attention State:');
    console.log(`  Attention Span: ${this.attentionSpan}`);
    console.log(`  Distracted: ${this.isDistracted}`);
    if (this.attentionalShift) {
      console.log('  Attentional Shift:');
      console.log(`    Control: ${this.attentionalShift.control}`);
      console.log(`    Shift Type: ${this.attentionalShift.shiftType}`);
    } else {
      console.log('  No ongoing attentional shift.');
    }
  }
}

// Instantiate the Attention class
const attention = new Attention();

// Set the attention span and distraction state
attention.setAttentionSpan(5);
attention.setDistracted(true);

// Display the current state of attention
attention.displayAttentionState();

// Initiate an overt, voluntary attentional shift
attention.initiateAttentionalShift(AttentionalControl.Voluntary, AttentionalShiftType.Overt);

// Display the updated state of attention
attention.displayAttentionState();
