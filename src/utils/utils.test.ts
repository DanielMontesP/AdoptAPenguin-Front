import { resizeFile } from "./utils";

jest.mock("react-image-file-resizer", () => ({
  ...jest.requireActual("react-image-file-resizer"),
  Resizer: () => jest.fn().mockResolvedValue(true),
  imageFileResizer: () => jest.fn().mockResolvedValue(true),
}));

describe("Given a Resizer component", () => {
  describe("When called with file name", () => {
    test("Then resizeFile() is called", () => {
      const mockBlob = new File([], "name");
      const Resizer = jest.fn().mockReturnValue(mockBlob);
      const imageFileResizer = jest.fn().mockResolvedValue(true);
      resizeFile(mockBlob);

      expect(Resizer).not.toHaveBeenCalled();
      expect(imageFileResizer).not.toHaveBeenCalled();
    });
  });
});
