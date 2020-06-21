import LinkedList from "../linked-list/LinkedList";

export default class Queue {
  constructor() {
    this.linkedList = new LinkedList();
  }

  enqueue(value) {
    this.linkedList.append(value);
  }

  toString(callback) {
    return this.linkedList.toString(callback);
  }

  dequeue() {
    const result = this.linkedList.deleteHead();
    return result.value;
  }

  peek() {
    return this.linkedList.head?.value || null;
  }

  isEmpty() {
    return !this.linkedList.head;
  }
}
