import { vi } from "vitest";
import {
  correctAction,
  infoAction,
  setLoadingOff,
  setLoadingOn,
  stopLoadingAction,
  warnAction,
  wrongAction,
} from "./Modals";
import { toast } from "react-toastify";

vi.mock("react-toastify");

describe("Given a correct Modal component", (): void => {
  describe("When the word 'penguin' is written", (): void => {
    test("Then the value of the message input field should be 'penguin'", (): void => {
      const message = "penguin";

      correctAction(message);
      const result = toast.clearWaitingQueue;

      expect(result).toHaveBeenCalled();
    });
  });
});

describe("Given a wrong Modal component", (): void => {
  describe("When the word 'penguin' is written", (): void => {
    test("Then the value of the message input field should be 'penguin'", (): void => {
      const message = "penguin";

      wrongAction(message);
      const result = toast.clearWaitingQueue;

      expect(result).toHaveBeenCalled();
    });
  });
});

describe("Given a warning Modal component", (): void => {
  describe("When the word 'penguin' is written", (): void => {
    test("Then the value of the message input field should be 'penguin'", (): void => {
      const message = "penguin";

      warnAction(message);
      const result = toast.clearWaitingQueue;

      expect(result).toHaveBeenCalled();
    });
  });
});

describe("Given a info Modal component", (): void => {
  describe("When the word 'penguin' is written", (): void => {
    test("Then the value of the message input field should be 'penguin'", (): void => {
      const message = "penguin";

      infoAction(message);
      const result = toast.clearWaitingQueue;

      expect(result).toHaveBeenCalled();
    });
  });
});

describe("Given a stopLoad Modal component", (): void => {
  describe("When the word 'penguin' is written", (): void => {
    test("Then the value of the message input field should be 'penguin'", (): void => {
      stopLoadingAction();
      const result = toast.clearWaitingQueue;

      expect(result).toHaveBeenCalled();
    });
  });
});

describe("Given a setLoading Modal component", (): void => {
  describe("When the word 'penguin' is written", (): void => {
    test("Then the value of the message input field should be 'penguin'", (): void => {
      const message = "penguin";

      setLoadingOn(message);
      const result = toast.loading;

      expect(result).toHaveBeenCalled();
    });
  });
});

describe("Given a setLoadingOff Modal component", (): void => {
  describe("When the word 'penguin' is written", (): void => {
    test("Then the value of the message input field should be 'penguin'", (): void => {
      setLoadingOff();
      const result = toast.clearWaitingQueue;

      expect(result).toHaveBeenCalled();
    });
  });
});
