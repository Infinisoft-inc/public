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

/**
 * iBrainState - The state management module for managing application state.
 * Allows for retrieving and mutating the state synchronously.
 * @param {Object} [initialState] - The initial state of the application.
 */
const iBrainState = (initialState) => {
  let state = initialState;
  /**
   * Retrieves the current state of the application.
   * @returns {Object} The current state of the application.
   */
  const getState = () => state;
  /**
   * Mutates the state of the application.
   * @param {Object} newState - The new state to update the application with.
   * @returns {Object} The updated state of the application.
   */
  const mutate = (newState) => {
    state = newState;
    return state;
  };
  return { getState, mutate };
};

module.exports = iBrainState;
