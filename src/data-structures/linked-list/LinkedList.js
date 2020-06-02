import LinkedListNode from "./LinkedListNode";
import Comparator from "../../utils/comparator/Comparator";
export default class LinkedList {
  /**
   * @param {Function} [comparatorFunction]
   */
  constructor(comparatorFunction) {
    this.head = null;
    this.tail = null;
    this.compare = new Comparator(comparatorFunction);
  }
  //OMG :D :D
  // fromArray(inputArray) {
  //   if (inputArray) {
  //     const nodeArray = inputArray.map((item) => new LinkedListNode(item));

  //     nodeArray.map((item, index) => {
  //       if (!this.head) {
  //         this.head = item;
  //         this.head.next = nodeArray[index + 1];
  //       } else {
  //         item.next = nodeArray[index + 1];
  //       }
  //     });
  //   }
  // }

  fromArray(values) {
    values.forEach((value) => this.append(value));
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

  toString(formatter) {
    return this.toArray()
      .map((node) => node.toString(formatter))
      .toString();
  }

  append(value) {
    const newNode = new LinkedListNode(value);

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
    const newNode = new LinkedListNode(value, this.head);

    this.head = newNode;

    if (!this.tail) {
      this.tail = newNode;
    }
    return this;
  }

  // delete_scrap(value) {
  //   let deletedNode = null;

  //   if (!this.head) {
  //     return deletedNode;
  //   }

  //   let node = this.head;
  //   if (node.value == value) {
  //     deletedNode = node;

  //     if (!this.tail) {
  //       this.head = null;
  //     } else {
  //       this.head = this.head.next;
  //     }

  //     return true;
  //   }

  //   if (this.head) {
  //     node = this.head;
  //     let prev = null;
  //     while (node) {
  //       if (node.value == value) {
  //         deletedNode = node;
  //         if (prev) {
  //           prev.next = node.next;
  //         } else {
  //           this.head = node.next;
  //         }
  //       } else {
  //         prev = node;
  //       }
  //       node = node.next;
  //     }
  //   }

  //   return deletedNode;
  // }

  delete(value) {
    let deletedNode = null;

    if (!this.head) {
      return deletedNode;
    }

    while (this.head && this.compare.equal(this.head.value, value)) {
      deletedNode = this.head;
      this.head = this.head.next;
    }

    let currentNode = this.head;

    while (currentNode && currentNode.next) {
      if (this.compare.equal(currentNode.next.value, value)) {
        deletedNode = currentNode.next;
        currentNode.next = currentNode.next.next;
      } else {
        currentNode = currentNode.next;
      }
    }

    if (this.compare.equal(this.tail.value, value)) {
      this.tail = currentNode;
      deletedNode = currentNode;
    }
    return deletedNode;
  }

  // deleteTail2() {
  //   let currentNode = this.head;
  //   let prev = null;
  //   while (currentNode.next) {
  //     prev = currentNode;
  //     currentNode = currentNode.next;
  //   }

  //   if (prev) {
  //     prev.next = null;
  //     this.tail = prev;
  //   } else {
  //     this.tail = null;
  //     this.head = null;
  //   }

  //   return currentNode;
  // }

  deleteTail() {
    let deletedTail = this.tail;
    if (this.tail == this.head) {
      this.head = null;
      this.tail = null;

      return deletedTail;
    }

    let currentNode = this.head;
    while (currentNode.next) {
      if (currentNode.next.next) {
        currentNode = currentNode.next;
      } else {
        currentNode.next = null;
      }
    }

    this.tail = currentNode;

    return deletedTail;
  }

  // deleteHead() {
  //   let deletedHead = null;

  //   if (this.head == this.tail) {
  //     deletedHead = this.head;
  //     this.head = null;
  //     this.tail = null;
  //     return deletedHead;
  //   }

  //   if (this.head) {
  //     deletedHead = this.head;
  //     this.head = this.head.next;
  //   }

  //   return deletedHead;
  // }

  deleteHead() {
    let deletedHead = null;

    if (!this.head) {
      return deletedHead;
    }

    deletedHead = this.head;
    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }

    return deletedHead;
  }

  // find(item) {
  //   let itemToBeFound = null;

  //   if (!this.head && !this.tail) {
  //     return null;
  //   }

  //   let currentNode = this.head;
  //   while (currentNode) {
  //     if (this.compare.equal(currentNode.value, item.value)) {
  //       itemToBeFound = currentNode;
  //       currentNode = null;
  //     } else {
  //       currentNode = currentNode.next;
  //     }
  //   }

  //   return itemToBeFound;
  // }

  find({ value = undefined, callback = undefined }) {
    if (!this.head) {
      return null;
    }

    let currentNode = this.head;
    while (currentNode) {
      if (callback && callback(currentNode.value)) {
        return currentNode;
      }

      if (value && this.compare.equal(currentNode.value, value)) {
        return currentNode;
      }
      currentNode = currentNode.next;
    }

    return null;
  }

  reverse() {}
}
// tail == head > head.next?
// tail > currentnode.next.next
// empty list = !this.head
