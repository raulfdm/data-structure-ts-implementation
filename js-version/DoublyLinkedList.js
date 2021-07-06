export function DoublyLinkedListFactory() {
  let length = 0;
  let head = null;
  let tail = null;
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
  function append(element) {
    const node = {
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
  function insertAt(position, element) {
    const isPositionInTheRange = position > -1 && position <= length;
    if (!isPositionInTheRange) {
      return false;
    }
    const node = {
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
        currentNode.prev = node;
        node.next = currentNode;
      }
      /**
       * For both cases node needs to be the new head
       */
      head = node;
    } else if (isTailPosition) {
      tail.next = node;
      node.prev = tail;
      tail = node;
    } else {
      let previousNode = null;
      let index = 0;
      while (index++ < position) {
        previousNode = currentNode;
        currentNode = currentNode.next;
      }
      previousNode.next = node;
      currentNode.prev = node;
      node.prev = previousNode;
      node.next = currentNode;
    }
    length++;
    return true;
  }
  function removeAt(position) {
    const isPositionInTheRange = position > -1 && position < length;
    if (!isPositionInTheRange) {
      return null;
    }
    let currentNode = head;
    const isHeadPosition = position === 0;
    const isTailPosition = position === length - 1;
    if (isHeadPosition) {
      head = currentNode.next;
    } else if (isTailPosition) {
      currentNode = tail;
      tail = currentNode.prev;
    } else {
      let index = 0;
      let previousNode = null;
      while (index++ < position) {
        previousNode = currentNode;
        currentNode = currentNode.next;
      }
      /**
       * currentNode will only be null when I'm removing the last element
       * but this case is being handled by `isTailPosition` case
       */
      currentNode.next.prev = previousNode;
      previousNode.next = currentNode.next;
    }
    length--;
    return currentNode.element;
  }
  function remove(element) {
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
