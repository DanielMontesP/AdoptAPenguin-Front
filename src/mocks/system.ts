import { IProcess } from "../app/redux/types/system/systemInterfaces";

export const mockProcess: IProcess = {
  allProcess: [{ process: "" }],
  server: { path: "Test", connected: true, status: "Test" },
};

export const mockProcesses: IProcess[] = [
  {
    allProcess: [{ process: "" }],
    server: { path: "Test", connected: true, status: "Test" },
  },
];
