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
```;

const iBrainState = require("./iBrainState");
const iBrainHub = require("./iBrainHub");

/**
 * iBrainMicroStore is a synchronous micro state management library
 * designed for use in microapps and is one of the pillar foundations of IBrain.
 * @param {Object} initialState - The initial state of the store.
 */
const iBrainMicroStore = (initialState) => {
  const { getState, mutate } = iBrainState(initialState);
  const { on, emit } = iBrainHub();
  return { getState, mutate, on, emit };
};

modules.exports = iBrainMicroStore ;