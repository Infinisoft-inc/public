// main.ts (Example usage)
import { Container } from '..';
import { ApiService, AuthService, Configuration } from './service'; // Import your services


const container = new Container();

// Resolve the singleton FIRST!
const config = container.getInstance(Configuration); 

const apiService = container.getInstance(ApiService);
const authService = container.getInstance(AuthService);

apiService.getData(); 
authService.authenticate(); 

config.changeSetting1('Modified Value'); 

apiService.getData();
authService.authenticate();



// Testing non-singleton instance creation
const newConfig = new Configuration();
newConfig.setting1 = "New Instance Value";
console.log("New instance value:", newConfig.setting1);            // Output: New Instance Value
console.log("Singleton value:", apiService.getData) // Output: Modified Value (singleton unaffected)