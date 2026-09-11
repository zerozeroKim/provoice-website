const STORAGE_KEY = 'provoice_mock_login';
const AUTH_EVENT = 'provoice-auth-change';

export const MOCK_CREDENTIALS = { id: 'test', password: '1234' };

export function isLoggedIn() {
  return localStorage.getItem(STORAGE_KEY) === '1';
}

export function login() {
  localStorage.setItem(STORAGE_KEY, '1');
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export function logout() {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export function onAuthChange(callback: () => void) {
  window.addEventListener(AUTH_EVENT, callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener(AUTH_EVENT, callback);
    window.removeEventListener('storage', callback);
  };
}
