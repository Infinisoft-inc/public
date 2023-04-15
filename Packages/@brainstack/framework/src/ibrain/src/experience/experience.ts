import { ExperienceType } from "./experience-type";

// Define Enums for Sensory, Emotional, Cognitive, Perceptual, etc.
enum SensoryExperience {
  Visual = 'Visual',
  Auditory = 'Auditory',
  Olfactory = 'Olfactory',
  Gustatory = 'Gustatory',
  Tactile = 'Tactile'
}

enum EmotionalExperience {
  Joy = 'Joy',
  Sadness = 'Sadness',
  Anger = 'Anger',
  Fear = 'Fear',
  Love = 'Love'
}

enum CognitiveExperience {
  Thinking = 'Thinking',
  Imagining = 'Imagining',
  Remembering = 'Remembering',
  Introspecting = 'Introspecting'
}

enum PerceptualExperience {
  SpatialPerception = 'Spatial Perception',
  TemporalPerception = 'Temporal Perception'
}

enum AestheticExperience {
  AppreciationOfBeauty = 'Appreciation of Beauty',
  ArtisticExpression = 'Artistic Expression'
}

enum SpiritualExperience {
  MysticalExperience = 'Mystical Experience',
  ReligiousExperience = 'Religious Experience'
}

enum SocialExperience {
  InterpersonalInteraction = 'Interpersonal Interaction',
  Empathy = 'Empathy'
}

enum AlteredState {
  Dreaming = 'Dreaming',
  Meditation = 'Meditation'
}

// Define the Experience class
class Experience {
  type: ExperienceType;
  description: string;
  duration: number;
  intensity: number;
  sensoryExperience?: SensoryExperience;
  emotionalExperience?: EmotionalExperience;
  cognitiveExperience?: CognitiveExperience;
  perceptualExperience?: PerceptualExperience;
  aestheticExperience?: AestheticExperience;
  spiritualExperience?: SpiritualExperience;
  socialExperience?: SocialExperience;
  alteredState?: AlteredState;

  constructor(
    type: ExperienceType,
    description: string,
    duration: number,
    intensity: number,
    sensoryExperience?: SensoryExperience,
    emotionalExperience?: EmotionalExperience,
    cognitiveExperience?: CognitiveExperience,
    perceptualExperience?: PerceptualExperience,
    aestheticExperience?: AestheticExperience,
    spiritualExperience?: SpiritualExperience,
    socialExperience?: SocialExperience,
    alteredState?: AlteredState
  ) {
    this.type = type;
    this.description = description;
    this.duration = duration;
    this.intensity = intensity;
    this.sensoryExperience = sensoryExperience;
    this.emotionalExperience = emotionalExperience;
    this.cognitiveExperience = cognitiveExperience;
    this.perceptualExperience = perceptualExperience;
    this.aestheticExperience = aestheticExperience;
    this.spiritualExperience = spiritualExperience;
    this.socialExperience = socialExperience;
    this.alteredState = alteredState;
  }
}
