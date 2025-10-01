import {User} from '../interfaces/userInterface';

const USER_STORAGE_KEY = 'user_data';

export const saveUser = (user: User): void => {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
};

export const getUser = (): User | null => {
  const userData = localStorage.getItem(USER_STORAGE_KEY);
  return userData ? JSON.parse(userData) : null;
};

export const removeUser = (): void => {
  localStorage.removeItem(USER_STORAGE_KEY);
};