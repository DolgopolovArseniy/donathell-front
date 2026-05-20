/* global expect */
/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { describe, it, jest, beforeEach, afterEach } from '@jest/globals';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { User } from '../../../shared/types/types';

jest.unstable_mockModule('../../../shared/services/api', () => ({
  getMe: jest.fn(),
}));

const { AuthProvider, useAuth } = await import('./AuthContext');
const { getMe } = await import('../../../shared/services/api');

const mockGetMe = getMe as jest.MockedFunction<typeof getMe>;

const mockUser: User = {
  _id: "1",
  username: 'testuser',
  email: 'test@example.com',
  donationSlug: 'testuser-donate',
};

const TestComponent = () => {
  const { token, user, isAuthenticated, login, logout } = useAuth();
  return (
    <div>
      <div data-testid="auth-status">{isAuthenticated ? 'authenticated' : 'unauthenticated'}</div>
      <div data-testid="token">{token ?? 'no-token'}</div>
      <div data-testid="user">{user ? user.username : 'no-user'}</div>
      <button onClick={() => login('new-token', mockUser)}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
    mockGetMe.mockReset();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should provide default auth state without a token', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('auth-status')).toHaveTextContent('unauthenticated');
    expect(screen.getByTestId('token')).toHaveTextContent('no-token');
    expect(screen.getByTestId('user')).toHaveTextContent('no-user');
  });

  it('should login user and save token to localStorage', async () => {
    const user = userEvent.setup();
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await user.click(screen.getByText('Login'));

    expect(screen.getByTestId('auth-status')).toHaveTextContent('authenticated');
    expect(screen.getByTestId('token')).toHaveTextContent('new-token');
    expect(screen.getByTestId('user')).toHaveTextContent('testuser');
    expect(localStorage.getItem('token')).toBe('new-token');
  });

  it('should fetch user on mount if token exists in localStorage', async () => {
    localStorage.setItem('token', 'existing-token');
    mockGetMe.mockResolvedValueOnce(mockUser);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('auth-status')).toHaveTextContent('authenticated');
    expect(screen.getByTestId('token')).toHaveTextContent('existing-token');

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('testuser');
    });
    expect(mockGetMe).toHaveBeenCalledTimes(1);
  });

  it('should logout user and clear localStorage', async () => {
    const user = userEvent.setup();
    localStorage.setItem('token', 'existing-token');
    mockGetMe.mockResolvedValueOnce(mockUser);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('testuser');
    });

    await user.click(screen.getByText('Logout'));

    expect(screen.getByTestId('auth-status')).toHaveTextContent('unauthenticated');
    expect(screen.getByTestId('token')).toHaveTextContent('no-token');
    expect(screen.getByTestId('user')).toHaveTextContent('no-user');
    expect(localStorage.getItem('token')).toBeNull();
  });

  it('should logout if fetching user fails', async () => {
    localStorage.setItem('token', 'invalid-token');
    mockGetMe.mockRejectedValueOnce(new Error('Invalid token'));

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('auth-status')).toHaveTextContent('unauthenticated');
    });

    expect(localStorage.getItem('token')).toBeNull();
    expect(mockGetMe).toHaveBeenCalledTimes(1);

    consoleSpy.mockRestore();
  });
});
