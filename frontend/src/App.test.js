import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Resume Analyzer header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Resume Analyzer/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders upload resume section', () => {
  render(<App />);
  const uploadElement = screen.getByText(/Upload Your Resume/i);
  expect(uploadElement).toBeInTheDocument();
});

test('renders AI-powered analysis text', () => {
  render(<App />);
  const aiText = screen.getByText(/AI-Powered Resume Analysis/i);
  expect(aiText).toBeInTheDocument();
});
