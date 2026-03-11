import { mockMessages } from "../../../../mocks/messages";
import { mockloggedUser, mocklogOutUser } from "../../../../mocks/users";
import userReducer, {
  createUserDataActionCreator,
  editUserActionCreator,
  getUserMessagesActionCreator,
  getUserNewMessagesActionCreator,
  loadUserDataActionCreator,
  logInActionCreator,
  logOutActionCreator,
} from "./userSlice";

describe("Given a userSlice reducer", (): void => {
  describe("When it receives a user and a login action", (): void => {
    test("Then it should return the same user but logged", (): void => {
      const action = logInActionCreator(mocklogOutUser);
      const loggedUser = userReducer(mocklogOutUser, action);

      expect(loggedUser).toEqual(mockloggedUser);
    });
  });
  describe("When it receives a logout action", (): void => {
    test("Then it should switch the user logged property at false", (): void => {
      const expectedUserStatus = false;

      const logoutAction = logOutActionCreator();
      const loggedoutUser = userReducer(mockloggedUser, logoutAction);

      expect(loggedoutUser.logged).toEqual(expectedUserStatus);
    });
  });
  describe("When loadUserData is called", (): void => {
    test("Then it should switch the user logged property at false", (): void => {
      const expectedUserStatus = true;

      const loadUser = loadUserDataActionCreator(mockloggedUser);
      const loggedoutUser = userReducer(mockloggedUser, loadUser);

      expect(loggedoutUser.logged).toEqual(expectedUserStatus);
    });
  });
  describe("When editUser is called", (): void => {
    test("Then it should switch the user logged property at false", (): void => {
      const expectedUserStatus = true;

      const editUser = editUserActionCreator(mockloggedUser);
      const loggedoutUser = userReducer(mockloggedUser, editUser);

      expect(loggedoutUser.logged).toEqual(expectedUserStatus);
    });
  });

  describe("When createUser is called", (): void => {
    test("Then it should switch the user logged property at false", (): void => {
      const expectedUserStatus = true;

      const createUser = createUserDataActionCreator(mockloggedUser);
      const loggedoutUser = userReducer(mockloggedUser, createUser);

      expect(loggedoutUser.logged).toEqual(expectedUserStatus);
    });
  });

  describe("When getUserMessages is called", (): void => {
    test("Then it should switch the user logged property at false", (): void => {
      const expectedUserStatus = true;

      const getUserMessages = getUserMessagesActionCreator(mockMessages);
      const loggedoutUser = userReducer(mockloggedUser, getUserMessages);

      expect(loggedoutUser.logged).toEqual(expectedUserStatus);
    });
  });

  describe("When getUserNewMessages is called", (): void => {
    test("Then it should switch the user logged property at false", (): void => {
      const expectedUserStatus = true;

      const getUserNewMessages = getUserNewMessagesActionCreator(mockMessages);
      const loggedoutUser = userReducer(mockloggedUser, getUserNewMessages);

      expect(loggedoutUser.logged).toEqual(expectedUserStatus);
    });
  });
});
