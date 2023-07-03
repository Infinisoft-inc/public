```
                                                                             
      ..........                                                                
   ...(%#%(*,......                                          ..                 
  ..,%,.,,,,,*%*,.......                                 .........              
  ..*(,(,...,,*(*((,.......                            ....,,,,,....            
  ..,#,/.......,.,#*/(,.......                      ...,,/#*,,,,*(,.. .         
   .,#*(,....,,,,,.,,(**#,,.......               ....,#*,,,,,..,,%,....         
   ..,(/,..,(,,,,,#*,,,,(//#*,......        .....,*#*,,,*(/,(,.,,#,.. .         
   .../*(,,,(,,(((/,,/*,,,*#*/#*,..............,(*,,,#*.,,,,,(*,**,...          
    ..,#*/,,/,**,(((*#*,(,,,,*(,/#,,........,*#,,,/*,...,.,,*#**(,,...          
    ...,#**,,(,(*//(#//(**(*,,,,(**((,,.,.,(/,,,#,........,,%**%,,...           
     ...,%**,,(*#((#&%///(,,(*,,,,*(,*%**(*,,,/,.........,,%,*#,,...            
      ...,%*/,,/*//(##//*(**,,(,..,,,/,/((,.,/..........,,%,*#,....             
       ...,(*(,,*(*(*(##*/*,*,,(,...,*%*,,/#/,........,,#*,**,....              
        ...,*(/,,,*(,*/((,,,/,.,/,,,,(**(,,#((,.....,,%*,*%,....                
         ....,#*%,,,,(/,,,*%,..,(,,*#,..,(,*,,*#(###/,,,#*.....                 
           ....*(*(,,..,,,,.....(,,%,...../#,.......,*%*.....                   
             ...,*(,(,.........,*,(*,.......//,,,,/#*.....                      
               ....*%*,//,,,,,#,,//....   .............                         
                 ....,*%**,,.,,,%,...                                           
                     ....,,***,....                                             
                         . .                                                    
                                                                                

"I never fail, I learned 10 000 ways that doesn't work!"                                                                                
                                    - Thomas Edison & Me

            Infinisoft World Inc.
            www.infinisoft.world
            info@infinisoft.world
            All rights reserved 2023
```
// scaffold.js
const fs = require('fs');
const path = require('path');

const createDirIfNotExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
};

const writeToFile = (filePath, content) => {
  fs.writeFileSync(filePath, content);
};

// Create src directory
const srcDir = path.join(__dirname, 'src');
createDirIfNotExists(srcDir);

// iBrainHub.js content
const iBrainHubContent = `
const iBrainHub = () => {
  const events = new Map();
  const on = (eventName, handler) => {
    const id = Symbol(handler);
    const handlers = events.get(eventName) ?? new Map();
    handlers.set(id, handler);
    events.set(eventName, handlers);
    return () => handlers.delete(id);
  };
  const emit = (eventName, payload) => {
    const handlers = events.get(eventName);
    if (handlers) {
      handlers.forEach((handler) => handler(payload));
    }
  };
  return { on, emit };
};

module.exports = iBrainHub;
`;

// iBrainState.js content
const iBrainStateContent = `
const iBrainState = (initialState) => {
  let state = initialState;
  const getState = () => state;
  const mutate = (newState) => {
    state = newState;
    return state;
};
return { getState, mutate };
};

module.exports = iBrainState;
`;

// iBrainMicroStore.js content
const iBrainMicroStoreContent = `
const iBrainState = require('./iBrainState');
const iBrainHub = require('./iBrainHub');

const iBrainMicroStore = (initialState) => {
const { getState, mutate } = iBrainState(initialState);
const { on, emit } = iBrainHub();
return { getState, mutate, on, emit };
};

module.exports = iBrainMicroStore;
`;

// package.json content
const packageJsonContent = `
{
"name": "ibrain-microstore",
"version": "1.0.0",
"description": "Micro event-driven pub/sub system combined with micro synchronous state management.",
"main": "src/iBrainMicroStore.js",
"scripts": {
  "test": "echo \\"Error: no test specified\\" && exit 1"
},
"keywords": ["microstore", "pubsub", "state management"],
"author": "",
"license": "ISC"
}
`;

// README.md content
const readmeContent = `
# iBrain MicroStore

iBrain MicroStore is a micro event-driven pub/sub system combined with micro synchronous state management.

## Usage Example

\`\`\`javascript
const iBrainMicroStore = require('./src/iBrainMicroStore');

const store = iBrainMicroStore({ count: 0 });
store.on('increment', (payload) => {
const currentState = store.getState();
store.mutate({ count: currentState.count + payload.amount });
});
store.emit('increment', { amount: 1 });
console.log(store.getState()); // Output: { count: 1 }
\`\`\`
`;

// Write files
writeToFile(path.join(srcDir, 'iBrainHub.js'), iBrainHubContent);
writeToFile(path.join(srcDir, 'iBrainState.js'), iBrainStateContent);
writeToFile(path.join(srcDir, 'iBrainMicroStore.js'), iBrainMicroStoreContent);
writeToFile(path.join(__dirname, 'package.json'), packageJsonContent);
writeToFile(path.join(__dirname, 'README.md'), readmeContent);

console.log('Scaffold script completed successfully.');

