class Attention {
    constructor(subject) {
      this.subject = subject;
      this.state = null;
      this.timer = 10;
      setInterval(() => {
        if (this.timer === 0) {
          this.state = null;
          this.subject=""
        } else {
          this.timer--;
        }
      }, 1000);
    }
  
    focus() {
      this.timer = 10;
    }

    talk(){
        this.focus()
    }

    hear(){
        this.focus();
    }
  }
  
  // Example usage
  const attention = new Attention("Math");

  setTimeout(() => {
    console.log(attention.subject); // "Lost"
  }, 11000);
  setInterval(() => {
    attention.talk()
  }, 5000);
  setTimeout(() => {
    console.log(attention.subject); // null
  }, 16000);
  