import { LinkedListFactory, LinkedList } from "../LinkedList";

describe("LinkedListFactory", () => {
  let linkedList: LinkedList<any>;

  beforeEach(() => {
    linkedList = LinkedListFactory();
  });

  describe(".append()", () => {
    it("adds an element to the list", () => {
      linkedList.append(10);

      expect(linkedList.toString()).toBe("10");

      linkedList.append(30);
      linkedList.append("foobar");

      expect(linkedList.toString()).toBe("10, 30, foobar");
    });
  });

  describe(".indexOf()", () => {
    it("return the index of an element appended", () => {
      const myObj = { name: "test" };

      linkedList.append("abc");
      linkedList.append("z");
      linkedList.append("x");
      linkedList.append(myObj);

      expect(linkedList.indexOf(myObj)).toBe(3);
    });

    it("returns -1 if the element does not exist in the list", () => {
      const myObj = { name: "unknown" };

      linkedList.append("abc");
      linkedList.append("z");
      linkedList.append("x");
      linkedList.append({ name: "test" });

      expect(linkedList.indexOf(myObj)).toBe(-1);
    });
  });

  describe(".insertAt()", () => {
    it("inserts element in a specific position and returns true", () => {
      linkedList.append(10);
      linkedList.append(20);
      linkedList.append(30);

      expect(linkedList.toString()).toBe("10, 20, 30");

      expect(linkedList.insertAt(1, 60)).toBe(true);
      expect(linkedList.toString()).toBe("10, 60, 20, 30");

      expect(linkedList.insertAt(0, "test")).toBe(true);
      expect(linkedList.toString()).toBe("test, 10, 60, 20, 30");
    });

    it("returns false if the position does not exist in the list", () => {
      linkedList.append(10);

      expect(linkedList.insertAt(-1, 60)).toBe(false);
      expect(linkedList.insertAt(3, 60)).toBe(false);

      expect(linkedList.toString()).toBe("10");
    });
  });

  describe(".removeAt()", () => {
    it("returns null if position does not exist in the list", () => {
      linkedList.append(30);
      linkedList.append(10);

      expect(linkedList.removeAt(-1)).toBe(null);
      expect(linkedList.removeAt(4)).toBe(null);
    });

    it("returns null if list is empty", () => {
      expect(linkedList.removeAt(0)).toBe(null);
    });

    describe("head case", () => {
      it("returns the element and remove it from the list (single element)", () => {
        const element = 10;

        linkedList.append(element);
        expect(linkedList.toString()).toBe("10");

        expect(linkedList.removeAt(0)).toBe(element);
        expect(linkedList.toString()).toBe("");
      });

      it("returns the element and remove it from the list (multi element)", () => {
        const element = 10;

        linkedList.append(element);
        linkedList.append(30);
        linkedList.append(60);

        expect(linkedList.toString()).toBe("10, 30, 60");

        expect(linkedList.removeAt(0)).toBe(element);
        expect(linkedList.toString()).toBe("30, 60");
      });
    });

    it("returns the element and remove it from the list", () => {
      const element = -30;

      linkedList.append(10);
      linkedList.append(100);
      linkedList.append(element);
      linkedList.append(50);

      expect(linkedList.toString()).toBe("10, 100, -30, 50");

      expect(linkedList.removeAt(2)).toBe(element);
      expect(linkedList.toString()).toBe("10, 100, 50");
    });
  });

  describe(".remove()", () => {
    it("returns null if the element to be remove does not exists", () => {
      expect(linkedList.remove(10)).toBe(null);
    });

    it("returns the element itself and remove from the list", () => {
      const element = 10;

      linkedList.append(-10);
      linkedList.append(element);
      linkedList.append(60);

      expect(linkedList.toString()).toBe("-10, 10, 60");

      expect(linkedList.remove(element)).toBe(element);

      expect(linkedList.toString()).toBe("-10, 60");
    });
  });
});
