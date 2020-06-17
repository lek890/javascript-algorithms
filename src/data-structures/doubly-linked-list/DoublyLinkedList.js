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

  deleteTail() {
    // let deletedNode = null;
    // if (this.tail) {
    //   deletedNode = this.tail;
    //   if (this.tail.previous) {
    //     this.tail = this.tail.previous;
    //     this.tail.next = null;
    //   } else {
    //     this.tail = null;
    //     this.head = null;
    //   }
    // }
    // return deletedNode;

    // improvised

    if (!this.tail) {
      return null;
    }

    if (this.head == this.tail) {
      const deleteTail = this.tail;
      this.head = null;
      this.tail = null;
      return deleteTail;
    }

    const deletedTail = this.tail;
    this.tail = this.tail.previous;
    this.tail.next = null;

    return deletedTail;
  }

  deleteHead() {
    if (!this.head) {
      return null;
    }

    if (this.head == this.tail) {
      const deletedNode = this.tail;
      this.head = null;
      this.tail = null;
      return deletedNode;
    }

    const deletedNode = this.head;
    this.head = this.head.next;
    this.head.previous = null;
    return deletedNode;
  }

  find(query, callback) {
    if (!this.head) {
      return null;
    }

    let currentNode = this.head;

    while (currentNode) {
      if (callback && callback(currentNode.value, query.value)) {
        return currentNode;
      }
      if (this.compare.equal(currentNode.value, query.value)) {
        return currentNode;
        break;
      }
      currentNode = currentNode.next;
    }

    return null;
  }
}
