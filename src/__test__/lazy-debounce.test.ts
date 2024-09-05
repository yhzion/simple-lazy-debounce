import { SimpleLazyDebounce } from "../lazy-debounce";

describe("SimpleLazyDebounce", () => {
  let callback: jest.Mock;
  let debouncedFunction: (...args: unknown[]) => void;

  beforeEach(() => {
    callback = jest.fn();
    debouncedFunction = SimpleLazyDebounce(callback, {
      defaultDelay: 300,
      maxDelay: 500,
      latencyIncrement: 100,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  test("should return a debounced function", () => {
    expect(typeof debouncedFunction).toBe("function");
  });

  test("should delay the execution of the callback function", () => {
    jest.useFakeTimers();
    debouncedFunction();
    expect(callback).not.toHaveBeenCalled();

    setTimeout(() => {
      expect(callback).toHaveBeenCalled();
    }, 400);
    jest.runAllTimers();
  });

  test("should increase delay time with each invocation", () => {
    jest.useFakeTimers();
    debouncedFunction();

    const times = [100, 200, 300, 400, 500];
    times.forEach((time) => {
      setTimeout(() => {
        debouncedFunction();
        expect(callback).not.toHaveBeenCalled();
      }, time);
    });

    setTimeout(() => {
      expect(callback).toHaveBeenCalled();
    }, 1001);

    jest.runAllTimers();
  });

  test("should throw an error when defaultDelay is not a number", () => {
    expect(() => {
      SimpleLazyDebounce(() => {}, { defaultDelay: "300" as unknown as number });
    }).toThrow(
      "Invalid option value for key 'defaultDelay': 300. It must be a non-negative integer.",
    );
  });

  test("should throw an error when maxDelay is not a number", () => {
    expect(() => {
      SimpleLazyDebounce(() => {}, { maxDelay: "500" as unknown as number });
    }).toThrow(
      "Invalid option value for key 'maxDelay': 500. It must be a non-negative integer.",
    );
  });

  test("should throw an error when latencyIncrement is not a number", () => {
    expect(() => {
      SimpleLazyDebounce(() => {}, { latencyIncrement: "100" as unknown as number });
    }).toThrow(
      "Invalid option value for key 'latencyIncrement': 100. It must be a non-negative integer.",
    );
  });

  test("should throw an error when latencyIncrement is not a number", () => {
    expect(() => {
      SimpleLazyDebounce(() => {}, { latencyIncrement: -1 });
    }).toThrow(
      "Invalid option value for key 'latencyIncrement': -1. It must be a non-negative integer.",
    );
  });

  test("should pass arguments to the callback function", () => {
    jest.useFakeTimers();
    debouncedFunction("arg1", 42, { key: "value" });

    jest.runAllTimers();

    expect(callback).toHaveBeenCalledWith("arg1", 42, { key: "value" });
  });

  test("should handle multiple arguments correctly", () => {
    jest.useFakeTimers();
    debouncedFunction("firstArg", "secondArg", "thirdArg");

    jest.runAllTimers();

    expect(callback).toHaveBeenCalledWith("firstArg", "secondArg", "thirdArg");
  });

  test("should debounce multiple calls with arguments", () => {
    jest.useFakeTimers();
    debouncedFunction("initialArg");
    debouncedFunction("updatedArg");

    jest.runAllTimers();

    expect(callback).toHaveBeenCalledWith("updatedArg");
  });
});
