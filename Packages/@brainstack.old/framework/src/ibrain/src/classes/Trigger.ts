import { TriggerType } from '../enums';

export class Trigger {
  type: TriggerType;
  intensity: number;
  duration: number;

  constructor(type: TriggerType, intensity: number, duration: number) {
    this.type = type;
    this.intensity = intensity;
    this.duration = duration;
  }
}
