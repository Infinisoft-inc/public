import type {Human} from './Human'

/**
 * Represents an abstract class that implements the essential functions of a human being.
 */
abstract class BrainBase implements Human {
    hear(): void {
      console.log('Paying attention to sounds and speech in surroundings');
    }
  
    speak(): void {
      console.log('Engaging in conversation and expressing yourself clearly and effectively');
    }
  
    see(): void {
      console.log('Observing environment and taking note of visual information around you');
    }
  
    touch(): void {
      console.log('Using sense of touch to interact with world around you and feel sensations like heat, cold, or texture');
    }
  
    smell(): void {
      console.log('Using sense of smell to identify and differentiate various scents in your surroundings');
    }
  
    taste(): void {
      console.log('Using sense of taste to enjoy and differentiate the flavors of different foods and drinks');
    }
  
    move(): void {
      console.log('Using muscles and motor skills to move and manipulate objects in your environment');
    }
  
    think(): void {
      console.log('Using cognitive abilities to think critically, analyze problems, and find solutions');
    }
  
    learn(): void {
      console.log('Seeking out new information and actively engaging in the learning process');
    }
  
    create(): void {
      console.log('Engaging in creative activities and expressing yourself through art, music, writing, or other forms of self-expression');
    }
  
    emote(): void {
      console.log('Allowing yourself to feel and express a range of emotions appropriately');
    }
  
    breathe(): void {
      console.log('Controlling breathing and engaging in activities that regulate bodily functions');
    }
  
    sleep(): void {
      console.log('Getting enough sleep and rest to allow your body and mind to recharge and recover');
    }
  
    reproduce(): void {
      console.log('Engaging in activities that lead to reproduction and passing on of genetic information');
    }
  
    interact(): void {
      console.log('Engaging in activities that allow you to interact with your surroundings and other living beings in a positive and meaningful way');
    }
  }