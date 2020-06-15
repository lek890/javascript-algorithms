import DoublyLinkedListNode from "./DoublyLinkedListNode";
import Comparator from "../../utils/comparator/Comparator";

export default class DoublyLinkedList {
  /**
   * @param {Function} [comparatorFunction]
   */
  constructor(comparatorFunction) {
    /** @var DoublyLinkedListNode */
    this.head = null;

    /** @var DoublyLinkedListNode */
    this.tail = null;

    this.compare = new Comparator(comparatorFunction);
  }

  toArray() {
    const nodes = [];
    let currentNode = this.head;
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }
    return nodes;
  }

  toString(callback) {
    return this.toArray()
      .map((node) => node.toString(callback))
      .toString();
  }

  append(value) {
    const newNode = new DoublyLinkedListNode(value, null, this.tail);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      return this;
    }

    this.tail.next = newNode;
    this.tail = newNode;
    return this;
  }

  prepend(value) {
    const newNode = new DoublyLinkedListNode(value, this.head, null);
    // if (!this.head) {
    //   this.head = newNode;
    //   this.tail = newNode;
    //   return this;
    // }

    // this.head.previous = newNode;
    // this.head = newNode;
    // return this;

    //improvised
    if (this.head) {
      this.head.previous = newNode;
    }
    this.head = newNode;

    if (!this.tail) {
      this.tail = newNode;
    }

    return this;
  }

  fromArray(inputArray) {
    // let currentNode = null;
    // inputArray.forEach((item) => {
    //   const nextNode = new DoublyLinkedListNode(item, null, currentNode);
    //   if (!this.head) {
    //     this.head = nextNode;
    //   }
    //   if (currentNode) {
    //     currentNode.next = nextNode;
    //   }
    //   currentNode = nextNode;
    // });

    // improvised;
    inputArray.forEach((value) => this.append(value));
    return this;
  }

  delete(value) {
    let deletedNode = null;

    if (!this.head) {
      return deletedNode;
    }

    let currentNode = this.head;

    if (currentNode == value) {
      this.head = currentNode.next;
      currentNode = this.head;
    }

    while (currentNode) {
      if (value == currentNode.toString()) {
        const nextNode = currentNode.next;
        const previousNode = currentNode.previous;

        deletedNode = currentNode;
        if (nextNode) nextNode.previous = previousNode;

        if (previousNode) previousNode.next = nextNode;
      }
      currentNode = currentNode.next;
    }

    return deletedNode;
  }
}
