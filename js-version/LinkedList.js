export function LinkedListFactory() {
  let length = 0;
  let head = null;
  return {
    append,
    indexOf,
    insertAt,
    remove,
    removeAt,
    toString,
    isEmpty,
    head,
    size,
  };
  function append(element) {
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
    };
    const isHeadPosition = position === 0;
    let currentNode = head;
    if (isHeadPosition) {
      node.next = currentNode;
      head = node;
    } else {
      let previousNode = null;
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
  }
  function removeAt(position) {
    const isPositionInTheRange = position > -1 && position < length;
    if (!isPositionInTheRange) {
      return null;
    }
    let currentNode = head;
    const isHeadPosition = position === 0;
    if (isHeadPosition) {
      head = currentNode.next;
    } else {
      let index = 0;
      let previousNode = null;
      while (index++ < position) {
        previousNode = currentNode;
        currentNode = currentNode.next;
      }
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
