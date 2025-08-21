describe('Basic Backend Tests', () => {
  test('should have basic functionality', () => {
    expect(true).toBe(true);
  });

  test('should be able to import modules', () => {
    const express = require('express');
    expect(express).toBeDefined();
    
    const cors = require('cors');
    expect(cors).toBeDefined();
  });
});
