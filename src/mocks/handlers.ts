import { http, HttpResponse } from "msw";

export const mockTokenKey = "xxx";

export const usersHandlers = [
  http.post(`${import.meta.env.VITE_APP_API_URL}users/login`, (): void => {
    return HttpResponse.json({ token: mockTokenKey }, { status: 200 });
  }),
];
