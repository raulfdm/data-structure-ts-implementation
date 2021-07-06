interface Node<T> {
  element: T;
  next: Node<T> | null;
  prev: Node<T> | null;
}

export interface DoublyLinkedList<T> {
  append(element: T): void;
  indexOf(element: T): number;
  insertAt(position: number, element: T): boolean;
  remove(element: T): null | T;
  removeAt(position: number): null | T;
  toString(): string;
  head: Node<T> | null;
  tail: Node<T> | null;
  isEmpty(): boolean;
  size(): number;
}

export function DoublyLinkedListFactory<T>(): DoublyLinkedList<T> {
  let length = 0;
  let head: Node<T> | null = null;
  let tail: Node<T> | null = null;

  return {
    append,
    indexOf,
    insertAt,
    remove,
    removeAt,
    toString,
    isEmpty,
    get head() {
      return head;
    },
    get tail() {
      return tail;
    },
    size,
  };

  function append(element: T) {
    const node: Node<T> = {
      element,
      next: null,
      prev: null,
    };

    if (head === null) {
      head = node;
      tail = node;
    } else {
      let currentElement = head;

      while (currentElement.next) {
        currentElement = currentElement.next;
      }

      // Replace "null" with the new node
      currentElement.next = node;

      node.prev = currentElement;

      // Update tail with node because append will be always to the end
      tail = node;
    }

    length++;
  }

  function indexOf(element: T) {
    let currentNode = head;
    let index = 0;

    while (currentNode) {
      if (element === currentNode.element) {
        return index;
      }

      index++;
      currentNode = currentNode.next;
    }

    return -1;
  }

  function insertAt(position: number, element: T) {
    const isPositionInTheRange = position > -1 && position <= length;

    if (!isPositionInTheRange) {
      return false;
    }

    const node: Node<T> = {
      element,
      next: null,
      prev: null,
    };

    const isHeadPosition = position === 0;
    const isTailPosition = position === length;

    let currentNode = head;

    if (isHeadPosition) {
      /**
       * This handles the case where the list is empty and
       * we want to insert an element in the first position
       */
      if (head === null) {
        tail = node;
      } else {
        /**
         * ensure: node(new head) <-> currentNode (old head)
         */
        currentNode!.prev = node;
        node.next = currentNode;
      }

      /**
       * For both cases node needs to be the new head
       */
      head = node;
    } else if (isTailPosition) {
      (tail as Node<T>).next = node;
      node.prev = tail;
      tail = node;
    } else {
      let previousNode: Node<T> | null = null;
      let index = 0;

      while (index++ < position) {
        previousNode = currentNode as Node<T>;
        currentNode = currentNode!.next;
      }

      previousNode!.next = node;
      currentNode!.prev = node;

      node.prev = previousNode;
      node.next = currentNode;
    }

    length++;

    return true;
  }

  function removeAt(position: number) {
    const isPositionInTheRange = position > -1 && position < length;

    if (!isPositionInTheRange) {
      return null;
    }

    let currentNode = head;

    const isHeadPosition = position === 0;
    const isTailPosition = position === length - 1;

    if (isHeadPosition) {
      head = (currentNode as Node<T>).next;
    } else if (isTailPosition) {
      currentNode = tail;
      tail = (currentNode as Node<T>).prev;
    } else {
      let index = 0;
      let previousNode: Node<T> | null = null;

      while (index++ < position) {
        previousNode = currentNode;
        currentNode = (currentNode as Node<T>).next;
      }

      /**
       * currentNode will only be null when I'm removing the last element
       * but this case is being handled by `isTailPosition` case
       */
      (currentNode!.next as Node<T>).prev = previousNode;
      (previousNode as Node<T>).next = (currentNode as Node<T>).next;
    }

    length--;

    return (currentNode as Node<T>).element;
  }

  function remove(element: T) {
    const elementIndex = indexOf(element);

    return removeAt(elementIndex);
  }

  function toString() {
    let result = '';
    let current = head;

    while (current) {
      result += `${current.element}${current.next ? ', ' : ''}`;

      current = current.next;
    }

    return result;
  }

  function isEmpty() {
    return length === 0;
  }

  function size() {
    return length;
  }
}
