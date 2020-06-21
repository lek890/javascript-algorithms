import LinkedList from "../linked-list/LinkedList";

export default class Stack {
  constructor() {
    this.linkedList = new LinkedList();
  }

  push(value) {
    this.linkedList.prepend(value);
  }

  toString(callback) {
    return this.linkedList.toString(callback);
  }

  isEmpty() {
    return !this.linkedList.head;
  }

  peek() {
    if (this.isEmpty()) {
      return null;
    }
    return this.linkedList.head.value;
  }

  toArray() {
    return this.linkedList.toArray().map((node) => node.value);
  }

  pop() {
    if (this.isEmpty()) {
      return null;
    }
    const node = this.linkedList.deleteHead();
    return node.value;
  }
}
