import { DoublyLinkedListFactory, DoublyLinkedList } from '../DoublyLinkedList';

describe('fn: DoublyLinkedListFactory', () => {
  let doublyLinkedList: DoublyLinkedList<any>;

  beforeEach(() => {
    doublyLinkedList = DoublyLinkedListFactory();
  });

  describe('.append()', () => {
    it('adds elements to the end of the list', () => {
      const element = 10;
      doublyLinkedList.append(element);

      expect(doublyLinkedList.head.element).toBe(element);
      expect(doublyLinkedList.tail.element).toBe(element);

      expect(doublyLinkedList.size()).toBe(1);

      const lastElement = 'foobar';
      doublyLinkedList.append(30);
      doublyLinkedList.append(lastElement);

      expect(doublyLinkedList.head.element).toBe(element);
      expect(doublyLinkedList.toString()).toBe('10, 30, foobar');
      expect(doublyLinkedList.tail.element).toBe(lastElement);
      expect(doublyLinkedList.size()).toBe(3);
    });
  });

  describe('.indexOf()', () => {
    it('return the index of an element appended', () => {
      const myObj = { name: 'test' };

      doublyLinkedList.append('abc');
      doublyLinkedList.append('z');
      doublyLinkedList.append('x');
      doublyLinkedList.append(myObj);

      expect(doublyLinkedList.indexOf(myObj)).toBe(3);
    });

    it('returns -1 if the element does not exist in the list', () => {
      const myObj = { name: 'unknown' };

      doublyLinkedList.append('abc');
      doublyLinkedList.append('z');
      doublyLinkedList.append('x');
      doublyLinkedList.append({ name: 'test' });

      expect(doublyLinkedList.indexOf(myObj)).toBe(-1);
    });
  });

  describe('.insertAt()', () => {
    describe('head', () => {
      it('inserts an element at first position when the list is empty', () => {
        expect(doublyLinkedList.head).toBe(null);
        expect(doublyLinkedList.tail).toBe(null);
        expect(doublyLinkedList.size()).toBe(0);

        const element = 30;
        doublyLinkedList.insertAt(0, element);

        const expectedNode = {
          element,
          prev: null,
          next: null,
        };

        expect(doublyLinkedList.head).toStrictEqual(expectedNode);
        expect(doublyLinkedList.tail).toStrictEqual(expectedNode);
        expect(doublyLinkedList.size()).toBe(1);
      });

      it('inserts an element at first position when the list has elements', () => {
        doublyLinkedList.append(50);
        doublyLinkedList.append(60);

        expect(doublyLinkedList.size()).toBe(2);

        const element = -30;
        doublyLinkedList.insertAt(0, element);

        expect(doublyLinkedList.head.element).toBe(element);
        expect(doublyLinkedList.tail.element).toBe(60);
        expect(doublyLinkedList.size()).toBe(3);
      });
    });

    describe('tail', () => {
      it('inserts an element at first position when the list has elements', () => {
        doublyLinkedList.append(50);
        doublyLinkedList.append(60);

        expect(doublyLinkedList.size()).toBe(2);

        const element = -30;
        doublyLinkedList.insertAt(2, element);

        expect(doublyLinkedList.tail.element).toBe(element);
        expect(doublyLinkedList.tail.prev.element).toBe(60);
        expect(doublyLinkedList.size()).toBe(3);
      });
    });

    it('inserts element in a specific position and returns true', () => {
      doublyLinkedList.append(10);
      doublyLinkedList.append(20);
      doublyLinkedList.append(30);

      expect(doublyLinkedList.size()).toBe(3);
      expect(doublyLinkedList.toString()).toBe('10, 20, 30');

      expect(doublyLinkedList.insertAt(1, 60)).toBe(true);
      expect(doublyLinkedList.toString()).toBe('10, 60, 20, 30');
      expect(doublyLinkedList.size()).toBe(4);

      expect(doublyLinkedList.insertAt(0, 'test')).toBe(true);
      expect(doublyLinkedList.toString()).toBe('test, 10, 60, 20, 30');
      expect(doublyLinkedList.size()).toBe(5);
    });

    it('returns false if the position does not exist in the list', () => {
      doublyLinkedList.append(10);
      expect(doublyLinkedList.size()).toBe(1);

      expect(doublyLinkedList.insertAt(-1, 60)).toBe(false);
      expect(doublyLinkedList.insertAt(3, 60)).toBe(false);

      expect(doublyLinkedList.toString()).toBe('10');
      expect(doublyLinkedList.size()).toBe(1);
    });
  });

  describe('.removeAt()', () => {
    it('returns null if position does not exist in the list', () => {
      doublyLinkedList.append(30);
      doublyLinkedList.append(10);

      expect(doublyLinkedList.size()).toBe(2);

      expect(doublyLinkedList.removeAt(-1)).toBe(null);
      expect(doublyLinkedList.removeAt(4)).toBe(null);
      expect(doublyLinkedList.size()).toBe(2);
    });

    it('returns null if the list is empty', () => {
      expect(doublyLinkedList.size()).toBe(0);
      expect(doublyLinkedList.removeAt(0)).toBe(null);
      expect(doublyLinkedList.size()).toBe(0);
    });

    describe('head case', () => {
      it('returns the element and remove it from the list (single element)', () => {
        const expectedElement = 10;

        doublyLinkedList.append(expectedElement);

        expect(doublyLinkedList.size()).toBe(1);

        const removedElement = doublyLinkedList.removeAt(0);

        expect(removedElement).toBe(expectedElement);
        expect(doublyLinkedList.size()).toBe(0);
      });

      it('returns the element and remove it from the list (multi element list)', () => {
        const expectedElement = 10;

        doublyLinkedList.append(expectedElement);
        doublyLinkedList.append(30);
        doublyLinkedList.append(60);

        expect(doublyLinkedList.toString()).toBe('10, 30, 60');
        expect(doublyLinkedList.size()).toBe(3);

        const removedElement = doublyLinkedList.removeAt(0);

        expect(removedElement).toBe(expectedElement);
        expect(doublyLinkedList.head.element).not.toBe(expectedElement);
        expect(doublyLinkedList.size()).toBe(2);
      });
    });

    describe('tail case', () => {
      it('returns the element and remove it from the list (single element)', () => {
        const expectedElement = 998;

        doublyLinkedList.append(expectedElement);

        expect(doublyLinkedList.size()).toBe(1);

        const removedElement = doublyLinkedList.removeAt(0);

        expect(removedElement).toBe(expectedElement);
        expect(doublyLinkedList.size()).toBe(0);
      });

      it('returns the element and remove it from the list (multi element list)', () => {
        const expectedElement = 53;

        doublyLinkedList.append(30);
        doublyLinkedList.append(60);
        doublyLinkedList.append(expectedElement);

        expect(doublyLinkedList.tail.element).toBe(expectedElement);
        expect(doublyLinkedList.size()).toBe(3);

        const removedElement = doublyLinkedList.removeAt(2);

        expect(removedElement).toBe(expectedElement);

        expect(doublyLinkedList.tail.element).not.toBe(expectedElement);
        expect(doublyLinkedList.tail.element).toBe(60);

        expect(doublyLinkedList.size()).toBe(2);
      });
    });

    describe('body case', () => {
      it('returns the element and remove it from the list', () => {
        const expectedElement = -30;

        doublyLinkedList.append(10);
        doublyLinkedList.append(100);
        doublyLinkedList.append(expectedElement);
        doublyLinkedList.append(50);

        expect(doublyLinkedList.toString()).toBe('10, 100, -30, 50');
        expect(doublyLinkedList.size()).toBe(4);

        const removedElement = doublyLinkedList.removeAt(2);

        expect(removedElement).toBe(expectedElement);
        expect(doublyLinkedList.toString()).toBe('10, 100, 50');
        expect(doublyLinkedList.size()).toBe(3);
      });

      it('recreates the previous and next node links', () => {
        const expectedElement = -2;

        doublyLinkedList.append(10);
        doublyLinkedList.append(100);
        doublyLinkedList.append(expectedElement); // index 2
        doublyLinkedList.append(50);

        const expectedNode = doublyLinkedList.tail.prev;

        expect(expectedNode.element).toBe(expectedElement);
        expect(doublyLinkedList.size()).toBe(4);

        const removedElement = doublyLinkedList.removeAt(2);

        const updatedNode = doublyLinkedList.tail.prev;
        // Validate relink 100 <-> 50
        expect(updatedNode.element).toBe(100);
        expect(updatedNode.next.element).toBe(50);

        expect(removedElement).toBe(expectedElement);
        expect(doublyLinkedList.size()).toBe(3);
      });
    });
  });

  describe('.remove()', () => {
    it('returns null if the element to be remove does not exists', () => {
      expect(doublyLinkedList.remove(10)).toBe(null);
    });

    it('returns the element itself and remove from the list', () => {
      const element = 10;
      doublyLinkedList.append(-10);
      doublyLinkedList.append(element);
      doublyLinkedList.append(60);
      expect(doublyLinkedList.toString()).toBe('-10, 10, 60');
      expect(doublyLinkedList.size()).toBe(3);
      expect(doublyLinkedList.remove(element)).toBe(element);
      expect(doublyLinkedList.toString()).toBe('-10, 60');
      expect(doublyLinkedList.size()).toBe(2);
    });
  });

  describe('.isEmpty()', () => {
    it('returns true if the list does not contain element', () => {
      expect(doublyLinkedList.isEmpty()).toBe(true);
    });

    it('returns false if the list contains element', () => {
      doublyLinkedList.append(10);
      expect(doublyLinkedList.isEmpty()).toBe(false);
    });
  });

  describe('.head', () => {
    it('returns null when the list is empty', () => {
      expect(doublyLinkedList.head).toBe(null);
    });

    it('returns the node containing the first element added', () => {
      const element = 'my name';

      doublyLinkedList.append(element);

      expect(doublyLinkedList.head.element).toBe(element);
    });
  });

  describe('.tail', () => {
    it('is null when the list is empty', () => {
      expect(doublyLinkedList.tail).toBe(null);
    });

    it("returns the same node as head when it's a list of a single element", () => {
      doublyLinkedList.append(10);

      expect(doublyLinkedList.tail).toStrictEqual(doublyLinkedList.head);
    });

    it('returns the last node of the list', () => {
      const expectedElement = 'Max';

      doublyLinkedList.append('Carla');
      doublyLinkedList.append('Piet');
      doublyLinkedList.append(expectedElement);

      expect(doublyLinkedList.tail.element).toBe(expectedElement);
    });
  });
});
