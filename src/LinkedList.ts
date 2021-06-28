interface Node<T> {
  element: T;
  next: Node<T> | null;
}

export interface LinkedList<T> {
  append(element: T): void;
  indexOf(element: T): number;
  insertAt(position: number, element: T): boolean;
  remove(element: T): null | T;
  removeAt(position: number): null | T;
  toString(): string;
}

export function LinkedListFactory<T>(): LinkedList<T> {
  let length = 0;
  let head: Node<T> | null = null;

  return {
    append,
    indexOf,
    insertAt,
    remove,
    removeAt,
    toString,
  };

  function append(element: T) {
    const node = {
      element,
      next: null,
    };

    if (head === null) {
      head = node;
    } else {
      let currentElement = head;

      while (currentElement.next) {
        currentElement = currentElement.next;
      }

      currentElement.next = node;
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
    };
    const isHeadPosition = position === 0;
    let currentNode = head;

    if (isHeadPosition) {
      node.next = currentNode;
      head = node;
    } else {
      let previousNode: Node<T> | null = null;
      let index = 0;

      while (index++ < position) {
        previousNode = currentNode as Node<T>;
        currentNode = (currentNode as Node<T>).next;
      }

      (previousNode as Node<T>).next = node;
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

    if (isHeadPosition) {
      head = (currentNode as Node<T>).next;
    } else {
      let index = 0;
      let previousNode: Node<T> | null = null;

      while (index++ < position) {
        previousNode = currentNode;
        currentNode = (currentNode as Node<T>).next;
      }

      // skip the current element
      (previousNode as Node<T>).next = (currentNode as Node<T>).next;

      length--;
    }

    return (currentNode as Node<T>).element;
  }

  function remove(element: T) {
    const elementIndex = indexOf(element);

    return removeAt(elementIndex);
  }

  function toString() {
    let result = "";
    let current = head;

    while (current) {
      result += `${current.element}${current.next ? ", " : ""}`;

      current = current.next;
    }

    return result;
  }
}
