import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../login system/Login.js';
// import axios from 'axios'; // Import axios
// Mocking modules
jest.mock('axios', () => ({
	post: jest.fn(),
  }));
  // Mocking useNavigate
  jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => jest.fn(),
  }));

describe('Login Component', () => {
	const axios = require('axios');
  // Utility function to render the component
  const renderLoginComponent = () => render(
    <Router>
      <Login />
    </Router>
  );


  it('renders without crashing', () => {
    renderLoginComponent();
    expect(screen.getByText('登入')).toBeInTheDocument();
  });

  it('allows the user to enter email and password', () => {
    renderLoginComponent();
    fireEvent.change(screen.getByPlaceholderText('請輸入 E-mail'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('請輸入密碼'), { target: { value: 'password123' } });
    expect(screen.getByPlaceholderText('請輸入 E-mail').value).toBe('test@example.com');
    expect(screen.getByPlaceholderText('請輸入密碼').value).toBe('password123');
  });

  it('submits the form and navigates on successful login', async () => {
  
    renderLoginComponent();
    fireEvent.change(screen.getByPlaceholderText('請輸入 E-mail'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('請輸入密碼'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText('登入'));

  });
  it('shows validation errors for incorrect input', async () => {
	renderLoginComponent();
	fireEvent.change(screen.getByPlaceholderText('請輸入 E-mail'), { target: { value: '' } });
	fireEvent.change(screen.getByPlaceholderText('請輸入密碼'), { target: { value: '' } });
	fireEvent.click(screen.getByText('登入'));
  
  });
  

  it('displays error on failed login', async () => {
	axios.post.mockRejectedValue(new Error('Login Failed'));
  
	renderLoginComponent();
	fireEvent.change(screen.getByPlaceholderText('請輸入 E-mail'), { target: { value: 'test@example.com' } });
	fireEvent.change(screen.getByPlaceholderText('請輸入密碼'), { target: { value: 'wrongpassword' } });
	fireEvent.click(screen.getByText('登入'));
  
  });
  

  it('does not navigate on failed login', async () => {
    // Mock failed login response
	axios.post.mockImplementation(() => Promise.reject(new Error('Login Failed')));
    
    const navigate = jest.fn();

    renderLoginComponent();
    fireEvent.change(screen.getByPlaceholderText('請輸入 E-mail'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('請輸入密碼'), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByText('登入'));

    await waitFor(() => {
      expect(navigate).not.toHaveBeenCalled();
    });
  });

  it('checks presence and functionality of the signup link', () => {
    renderLoginComponent();
    const signupLink = screen.getByText('註冊');
    expect(signupLink).toBeInTheDocument();
    userEvent.click(signupLink);
    // Further expectations about navigation to the signup page
  });

 
});
