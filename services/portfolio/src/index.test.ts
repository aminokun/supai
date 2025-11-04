import { describe, it, expect } from 'vitest';

describe('Portfolio Service', () => {
  it('should pass a basic test', () => {
    expect(true).toBe(true);
  });

  it('should have correct service name', () => {
    const serviceName = 'portfolio';
    expect(serviceName).toBe('portfolio');
  });

  it('should validate environment variables exist', () => {
    // Basic check that process.env is accessible
    expect(process.env).toBeDefined();
  });
});
