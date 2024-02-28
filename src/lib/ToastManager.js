let instance;

class ToastManager {
    constructor() {
        if (instance) {
            return instance;
        }
        instance = this;
        this.queue = [];
    }

    enqueue(toast) {
        this.queue.push(toast);
        setInterval(() => {
            if (this.queue.length > 0) {
                const indexOfToast = this.queue.indexOf(toast);
                this.queue.splice(indexOfToast, 1);
            }
        }, toast?.duration ?? 500);
        if (this.queue.length > 2) this.queue.shift();
    }

    getQueue() {
        return this.queue;
    }
}

const toastManagerInstance = new ToastManager();

Object.freeze(toastManagerInstance);

export default toastManagerInstance;
