interface Node<T> {
  element: T;
  next: Node<T> | null;
}

export function LinkedListFactory<T>() {
  let length = 0;
  let head: Node<T> | null = null;

  return {
    append,
    print,
    removeAt,
    insertAt,
    toString,
    indexOf,
    remove,
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

  function print() {
    console.log(head);
  }

  function removeAt(position: number) {
    if (position > -1 && position < length) {
      let currentNode = head;

      if (position === 0) {
        head = currentNode.next;
        return currentNode.element;
      } else {
        let currentIndex = 0;
        let previousNode = null;

        while (currentIndex++ < position) {
          previousNode = currentNode;
          currentNode = currentNode.next;
        }

        // skip the current element
        previousNode.next = currentNode.next;

        length--;

        return currentNode.element;
      }
    } else {
      return null;
    }
  }

  function insertAt(position, element) {
    const node = {
      element,
      next: null,
    };

    let currentNode = head;

    if (position > -1 && position <= length) {
      if (position === 0) {
        node.next = currentNode;
        head = node;
      } else {
        let previousNode;
        let index = 0;

        while (index++ < position) {
          previousNode = currentNode;
          currentNode = currentNode.next;
        }

        previousNode.next = node;
        node.next = currentNode;
      }

      length++;

      return true;
    } else {
      return false;
    }
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

  function indexOf(element) {
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

  function remove(element) {
    const elementIndex = indexOf(element);

    return removeAt(elementIndex);
  }
}
