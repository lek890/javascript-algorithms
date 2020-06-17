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
    // let deletedNode = null;

    // if (!this.head) {
    //   return deletedNode;
    // }

    // let currentNode = this.head;

    // if (this.compare.equal(currentNode.value, value)) {
    //   if (currentNode.next) {
    //     this.head = currentNode.next;
    //     currentNode = this.head;
    //     currentNode.previous = null;
    //   } else {
    //     this.head = null;
    //     this.tail = null;
    //   }
    // }

    // while (currentNode) {
    //   if (this.compare.equal(currentNode.value, value)) {
    //     deletedNode = currentNode;

    //     const nextNode = currentNode.next;
    //     const previousNode = currentNode.previous;

    //     if (nextNode) {
    //       nextNode.previous = previousNode;
    //     } else {
    //       this.tail = previousNode;
    //     }

    //     if (previousNode) {
    //       previousNode.next = nextNode;
    //     } else {
    //       this.head = nextNode;
    //     }
    //   }
    //   currentNode = currentNode.next;
    // }

    // return deletedNode;

    //improvised
    let deletedNode = null;

    if (!this.head) {
      return deletedNode;
    }

    let currentNode = this.head;

    while (currentNode) {
      if (this.compare.equal(currentNode.value, value)) {
        deletedNode = currentNode;
        if (this.head == deletedNode) {
          this.head = deletedNode.next;

          if (this.head) {
            this.head.previous = null;
          }

          if (this.tail == deletedNode) {
            this.tail = null;
          }
        } else if (this.tail == deletedNode) {
          this.tail = currentNode.previous;
          this.tail.next = null;
        } else {
          const previousNode = currentNode.previous;
          const nextNode = currentNode.next;

          previousNode.next = nextNode;
          nextNode.previous = previousNode;
        }
      }
      currentNode = currentNode.next;
    }

    return deletedNode;
  }
}
