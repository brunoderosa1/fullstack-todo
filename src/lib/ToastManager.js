let instance;

class ToastManager {
  constructor() {
    if (instance) {
      return instance; // Return existing instance if already created
    }

    instance = this;
    this.queue = [];
  }

  addToast(message, type, duration = 5000) {
    const id = Math.random().toString(36).substring(2, 15);
    this.queue.push({ id, message, type, duration });

    // Process the queue and update toast state
    this._processQueue();
  }

  removeToast(id) {
    this.queue = this.queue.filter((toast) => toast.id !== id);

    // Process the queue and update toast state
    this._processQueue();
  }

  _processQueue() {
    // Handle empty queue
    if (!this.queue.length) {
      return;
    }

    const nextToast = this.queue[0];
    this.displayedToast = nextToast;
    this.queue.shift(); // Remove the processed toast from the queue

    // Schedule removal of the toast after its duration
    setTimeout(() => {
      this.displayedToast = null;
      this._processQueue();
    }, nextToast.duration);
  }

  static getInstance() {
    if (!instance) {
      instance = new ToastManager();
    }
    return instance;
  }
}

class ToastManager2 {
  constructor() {
    if (instance) {
      return instance; // Return existing instance if already created
    }
    
    instance = this;
    this.queue = [];
  }

  enqueue(toast) {
    if (!toast) { 
      return;
    }
    if (typeof toast !== 'object') {
      return
    }
    if (this.length === 2) {
      return this.dequeue();
    }

    this.queue.push(toast);
  }

  dequeue() {
    return this.queue.shift();
  }

  isEmpty() {
    return this.queue.length === 0;
  }

  get length() {
    return this.queue.length;
  }

  get queue() {
    return this.queue;
  }

  static getInstance() {
    if (!instance) {
      instance = new ToastManager2();
    }
    return instance;
  } 
}

export default ToastManager2;
