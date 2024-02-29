let instance;

/* The `ToastManager` class manages a queue of toast messages, ensuring a maximum length of 2 and
removing messages after a specified duration. */
class ToastManager {
    constructor() {
        if (instance) {
            return instance;
        }
        instance = this;
        this.queue = [];
    }

    /**
     * The `enqueue` function adds a toast message to a queue, removes it after a specified duration,
     * and ensures the queue length does not exceed 2.
     * @param toast - The `toast` parameter in the `enqueue` function represents a message or
     * notification that is added to a queue. It seems like the `enqueue` function is designed to add a
     * `toast` to the queue, remove it after a certain duration, and ensure that the queue does not
     * exceed a length
     */
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
