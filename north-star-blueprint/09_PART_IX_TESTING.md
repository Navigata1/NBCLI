# PART IX: TESTING & VERIFICATION FRAMEWORK

---

## 42. TESTING PHILOSOPHY

> "Tests are not overhead—they are the only proof that your code works."

### 42.1 The Testing Pyramid

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         THE TESTING PYRAMID                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│                              ╱╲                                              │
│                             ╱  ╲                                             │
│                            ╱ E2E╲                 Few, Slow, Expensive       │
│                           ╱──────╲                                           │
│                          ╱        ╲                                          │
│                         ╱Integration╲            Some, Medium                │
│                        ╱────────────╲                                        │
│                       ╱              ╲                                       │
│                      ╱      Unit      ╲          Many, Fast, Cheap          │
│                     ╱──────────────────╲                                     │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  DISTRIBUTION GUIDE:                                                         │
│                                                                              │
│  UNIT TESTS (70% of tests)                                                   │
│  ───────────────────────────────────────────────────────────────────────    │
│  • Test individual functions/components in isolation                        │
│  • Mock external dependencies                                                │
│  • Fast execution (< 10ms per test)                                         │
│  • Run on every save/commit                                                  │
│                                                                              │
│  INTEGRATION TESTS (20% of tests)                                            │
│  ───────────────────────────────────────────────────────────────────────    │
│  • Test component interactions                                               │
│  • Test API endpoints with real database                                    │
│  • Medium execution time (< 1s per test)                                    │
│  • Run before every merge                                                    │
│                                                                              │
│  E2E TESTS (10% of tests)                                                    │
│  ───────────────────────────────────────────────────────────────────────    │
│  • Test critical user flows                                                  │
│  • Real browser, real backend                                                │
│  • Slow execution (seconds to minutes)                                      │
│  • Run before deployment                                                     │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 42.2 Testing Principles

```
TESTING PRINCIPLES
─────────────────────────────────────────────────────────────────────────────

PRINCIPLE 1: TEST BEHAVIOR, NOT IMPLEMENTATION
─────────────────────────────────────────────────────────────────────────────
BAD: Testing that a specific function is called
GOOD: Testing that the expected outcome occurs

// Bad: Testing implementation
expect(mockDb.query).toHaveBeenCalledWith('SELECT * FROM users');

// Good: Testing behavior
const users = await getUsers();
expect(users).toHaveLength(3);
expect(users[0].name).toBe('John');


PRINCIPLE 2: ONE ASSERTION FOCUS PER TEST
─────────────────────────────────────────────────────────────────────────────
Each test should verify one specific behavior.
Multiple assertions are fine if they verify the same behavior.

// Bad: Testing multiple behaviors
it('should handle user creation', () => {
  // Testing validation, creation, and email all in one
});

// Good: Separate tests for each behavior
it('should reject invalid email format', () => { ... });
it('should create user with valid data', () => { ... });
it('should send welcome email after creation', () => { ... });


PRINCIPLE 3: TESTS SHOULD BE INDEPENDENT
─────────────────────────────────────────────────────────────────────────────
Tests should not depend on each other.
Each test should set up its own state.

// Bad: Depending on previous test
it('should create user', () => { ... });
it('should update the created user', () => { /* depends on above */ });

// Good: Independent tests
it('should update user', () => {
  const user = await createTestUser(); // Set up own state
  await updateUser(user.id, { name: 'New Name' });
  // Assert...
});


PRINCIPLE 4: TESTS SHOULD BE DETERMINISTIC
─────────────────────────────────────────────────────────────────────────────
Same test should always produce same result.
Avoid: Random data, time-dependent logic, external services.

// Bad: Non-deterministic
it('should expire after 24 hours', () => {
  const token = createToken();
  // This test will fail differently at different times
});

// Good: Deterministic with time control
it('should expire after 24 hours', () => {
  jest.useFakeTimers();
  const token = createToken();
  jest.advanceTimersByTime(24 * 60 * 60 * 1000);
  expect(isTokenExpired(token)).toBe(true);
});


PRINCIPLE 5: TESTS ARE DOCUMENTATION
─────────────────────────────────────────────────────────────────────────────
Test names should describe the expected behavior.
Reading tests should explain how the system works.

// Bad: Unclear test names
it('test1', () => { ... });
it('should work', () => { ... });

// Good: Descriptive test names
it('should return 404 when user does not exist', () => { ... });
it('should hash password before storing', () => { ... });
it('should send email notification on successful order', () => { ... });
```

### 42.3 What to Test

```
WHAT TO TEST
─────────────────────────────────────────────────────────────────────────────

ALWAYS TEST:
─────────────────────────────────────────────────────────────────────────────
✓ Business logic
  • Core algorithms and calculations
  • State transitions
  • Decision trees

✓ API contracts
  • Request validation
  • Response format
  • Error handling
  • Status codes

✓ Data transformations
  • Input parsing
  • Output formatting
  • Mapping functions

✓ Edge cases
  • Empty inputs
  • Null/undefined handling
  • Boundary values
  • Error conditions

✓ Security-critical code
  • Authentication flows
  • Authorization checks
  • Input sanitization
  • Encryption/hashing


CONSIDER TESTING:
─────────────────────────────────────────────────────────────────────────────
○ UI components
  • Complex interactive components
  • Conditional rendering
  • State-dependent displays

○ Integration points
  • Database operations
  • External API calls
  • File operations


SKIP TESTING (Usually):
─────────────────────────────────────────────────────────────────────────────
✗ Third-party library internals
  • They have their own tests

✗ Simple getters/setters
  • Unless they have logic

✗ Framework boilerplate
  • Configuration files
  • Simple wiring code

✗ Styling
  • Visual regression tests instead
```

---

## 43. TEST COVERAGE STRATEGIES

### 43.1 Coverage Thresholds

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       COVERAGE THRESHOLDS                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Coverage metrics are INDICATORS, not GOALS.                                │
│  High coverage with bad tests is worse than low coverage with good tests.  │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  RECOMMENDED THRESHOLDS:                                                     │
│                                                                              │
│  CODE AREA               │ MINIMUM    │ TARGET     │ NOTES                  │
│  ────────────────────────┼────────────┼────────────┼─────────────────────── │
│  Business logic          │ 80%        │ 95%+       │ Critical, must test    │
│  API endpoints           │ 80%        │ 90%+       │ Contract matters       │
│  Utility functions       │ 90%        │ 100%       │ Pure, easy to test     │
│  UI components           │ 60%        │ 80%        │ Focus on complex ones  │
│  Integration code        │ 70%        │ 85%        │ Error paths important  │
│  Overall project         │ 70%        │ 80%+       │ Balanced goal          │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  COVERAGE TYPES:                                                             │
│                                                                              │
│  LINE COVERAGE                                                               │
│  Percentage of code lines executed by tests                                 │
│  Useful but can be gamed                                                    │
│                                                                              │
│  BRANCH COVERAGE                                                             │
│  Percentage of if/else branches taken                                       │
│  Better indicator of thoroughness                                            │
│                                                                              │
│  FUNCTION COVERAGE                                                           │
│  Percentage of functions called                                              │
│  Quick overview of what's tested                                            │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 43.2 Coverage Configuration

```
COVERAGE CONFIGURATION
─────────────────────────────────────────────────────────────────────────────

JEST CONFIGURATION:
```javascript
// jest.config.js
module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,ts,tsx}',
    '!src/**/*.test.{js,ts,tsx}',
    '!src/**/index.{js,ts}', // Re-export files
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
    // Stricter thresholds for critical paths
    './src/features/auth/**/*.ts': {
      branches: 90,
      functions: 90,
      lines: 90,
    },
    './src/lib/api/**/*.ts': {
      branches: 85,
      functions: 85,
      lines: 85,
    },
  },
};
```

VITEST CONFIGURATION:
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      exclude: [
        'node_modules',
        'dist',
        '**/*.d.ts',
        '**/*.test.{js,ts,tsx}',
        '**/index.{js,ts}',
      ],
      thresholds: {
        lines: 70,
        functions: 70,
        branches: 70,
        statements: 70,
      },
    },
  },
});
```
```

### 43.3 Coverage Anti-Patterns

```
COVERAGE ANTI-PATTERNS
─────────────────────────────────────────────────────────────────────────────

ANTI-PATTERN 1: COVERAGE GAMING
─────────────────────────────────────────────────────────────────────────────
Writing tests that execute code but don't verify behavior.

// Bad: Executes code but tests nothing
it('should run without error', () => {
  processData(testData);
  // No assertions!
});

// Good: Actually verifies behavior
it('should transform data correctly', () => {
  const result = processData(testData);
  expect(result.count).toBe(5);
  expect(result.status).toBe('complete');
});


ANTI-PATTERN 2: TESTING THE MOCK
─────────────────────────────────────────────────────────────────────────────
Setting up mocks and then testing the mock behavior.

// Bad: Testing the mock, not the code
const mockFetch = jest.fn().mockResolvedValue({ data: [] });
it('should call fetch', async () => {
  await getData();
  expect(mockFetch).toHaveBeenCalled(); // Only tests mock setup
});

// Good: Testing actual behavior
it('should return parsed data', async () => {
  mockFetch.mockResolvedValue({ data: [{ id: 1 }] });
  const result = await getData();
  expect(result[0].id).toBe(1);
});


ANTI-PATTERN 3: IGNORING EDGE CASES
─────────────────────────────────────────────────────────────────────────────
High coverage on happy paths but missing error cases.

// Incomplete: Only happy path
it('should get user', async () => {
  const user = await getUser(1);
  expect(user.name).toBe('John');
});

// Complete: Including edge cases
it('should get user', async () => { ... });
it('should throw when user not found', async () => { ... });
it('should handle network errors', async () => { ... });
it('should handle malformed response', async () => { ... });


ANTI-PATTERN 4: SNAPSHOT ABUSE
─────────────────────────────────────────────────────────────────────────────
Using snapshots for everything without understanding them.

// Bad: Snapshot of complex object (hard to review changes)
it('should return user data', () => {
  expect(getUserData()).toMatchSnapshot();
});

// Good: Explicit assertions for behavior, snapshots for stable structures
it('should return correct user fields', () => {
  const user = getUserData();
  expect(user.id).toBeDefined();
  expect(user.email).toContain('@');
});

it('should match API schema', () => {
  expect(getApiSchema()).toMatchSnapshot(); // Stable, reviewed carefully
});
```

---

## 44. TESTING PATTERNS BY LAYER

### 44.1 Unit Testing Patterns

```
UNIT TESTING PATTERNS
─────────────────────────────────────────────────────────────────────────────

PATTERN: ARRANGE-ACT-ASSERT (AAA)
─────────────────────────────────────────────────────────────────────────────
```typescript
it('should calculate order total with discount', () => {
  // Arrange: Set up test data and dependencies
  const items = [
    { price: 100, quantity: 2 },
    { price: 50, quantity: 1 },
  ];
  const discount = 0.1; // 10%

  // Act: Execute the code under test
  const total = calculateOrderTotal(items, discount);

  // Assert: Verify the expected outcome
  expect(total).toBe(225); // (200 + 50) * 0.9
});
```

PATTERN: TABLE-DRIVEN TESTS
─────────────────────────────────────────────────────────────────────────────
```typescript
describe('formatCurrency', () => {
  const testCases = [
    { input: 0, expected: '$0.00' },
    { input: 100, expected: '$100.00' },
    { input: 1234.56, expected: '$1,234.56' },
    { input: -50, expected: '-$50.00' },
    { input: 0.1, expected: '$0.10' },
  ];

  test.each(testCases)(
    'formats $input as $expected',
    ({ input, expected }) => {
      expect(formatCurrency(input)).toBe(expected);
    }
  );
});
```

PATTERN: TESTING ASYNC CODE
─────────────────────────────────────────────────────────────────────────────
```typescript
// Using async/await
it('should fetch user data', async () => {
  const user = await fetchUser(1);
  expect(user.name).toBe('John');
});

// Testing rejected promises
it('should throw on network error', async () => {
  mockFetch.mockRejectedValue(new Error('Network error'));
  
  await expect(fetchUser(1)).rejects.toThrow('Network error');
});

// Testing with timers
it('should retry after delay', async () => {
  jest.useFakeTimers();
  
  const promise = fetchWithRetry();
  
  jest.advanceTimersByTime(1000);
  
  const result = await promise;
  expect(result).toBeDefined();
});
```

PATTERN: TESTING HOOKS
─────────────────────────────────────────────────────────────────────────────
```typescript
import { renderHook, act } from '@testing-library/react';

describe('useCounter', () => {
  it('should increment counter', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  it('should handle async updates', async () => {
    const { result } = renderHook(() => useAsyncData());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBeDefined();
  });
});
```
```

### 44.2 Integration Testing Patterns

```
INTEGRATION TESTING PATTERNS
─────────────────────────────────────────────────────────────────────────────

PATTERN: API ENDPOINT TESTING
─────────────────────────────────────────────────────────────────────────────
```typescript
import { createServer } from '../server';
import { db } from '../db';

describe('POST /api/users', () => {
  let app;

  beforeAll(async () => {
    app = await createServer();
  });

  beforeEach(async () => {
    await db.clear(); // Clean state for each test
  });

  afterAll(async () => {
    await db.close();
  });

  it('should create user with valid data', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        email: 'test@example.com',
        name: 'Test User',
        password: 'securePassword123',
      });

    expect(response.status).toBe(201);
    expect(response.body.data.email).toBe('test@example.com');
    expect(response.body.data.password).toBeUndefined(); // Not exposed
    
    // Verify in database
    const dbUser = await db.users.findByEmail('test@example.com');
    expect(dbUser).toBeDefined();
  });

  it('should return 422 for invalid email', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        email: 'not-an-email',
        name: 'Test User',
        password: 'securePassword123',
      });

    expect(response.status).toBe(422);
    expect(response.body.error.details[0].field).toBe('email');
  });
});
```

PATTERN: DATABASE INTEGRATION
─────────────────────────────────────────────────────────────────────────────
```typescript
describe('UserRepository', () => {
  let repo: UserRepository;
  let testDb: TestDatabase;

  beforeAll(async () => {
    testDb = await TestDatabase.create();
    repo = new UserRepository(testDb.connection);
  });

  beforeEach(async () => {
    await testDb.reset(); // Clean and reseed
  });

  afterAll(async () => {
    await testDb.destroy();
  });

  it('should find user by email', async () => {
    // Seed data
    await testDb.seed('users', [
      { id: '1', email: 'john@example.com', name: 'John' },
    ]);

    const user = await repo.findByEmail('john@example.com');

    expect(user).toBeDefined();
    expect(user?.name).toBe('John');
  });

  it('should handle concurrent updates', async () => {
    await testDb.seed('users', [
      { id: '1', email: 'john@example.com', balance: 100 },
    ]);

    // Simulate concurrent updates
    await Promise.all([
      repo.updateBalance('1', -30),
      repo.updateBalance('1', -30),
    ]);

    const user = await repo.findById('1');
    expect(user?.balance).toBe(40); // Both deductions applied
  });
});
```
```

### 44.3 E2E Testing Patterns

```
E2E TESTING PATTERNS
─────────────────────────────────────────────────────────────────────────────

PATTERN: USER FLOW TESTING (Playwright)
─────────────────────────────────────────────────────────────────────────────
```typescript
import { test, expect } from '@playwright/test';

test.describe('User Authentication Flow', () => {
  test('should complete signup and login', async ({ page }) => {
    // Navigate to signup
    await page.goto('/signup');

    // Fill signup form
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'SecurePass123!');
    await page.fill('[data-testid="name-input"]', 'Test User');

    // Submit and wait for navigation
    await page.click('[data-testid="signup-button"]');
    await page.waitForURL('/dashboard');

    // Verify logged in state
    await expect(page.locator('[data-testid="user-menu"]')).toBeVisible();
    await expect(page.locator('[data-testid="user-name"]')).toHaveText('Test User');

    // Logout
    await page.click('[data-testid="user-menu"]');
    await page.click('[data-testid="logout-button"]');
    await page.waitForURL('/');

    // Login again
    await page.goto('/login');
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'SecurePass123!');
    await page.click('[data-testid="login-button"]');
    await page.waitForURL('/dashboard');

    // Verify same user
    await expect(page.locator('[data-testid="user-name"]')).toHaveText('Test User');
  });
});
```

PATTERN: VISUAL REGRESSION TESTING
─────────────────────────────────────────────────────────────────────────────
```typescript
import { test, expect } from '@playwright/test';

test.describe('Visual Regression', () => {
  test('dashboard matches snapshot', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');

    // Full page screenshot
    await expect(page).toHaveScreenshot('dashboard.png', {
      fullPage: true,
      maxDiffPixels: 100, // Allow minor differences
    });
  });

  test('components match snapshots', async ({ page }) => {
    await page.goto('/components');

    // Individual component screenshots
    const button = page.locator('[data-testid="primary-button"]');
    await expect(button).toHaveScreenshot('primary-button.png');

    const card = page.locator('[data-testid="user-card"]');
    await expect(card).toHaveScreenshot('user-card.png');
  });
});
```

PATTERN: ACCESSIBILITY TESTING
─────────────────────────────────────────────────────────────────────────────
```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/');

    // Tab through interactive elements
    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toHaveAttribute('data-testid', 'nav-home');

    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toHaveAttribute('data-testid', 'nav-about');

    // Activate with keyboard
    await page.keyboard.press('Enter');
    await page.waitForURL('/about');
  });
});
```
```

---

## 45. TEST INFRASTRUCTURE

### 45.1 Test Organization

```
TEST ORGANIZATION
─────────────────────────────────────────────────────────────────────────────

APPROACH 1: CO-LOCATED TESTS (Recommended for components)
─────────────────────────────────────────────────────────────────────────────
src/
├── features/
│   └── auth/
│       ├── components/
│       │   ├── LoginForm.tsx
│       │   ├── LoginForm.test.tsx      # Co-located
│       │   └── LoginForm.stories.tsx   # Storybook
│       └── hooks/
│           ├── useAuth.ts
│           └── useAuth.test.ts         # Co-located

Benefits:
• Easy to find tests
• Tests update with component
• Clear ownership


APPROACH 2: SEPARATE TEST DIRECTORY (Recommended for integration/E2E)
─────────────────────────────────────────────────────────────────────────────
project/
├── src/
│   └── ...
├── tests/
│   ├── unit/                # Mirror of src/ structure
│   │   └── features/
│   │       └── auth/
│   ├── integration/         # API and service tests
│   │   ├── api/
│   │   │   ├── users.test.ts
│   │   │   └── orders.test.ts
│   │   └── services/
│   └── e2e/                 # End-to-end tests
│       ├── auth.spec.ts
│       ├── checkout.spec.ts
│       └── fixtures/
└── ...

Benefits:
• Clear separation by test type
• Different configs per type
• E2E can run independently


HYBRID APPROACH (Recommended overall):
─────────────────────────────────────────────────────────────────────────────
• Unit tests: Co-located with source
• Integration tests: tests/integration/
• E2E tests: tests/e2e/
• Shared fixtures: tests/fixtures/
• Test utilities: tests/utils/
```

### 45.2 Test Utilities and Fixtures

```
TEST UTILITIES AND FIXTURES
─────────────────────────────────────────────────────────────────────────────

FIXTURE FACTORY PATTERN:
─────────────────────────────────────────────────────────────────────────────
```typescript
// tests/fixtures/factories.ts

import { faker } from '@faker-js/faker';

export function createUser(overrides: Partial<User> = {}): User {
  return {
    id: faker.string.uuid(),
    email: faker.internet.email(),
    name: faker.person.fullName(),
    createdAt: new Date(),
    ...overrides,
  };
}

export function createOrder(overrides: Partial<Order> = {}): Order {
  return {
    id: faker.string.uuid(),
    userId: faker.string.uuid(),
    items: [],
    total: 0,
    status: 'pending',
    createdAt: new Date(),
    ...overrides,
  };
}

// Usage in tests
it('should calculate order total', () => {
  const order = createOrder({
    items: [
      { productId: '1', price: 100, quantity: 2 },
      { productId: '2', price: 50, quantity: 1 },
    ],
  });
  
  const total = calculateTotal(order);
  expect(total).toBe(250);
});
```

CUSTOM RENDER PATTERN (React):
─────────────────────────────────────────────────────────────────────────────
```typescript
// tests/utils/render.tsx

import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/features/auth';

interface CustomRenderOptions extends RenderOptions {
  user?: User;
  queryClient?: QueryClient;
}

export function customRender(
  ui: React.ReactElement,
  options: CustomRenderOptions = {}
) {
  const {
    user,
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
      },
    }),
    ...renderOptions
  } = options;

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        <AuthProvider initialUser={user}>
          {children}
        </AuthProvider>
      </QueryClientProvider>
    );
  }

  return {
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    queryClient,
  };
}

// Re-export everything
export * from '@testing-library/react';
export { customRender as render };
```

MOCK SERVICE WORKER SETUP:
─────────────────────────────────────────────────────────────────────────────
```typescript
// tests/mocks/handlers.ts

import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/users/:id', ({ params }) => {
    return HttpResponse.json({
      data: {
        id: params.id,
        name: 'Test User',
        email: 'test@example.com',
      },
    });
  }),

  http.post('/api/users', async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json(
      { data: { id: '123', ...body } },
      { status: 201 }
    );
  }),

  http.get('/api/users/:id', ({ params }) => {
    if (params.id === 'not-found') {
      return HttpResponse.json(
        { error: { code: 'NOT_FOUND' } },
        { status: 404 }
      );
    }
    // Default response
  }),
];

// tests/mocks/server.ts
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);
```
```

### 45.3 CI Test Configuration

```
CI TEST CONFIGURATION
─────────────────────────────────────────────────────────────────────────────

GITHUB ACTIONS WORKFLOW:
─────────────────────────────────────────────────────────────────────────────
```yaml
# .github/workflows/test.yml

name: Test

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run test:unit -- --coverage
      
      - uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info

  integration-tests:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run db:migrate
        env:
          DATABASE_URL: postgres://postgres:postgres@localhost:5432/test
      - run: npm run test:integration
        env:
          DATABASE_URL: postgres://postgres:postgres@localhost:5432/test

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run build
      - run: npm run test:e2e
      
      - uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
```

NPM SCRIPTS CONFIGURATION:
─────────────────────────────────────────────────────────────────────────────
```json
{
  "scripts": {
    "test": "npm run test:unit && npm run test:integration",
    "test:unit": "vitest run",
    "test:unit:watch": "vitest",
    "test:unit:coverage": "vitest run --coverage",
    "test:integration": "vitest run --config vitest.integration.config.ts",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:debug": "playwright test --debug"
  }
}
```
```

---

## PART IX SUMMARY

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                PART IX: TESTING & VERIFICATION FRAMEWORK                     │
│                           KEY TAKEAWAYS                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  TESTING PYRAMID:                                                            │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • Unit (70%): Fast, isolated, many                                         │
│  • Integration (20%): Component interactions                                │
│  • E2E (10%): Critical user flows                                           │
│                                                                              │
│  TESTING PRINCIPLES:                                                         │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • Test behavior, not implementation                                        │
│  • One assertion focus per test                                              │
│  • Tests should be independent                                               │
│  • Tests should be deterministic                                             │
│  • Tests are documentation                                                   │
│                                                                              │
│  COVERAGE THRESHOLDS:                                                        │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • Business logic: 80-95%                                                    │
│  • API endpoints: 80-90%                                                     │
│  • Utilities: 90-100%                                                        │
│  • UI components: 60-80%                                                     │
│  • Overall: 70-80%                                                           │
│  • Coverage is indicator, not goal                                           │
│                                                                              │
│  TESTING PATTERNS:                                                           │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • Arrange-Act-Assert (AAA)                                                  │
│  • Table-driven tests                                                        │
│  • Fixture factories                                                         │
│  • Custom render utilities                                                   │
│  • Mock Service Worker                                                       │
│                                                                              │
│  TEST ORGANIZATION:                                                          │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • Unit: Co-located with source                                              │
│  • Integration: tests/integration/                                           │
│  • E2E: tests/e2e/                                                          │
│  • Shared: tests/fixtures/, tests/utils/                                    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---


---

## 🔄 PROPAGATED CONTENT FROM PART_6_QUALITY.md (v6.0)

> This section contains synchronized content from the Modular 7-part structure.
> Source: `projects/Segment Mods/NSBP5.0 -Segments/PART_6_QUALITY.md`

# NORTH STAR BLUEPRINT v6.0 — SEGMENT 6 of 7
## PART_6_QUALITY
### Contents: Part X (Sections 46-49) + Part XI (Sections 50-53)
### Lines: 12379-14427 of original
---
> **SEGMENT NAVIGATION:** This is a development segment. For full Blueprint, merge all 7 parts.
> For BRIDGE routing: Sections 46-53 are in this segment.
---

# PART X: SECURITY & AUTHENTICATION

---

## 46. SECURITY-FIRST DEVELOPMENT

> "Security is not a feature—it's a requirement."

### 46.1 Security Principles

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      SECURITY-FIRST PRINCIPLES                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  PRINCIPLE 1: DEFENSE IN DEPTH                                               │
│  ───────────────────────────────────────────────────────────────────────    │
│  Multiple layers of security, not just one.                                │
│  If one layer fails, others still protect.                                  │
│                                                                              │
│  Layers:                                                                     │
│  • Network (firewall, WAF)                                                  │
│  • Application (auth, input validation)                                     │
│  • Data (encryption, access control)                                        │
│  • Monitoring (logging, alerting)                                           │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  PRINCIPLE 2: LEAST PRIVILEGE                                                │
│  ───────────────────────────────────────────────────────────────────────    │
│  Grant minimum access needed to perform a function.                         │
│  Remove access when no longer needed.                                       │
│                                                                              │
│  Applications:                                                               │
│  • Database users with limited permissions                                  │
│  • API keys with scoped access                                              │
│  • User roles with specific capabilities                                    │
│  • Service accounts with minimal rights                                     │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  PRINCIPLE 3: NEVER TRUST INPUT                                              │
│  ───────────────────────────────────────────────────────────────────────    │
│  All input is potentially malicious.                                        │
│  Validate, sanitize, escape everything.                                     │
│                                                                              │
│  Trust boundaries:                                                           │
│  • User input (forms, URLs, uploads)                                        │
│  • API responses (external services)                                        │
│  • Database content (could be previously compromised)                       │
│  • Environment variables (could be misconfigured)                           │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  PRINCIPLE 4: SECURE BY DEFAULT                                              │
│  ───────────────────────────────────────────────────────────────────────    │
│  Default settings should be secure.                                        │
│  Insecure options require explicit opt-in.                                  │
│                                                                              │
│  Examples:                                                                   │
│  • HTTPS required by default                                                │
│  • Cookies httpOnly and secure by default                                   │
│  • CORS restrictive by default                                              │
│  • Passwords must meet complexity by default                                │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  PRINCIPLE 5: FAIL SECURE                                                    │
│  ───────────────────────────────────────────────────────────────────────    │
│  When something fails, fail to a secure state.                             │
│  Deny by default, allow explicitly.                                         │
│                                                                              │
│  Examples:                                                                   │
│  • If auth check fails → deny access                                        │
│  • If input validation fails → reject request                               │
│  • If service unavailable → show error, don't bypass                        │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 46.2 OWASP Top 10 Checklist

```
OWASP TOP 10 PREVENTION CHECKLIST
─────────────────────────────────────────────────────────────────────────────

1. BROKEN ACCESS CONTROL
─────────────────────────────────────────────────────────────────────────────
□ Deny access by default
□ Implement access control checks at every endpoint
□ Validate user ownership of resources
□ Disable directory listing
□ Log access control failures
□ Rate limit API access

2. CRYPTOGRAPHIC FAILURES
─────────────────────────────────────────────────────────────────────────────
□ Identify sensitive data (PII, financial, health)
□ Encrypt sensitive data at rest
□ Use TLS for data in transit
□ Use strong, up-to-date algorithms
□ Never store passwords in plain text
□ Use proper key management

3. INJECTION
─────────────────────────────────────────────────────────────────────────────
□ Use parameterized queries (never string concatenation)
□ Validate and sanitize all input
□ Escape output appropriately
□ Use ORM/prepared statements
□ Limit database permissions

4. INSECURE DESIGN
─────────────────────────────────────────────────────────────────────────────
□ Use threat modeling
□ Secure development lifecycle
□ Library of security patterns
□ Unit and integration tests for security
□ Plausibility checks (rate limits, max values)

5. SECURITY MISCONFIGURATION
─────────────────────────────────────────────────────────────────────────────
□ Minimal platform (remove unused features)
□ Secure defaults everywhere
□ No default credentials
□ Error handling doesn't leak info
□ Security headers configured
□ Regular updates and patches

6. VULNERABLE COMPONENTS
─────────────────────────────────────────────────────────────────────────────
□ Know your dependencies
□ Remove unused dependencies
□ Use only official sources
□ Monitor for vulnerabilities (npm audit, Dependabot)
□ Have update process

7. AUTHENTICATION FAILURES
─────────────────────────────────────────────────────────────────────────────
□ Multi-factor authentication available
□ No default/weak credentials
□ Secure password recovery
□ Session management secure
□ Brute force protection
□ Proper session invalidation on logout

8. SOFTWARE/DATA INTEGRITY FAILURES
─────────────────────────────────────────────────────────────────────────────
□ Verify software integrity (signatures, checksums)
□ Use trusted repositories
□ CI/CD pipeline security
□ Unsigned/unencrypted serialized data validated

9. LOGGING/MONITORING FAILURES
─────────────────────────────────────────────────────────────────────────────
□ Log authentication events
□ Log access control failures
□ Log input validation failures
□ Ensure logs are tamper-proof
□ Alerting for suspicious activity
□ Incident response plan

10. SERVER-SIDE REQUEST FORGERY (SSRF)
─────────────────────────────────────────────────────────────────────────────
□ Validate and sanitize URLs
□ Allowlist permitted domains
□ Disable HTTP redirects if possible
□ Block requests to internal networks
□ Don't send raw responses to clients
```

### 46.3 Security Headers Configuration

```
SECURITY HEADERS CONFIGURATION
─────────────────────────────────────────────────────────────────────────────

ESSENTIAL HEADERS:
```typescript
// Next.js example (next.config.js)
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()'
  },
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval';
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: https:;
      font-src 'self';
      connect-src 'self' https://api.example.com;
      frame-ancestors 'none';
    `.replace(/\s{2,}/g, ' ').trim()
  }
];

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};
```

HEADER EXPLANATIONS:
─────────────────────────────────────────────────────────────────────────────
Strict-Transport-Security (HSTS)
  Forces HTTPS connections
  
X-Frame-Options
  Prevents clickjacking (being embedded in iframes)
  
X-Content-Type-Options
  Prevents MIME type sniffing
  
Content-Security-Policy (CSP)
  Controls what resources can be loaded
  Prevents XSS attacks
  
Referrer-Policy
  Controls what referrer info is sent
  
Permissions-Policy
  Controls which browser features can be used
```

---

## 47. AUTHENTICATION PATTERNS

### 47.1 Authentication Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     AUTHENTICATION ARCHITECTURE                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  AUTHENTICATION METHODS:                                                     │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ SESSION-BASED                                                        │    │
│  │                                                                      │    │
│  │ User ──login──► Server                                               │    │
│  │                   │                                                  │    │
│  │                   ├── Create session in store                        │    │
│  │                   ├── Set session ID cookie                          │    │
│  │                   │                                                  │    │
│  │ User ◄──cookie────┘                                                  │    │
│  │                                                                      │    │
│  │ BEST FOR: Traditional web apps, server-rendered                     │    │
│  │ PROS: Simple, secure, easy revocation                               │    │
│  │ CONS: Server state, scaling challenges                              │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ TOKEN-BASED (JWT)                                                    │    │
│  │                                                                      │    │
│  │ User ──login──► Server                                               │    │
│  │                   │                                                  │    │
│  │                   ├── Generate signed JWT                            │    │
│  │                   ├── Return token to client                         │    │
│  │                   │                                                  │    │
│  │ User ◄──token─────┘                                                  │    │
│  │   │                                                                  │    │
│  │   └── Stores token (httpOnly cookie or memory)                      │    │
│  │                                                                      │    │
│  │ BEST FOR: SPAs, mobile apps, microservices                          │    │
│  │ PROS: Stateless, scalable, cross-domain                             │    │
│  │ CONS: Can't easily revoke, size overhead                            │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ OAUTH 2.0 / OIDC                                                     │    │
│  │                                                                      │    │
│  │ User ──login──► App ──redirect──► Provider (Google, GitHub)         │    │
│  │                                       │                              │    │
│  │                                       ├── User authenticates        │    │
│  │                                       ├── Provider redirects back   │    │
│  │                                       │                              │    │
│  │ User ◄─────────────────────────────────┘                            │    │
│  │                                                                      │    │
│  │ BEST FOR: Social login, enterprise SSO                              │    │
│  │ PROS: No password management, trusted providers                     │    │
│  │ CONS: Dependency on provider, complexity                            │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 47.2 Password Security

```
PASSWORD SECURITY
─────────────────────────────────────────────────────────────────────────────

PASSWORD REQUIREMENTS:
─────────────────────────────────────────────────────────────────────────────
□ Minimum 12 characters (NIST recommends 8 minimum)
□ Allow up to 128 characters
□ Allow all printable characters
□ Check against common password lists
□ Check against breached password databases
□ Show strength meter
□ Don't require arbitrary complexity rules

PASSWORD HASHING:
─────────────────────────────────────────────────────────────────────────────
```typescript
import { hash, verify } from '@node-rs/argon2';

// Hash password for storage
async function hashPassword(password: string): Promise<string> {
  return hash(password, {
    memoryCost: 19456,  // 19 MiB
    timeCost: 2,        // 2 iterations
    parallelism: 1,     // 1 thread
  });
}

// Verify password against stored hash
async function verifyPassword(
  password: string, 
  storedHash: string
): Promise<boolean> {
  return verify(storedHash, password);
}

// Alternative: bcrypt (widely used)
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 12;

async function hashPasswordBcrypt(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}
```

PASSWORD RESET FLOW:
─────────────────────────────────────────────────────────────────────────────
1. User requests reset with email
2. Generate cryptographically random token
3. Store token hash with expiration (15-60 minutes)
4. Send email with reset link containing token
5. User clicks link, enters new password
6. Verify token, hash new password, invalidate token
7. Invalidate all existing sessions
8. Send confirmation email

```typescript
import { randomBytes, createHash } from 'crypto';

function generateResetToken(): { token: string; hash: string } {
  const token = randomBytes(32).toString('hex');
  const hash = createHash('sha256').update(token).digest('hex');
  return { token, hash };
}

async function createPasswordReset(email: string) {
  const user = await findUserByEmail(email);
  if (!user) return; // Don't reveal if email exists

  const { token, hash } = generateResetToken();
  
  await db.passwordResets.create({
    userId: user.id,
    tokenHash: hash,
    expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
  });

  await sendEmail(email, `Reset: ${BASE_URL}/reset?token=${token}`);
}
```
```

### 47.3 JWT Implementation

```
JWT IMPLEMENTATION
─────────────────────────────────────────────────────────────────────────────

JWT STRUCTURE:
─────────────────────────────────────────────────────────────────────────────
Header: Algorithm and token type
{
  "alg": "HS256",
  "typ": "JWT"
}

Payload: Claims (data)
{
  "sub": "user-id-123",        // Subject (user ID)
  "iat": 1704067200,           // Issued at
  "exp": 1704153600,           // Expiration
  "role": "user"               // Custom claims
}

Signature: Verification
HMACSHA256(base64(header) + "." + base64(payload), secret)


JWT BEST PRACTICES:
─────────────────────────────────────────────────────────────────────────────
□ Use short expiration (15 min access, 7 day refresh)
□ Store in httpOnly cookie (not localStorage)
□ Use refresh token rotation
□ Include minimal claims
□ Use strong secret (256+ bits)
□ Consider RS256 for distributed systems


IMPLEMENTATION:
─────────────────────────────────────────────────────────────────────────────
```typescript
import jwt from 'jsonwebtoken';

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

interface TokenPayload {
  sub: string;
  role: string;
}

function generateAccessToken(user: User): string {
  return jwt.sign(
    { sub: user.id, role: user.role },
    ACCESS_SECRET,
    { expiresIn: '15m' }
  );
}

function generateRefreshToken(user: User): string {
  return jwt.sign(
    { sub: user.id },
    REFRESH_SECRET,
    { expiresIn: '7d' }
  );
}

function verifyAccessToken(token: string): TokenPayload {
  return jwt.verify(token, ACCESS_SECRET) as TokenPayload;
}

// Cookie settings
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
};

// Set tokens in cookies
res.cookie('accessToken', accessToken, {
  ...cookieOptions,
  maxAge: 15 * 60 * 1000, // 15 minutes
});

res.cookie('refreshToken', refreshToken, {
  ...cookieOptions,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  path: '/api/auth/refresh', // Only sent to refresh endpoint
});
```
```

---

## 48. AUTHORIZATION & ACCESS CONTROL

### 48.1 Authorization Models

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       AUTHORIZATION MODELS                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ROLE-BASED ACCESS CONTROL (RBAC)                                           │
│  ───────────────────────────────────────────────────────────────────────    │
│  Users are assigned roles, roles have permissions.                         │
│                                                                              │
│  User ───► Role ───► Permissions                                            │
│                                                                              │
│  Example:                                                                    │
│  ┌─────────┐     ┌─────────┐     ┌──────────────────┐                       │
│  │  Alice  │────►│  Admin  │────►│ users:read       │                       │
│  └─────────┘     └─────────┘     │ users:write      │                       │
│                                  │ orders:read      │                       │
│  ┌─────────┐     ┌─────────┐     │ orders:write     │                       │
│  │   Bob   │────►│  User   │────►│ settings:manage  │                       │
│  └─────────┘     └─────────┘     └──────────────────┘                       │
│                        │                                                    │
│                        └────►┌──────────────────┐                           │
│                              │ orders:read      │                           │
│                              │ orders:write     │                           │
│                              │ (own only)       │                           │
│                              └──────────────────┘                           │
│                                                                              │
│  BEST FOR: Applications with clear role hierarchies                        │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  ATTRIBUTE-BASED ACCESS CONTROL (ABAC)                                      │
│  ───────────────────────────────────────────────────────────────────────    │
│  Permissions based on attributes of user, resource, and context.           │
│                                                                              │
│  Policy: "Allow if user.department == resource.department                   │
│           AND context.time is business hours"                               │
│                                                                              │
│  BEST FOR: Complex, context-dependent access rules                          │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  RESOURCE-BASED ACCESS CONTROL                                               │
│  ───────────────────────────────────────────────────────────────────────    │
│  Permissions attached directly to resources.                                │
│                                                                              │
│  Resource: Document XYZ                                                      │
│  └── owner: Alice (full access)                                             │
│  └── editors: [Bob, Carol] (read/write)                                     │
│  └── viewers: [Dan, Eve] (read only)                                        │
│                                                                              │
│  BEST FOR: User-generated content, shared resources                        │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 48.2 Authorization Implementation

```
AUTHORIZATION IMPLEMENTATION
─────────────────────────────────────────────────────────────────────────────

ROLE-BASED MIDDLEWARE:
─────────────────────────────────────────────────────────────────────────────
```typescript
// types.ts
type Role = 'admin' | 'manager' | 'user' | 'guest';

type Permission = 
  | 'users:read' | 'users:write' | 'users:delete'
  | 'orders:read' | 'orders:write' | 'orders:delete'
  | 'settings:read' | 'settings:write';

const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  admin: [
    'users:read', 'users:write', 'users:delete',
    'orders:read', 'orders:write', 'orders:delete',
    'settings:read', 'settings:write',
  ],
  manager: [
    'users:read',
    'orders:read', 'orders:write',
    'settings:read',
  ],
  user: [
    'orders:read', 'orders:write',
  ],
  guest: [
    'orders:read',
  ],
};

// middleware.ts
function hasPermission(role: Role, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

function requirePermission(permission: Permission) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    if (!hasPermission(user.role, permission)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    
    next();
  };
}

// Usage
app.get('/api/users', requirePermission('users:read'), getUsers);
app.post('/api/users', requirePermission('users:write'), createUser);
app.delete('/api/users/:id', requirePermission('users:delete'), deleteUser);
```

RESOURCE OWNERSHIP CHECK:
─────────────────────────────────────────────────────────────────────────────
```typescript
// Check if user can access a specific resource
async function canAccessOrder(userId: string, orderId: string): Promise<boolean> {
  const order = await db.orders.findById(orderId);
  
  if (!order) return false;
  
  // Owner can always access
  if (order.userId === userId) return true;
  
  // Check if user is admin
  const user = await db.users.findById(userId);
  if (user?.role === 'admin') return true;
  
  // Check if user is assigned to this order
  const assignment = await db.orderAssignments.find({
    orderId,
    userId,
  });
  
  return !!assignment;
}

// Middleware using ownership check
async function requireOrderAccess(req: Request, res: Response, next: NextFunction) {
  const { orderId } = req.params;
  const userId = req.user?.id;
  
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const canAccess = await canAccessOrder(userId, orderId);
  
  if (!canAccess) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  
  next();
}
```
```

### 48.3 API Security

```
API SECURITY
─────────────────────────────────────────────────────────────────────────────

RATE LIMITING:
─────────────────────────────────────────────────────────────────────────────
```typescript
import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

// General API rate limit
const apiLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args) => redis.call(...args),
  }),
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: { error: 'Too many requests' },
});

// Stricter limit for auth endpoints
const authLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args) => redis.call(...args),
  }),
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 attempts per hour
  message: { error: 'Too many login attempts' },
});

app.use('/api/', apiLimiter);
app.use('/api/auth/login', authLimiter);
```

INPUT VALIDATION:
─────────────────────────────────────────────────────────────────────────────
```typescript
import { z } from 'zod';

// Define schema
const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(12).max(128),
  name: z.string().min(1).max(100),
});

// Validation middleware
function validateBody<T>(schema: z.ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    
    if (!result.success) {
      return res.status(422).json({
        error: 'Validation failed',
        details: result.error.issues,
      });
    }
    
    req.body = result.data;
    next();
  };
}

// Usage
app.post('/api/users', validateBody(createUserSchema), createUser);
```

SQL INJECTION PREVENTION:
─────────────────────────────────────────────────────────────────────────────
```typescript
// BAD: String concatenation (vulnerable)
const query = `SELECT * FROM users WHERE id = '${userId}'`;

// GOOD: Parameterized query
const result = await db.query(
  'SELECT * FROM users WHERE id = $1',
  [userId]
);

// GOOD: Using ORM/Query builder
const user = await db.users.findUnique({
  where: { id: userId },
});
```

XSS PREVENTION:
─────────────────────────────────────────────────────────────────────────────
```typescript
// React automatically escapes content
<div>{userInput}</div> // Safe

// DANGEROUS: dangerouslySetInnerHTML
<div dangerouslySetInnerHTML={{ __html: userInput }} /> // Unsafe!

// If you must use HTML, sanitize it
import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userInput) }} />
```
```

---

## 49. DATA PROTECTION

### 49.1 Encryption Standards

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       ENCRYPTION STANDARDS                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  DATA AT REST                                                                │
│  ───────────────────────────────────────────────────────────────────────    │
│  Data stored in databases, files, backups.                                  │
│                                                                              │
│  Requirements:                                                               │
│  □ Database encryption (transparent or field-level)                        │
│  □ Backup encryption                                                        │
│  □ File storage encryption                                                  │
│  □ Key management system                                                    │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  DATA IN TRANSIT                                                             │
│  ───────────────────────────────────────────────────────────────────────    │
│  Data moving between systems.                                               │
│                                                                              │
│  Requirements:                                                               │
│  □ TLS 1.3 (or 1.2 minimum)                                                │
│  □ Valid certificates                                                       │
│  □ HSTS enabled                                                             │
│  □ Certificate pinning (mobile apps)                                        │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  FIELD-LEVEL ENCRYPTION                                                      │
│  ───────────────────────────────────────────────────────────────────────    │
│  Encrypt specific sensitive fields.                                        │
│                                                                              │
│  Use for:                                                                    │
│  • Social security numbers                                                   │
│  • Credit card numbers                                                       │
│  • Health information                                                        │
│  • Personal identification                                                   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 49.2 Encryption Implementation

```
ENCRYPTION IMPLEMENTATION
─────────────────────────────────────────────────────────────────────────────

FIELD-LEVEL ENCRYPTION:
─────────────────────────────────────────────────────────────────────────────
```typescript
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const KEY = Buffer.from(process.env.ENCRYPTION_KEY!, 'hex'); // 32 bytes

interface EncryptedData {
  iv: string;
  data: string;
  tag: string;
}

function encrypt(text: string): EncryptedData {
  const iv = randomBytes(16);
  const cipher = createCipheriv(ALGORITHM, KEY, iv);
  
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  return {
    iv: iv.toString('hex'),
    data: encrypted,
    tag: cipher.getAuthTag().toString('hex'),
  };
}

function decrypt(encrypted: EncryptedData): string {
  const decipher = createDecipheriv(
    ALGORITHM,
    KEY,
    Buffer.from(encrypted.iv, 'hex')
  );
  
  decipher.setAuthTag(Buffer.from(encrypted.tag, 'hex'));
  
  let decrypted = decipher.update(encrypted.data, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
}

// Usage
const ssn = '123-45-6789';
const encrypted = encrypt(ssn);
// Store encrypted.iv, encrypted.data, encrypted.tag

const decrypted = decrypt(encrypted);
// decrypted === '123-45-6789'
```

HASHING (One-Way):
─────────────────────────────────────────────────────────────────────────────
```typescript
import { createHash, timingSafeEqual } from 'crypto';

// For non-password data that needs verification
function hashData(data: string): string {
  return createHash('sha256').update(data).digest('hex');
}

// Timing-safe comparison to prevent timing attacks
function verifyHash(data: string, hash: string): boolean {
  const dataHash = hashData(data);
  return timingSafeEqual(
    Buffer.from(dataHash),
    Buffer.from(hash)
  );
}
```
```

### 49.3 Secrets Management

```
SECRETS MANAGEMENT
─────────────────────────────────────────────────────────────────────────────

RULES:
─────────────────────────────────────────────────────────────────────────────
□ NEVER commit secrets to version control
□ NEVER log secrets
□ NEVER expose secrets in error messages
□ NEVER hardcode secrets in code
□ Use environment variables for configuration
□ Use secrets manager for production

ENVIRONMENT VARIABLES:
─────────────────────────────────────────────────────────────────────────────
```bash
# .env.local (never commit)
DATABASE_URL=postgres://user:pass@localhost:5432/db
JWT_SECRET=your-256-bit-secret
ENCRYPTION_KEY=your-32-byte-hex-key
API_KEY=external-service-api-key
```

```typescript
// Config validation at startup
import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  ENCRYPTION_KEY: z.string().length(64), // 32 bytes in hex
  NODE_ENV: z.enum(['development', 'test', 'production']),
});

const env = envSchema.parse(process.env);
export { env };
```

GITIGNORE REQUIREMENTS:
─────────────────────────────────────────────────────────────────────────────
```gitignore
# Environment files
.env
.env.local
.env.*.local
.env.development
.env.production

# Key files
*.pem
*.key
*.p12

# IDE secrets
.idea/
.vscode/settings.json
```

SECRET ROTATION:
─────────────────────────────────────────────────────────────────────────────
□ Rotate secrets periodically (90 days recommended)
□ Rotate immediately if compromised
□ Support multiple active secrets during rotation
□ Automate rotation where possible
□ Document rotation procedures
```

---

## PART X SUMMARY

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                 PART X: SECURITY & AUTHENTICATION                            │
│                           KEY TAKEAWAYS                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  SECURITY PRINCIPLES:                                                        │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • Defense in depth (multiple layers)                                       │
│  • Least privilege (minimum access)                                          │
│  • Never trust input                                                         │
│  • Secure by default                                                         │
│  • Fail secure                                                               │
│                                                                              │
│  OWASP TOP 10:                                                               │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • Broken access control → Deny by default                                  │
│  • Cryptographic failures → Encrypt sensitive data                          │
│  • Injection → Parameterized queries                                        │
│  • Security misconfiguration → Secure defaults                              │
│  • Vulnerable components → Monitor dependencies                              │
│                                                                              │
│  AUTHENTICATION:                                                             │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • Session-based for traditional apps                                        │
│  • JWT for SPAs/mobile (httpOnly cookies)                                   │
│  • OAuth for social/enterprise SSO                                          │
│  • Passwords: Argon2 or bcrypt, 12+ characters                              │
│  • Short access tokens, refresh token rotation                              │
│                                                                              │
│  AUTHORIZATION:                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • RBAC for clear role hierarchies                                          │
│  • Resource ownership checks                                                 │
│  • Check at every endpoint                                                   │
│  • Deny by default                                                           │
│                                                                              │
│  DATA PROTECTION:                                                            │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • TLS for transit, encryption for rest                                     │
│  • Field-level encryption for sensitive data                                │
│  • Never commit secrets to git                                               │
│  • Use environment variables / secrets managers                              │
│  • Rotate secrets regularly                                                  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---
# PART XI: DEVOPS & DEPLOYMENT

---

## 50. CI/CD PIPELINE ARCHITECTURE

> "If it's not automated, it's broken."

### 50.1 Pipeline Philosophy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      CI/CD PIPELINE PHILOSOPHY                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  CONTINUOUS INTEGRATION (CI)                                                 │
│  ───────────────────────────────────────────────────────────────────────    │
│  Automatically build and test every code change.                           │
│  Catch problems early, when they're cheap to fix.                          │
│                                                                              │
│  Every commit should:                                                        │
│  □ Compile/build successfully                                               │
│  □ Pass all automated tests                                                 │
│  □ Meet code quality standards                                               │
│  □ Have no security vulnerabilities                                         │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  CONTINUOUS DELIVERY (CD)                                                    │
│  ───────────────────────────────────────────────────────────────────────    │
│  Keep code always in a deployable state.                                   │
│  Deploy to production at any time with one button.                         │
│                                                                              │
│  Requirements:                                                               │
│  □ Automated deployment pipeline                                             │
│  □ Environment parity (staging ≈ production)                                │
│  □ Feature flags for incomplete features                                    │
│  □ Rollback capability                                                       │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  CONTINUOUS DEPLOYMENT (CD+)                                                 │
│  ───────────────────────────────────────────────────────────────────────    │
│  Automatically deploy every passing commit to production.                   │
│  No manual intervention required.                                            │
│                                                                              │
│  Prerequisites:                                                              │
│  □ Comprehensive automated testing                                           │
│  □ Robust monitoring and alerting                                            │
│  □ Automatic rollback on failures                                            │
│  □ Team confidence in automation                                             │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 50.2 Pipeline Stages

```
PIPELINE STAGES
─────────────────────────────────────────────────────────────────────────────

┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐
│  COMMIT │──►│  BUILD  │──►│  TEST   │──►│ DEPLOY  │──►│ VERIFY  │
│         │   │         │   │         │   │         │   │         │
│ • Push  │   │ • Install│  │ • Unit  │   │ • Stage │   │ • Smoke │
│ • PR    │   │ • Compile│  │ • Int.  │   │ • Prod  │   │ • Health│
│         │   │ • Lint   │   │ • E2E   │   │         │   │ • Perf  │
└─────────┘   └─────────┘   └─────────┘   └─────────┘   └─────────┘
     │             │             │             │             │
     │   < 1 min   │   < 5 min   │   < 10 min  │   < 5 min   │
     └─────────────┴─────────────┴─────────────┴─────────────┘

─────────────────────────────────────────────────────────────────────────────

STAGE 1: COMMIT CHECKS (< 1 minute)
─────────────────────────────────────────────────────────────────────────────
Purpose: Immediate feedback on code quality
Runs: On every push and PR

Steps:
□ Lint check (ESLint, Prettier)
□ Type check (TypeScript)
□ Commit message format
□ Branch naming convention


STAGE 2: BUILD (< 5 minutes)
─────────────────────────────────────────────────────────────────────────────
Purpose: Verify code compiles and bundles
Runs: On every push to main branches

Steps:
□ Install dependencies
□ Compile/transpile code
□ Build production bundle
□ Generate source maps
□ Build Docker image (if applicable)


STAGE 3: TEST (< 10 minutes)
─────────────────────────────────────────────────────────────────────────────
Purpose: Verify code correctness
Runs: On every push, required for merge

Steps:
□ Unit tests
□ Integration tests
□ Coverage check
□ Security scan (npm audit, Snyk)
□ E2E tests (on main/staging)


STAGE 4: DEPLOY (< 5 minutes)
─────────────────────────────────────────────────────────────────────────────
Purpose: Ship code to environment
Runs: On merge to main (staging), on release (production)

Steps:
□ Deploy to target environment
□ Run database migrations
□ Update environment variables
□ Clear caches (if needed)
□ Update CDN


STAGE 5: VERIFY (< 5 minutes)
─────────────────────────────────────────────────────────────────────────────
Purpose: Confirm deployment success
Runs: After every deployment

Steps:
□ Health checks
□ Smoke tests
□ Performance baseline
□ Error rate monitoring
□ Rollback if failed
```

### 50.3 GitHub Actions Configuration

```
GITHUB ACTIONS CONFIGURATION
─────────────────────────────────────────────────────────────────────────────

COMPLETE CI/CD WORKFLOW:
```yaml
# .github/workflows/ci-cd.yml

name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

env:
  NODE_VERSION: '20'
  
jobs:
  # ─────────────────────────────────────────────────────────────────
  # Stage 1: Quick Checks
  # ─────────────────────────────────────────────────────────────────
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck

  # ─────────────────────────────────────────────────────────────────
  # Stage 2: Build
  # ─────────────────────────────────────────────────────────────────
  build:
    needs: lint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - run: npm ci
      - run: npm run build
      
      - uses: actions/upload-artifact@v4
        with:
          name: build-output
          path: .next/
          retention-days: 1

  # ─────────────────────────────────────────────────────────────────
  # Stage 3: Test
  # ─────────────────────────────────────────────────────────────────
  test-unit:
    needs: lint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - run: npm ci
      - run: npm run test:unit -- --coverage
      
      - uses: codecov/codecov-action@v4
        with:
          token: ${{ secrets.CODECOV_TOKEN }}

  test-integration:
    needs: build
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - run: npm ci
      - run: npm run db:migrate
        env:
          DATABASE_URL: postgres://postgres:postgres@localhost:5432/test
      - run: npm run test:integration
        env:
          DATABASE_URL: postgres://postgres:postgres@localhost:5432/test

  test-e2e:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - run: npm ci
      - run: npx playwright install --with-deps
      
      - uses: actions/download-artifact@v4
        with:
          name: build-output
          path: .next/
      
      - run: npm run test:e2e
      
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/

  # ─────────────────────────────────────────────────────────────────
  # Stage 4: Deploy
  # ─────────────────────────────────────────────────────────────────
  deploy-staging:
    needs: [test-unit, test-integration, test-e2e]
    if: github.ref == 'refs/heads/develop'
    runs-on: ubuntu-latest
    environment: staging
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to Staging
        run: |
          # Deploy command here (Vercel, Railway, etc.)
          echo "Deploying to staging..."

  deploy-production:
    needs: [test-unit, test-integration, test-e2e]
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to Production
        run: |
          # Deploy command here
          echo "Deploying to production..."
      
      - name: Notify on Success
        if: success()
        run: |
          # Slack/Discord notification
          echo "Deployment successful!"
```
```

---

## 51. ENVIRONMENT MANAGEMENT

### 52.0 Environment Strategy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       ENVIRONMENT STRATEGY                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ENVIRONMENT TYPES:                                                          │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ LOCAL (Development)                                                  │    │
│  │                                                                      │    │
│  │ Purpose: Individual developer work                                   │    │
│  │ Data: Seed data, local database                                      │    │
│  │ Access: Developer only                                               │    │
│  │ Deployment: Manual (npm run dev)                                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                              │                                               │
│                              ▼                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ STAGING (Pre-Production)                                             │    │
│  │                                                                      │    │
│  │ Purpose: Testing before production                                   │    │
│  │ Data: Anonymized production data or realistic test data             │    │
│  │ Access: Team members                                                 │    │
│  │ Deployment: Automatic on develop branch                              │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                              │                                               │
│                              ▼                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ PRODUCTION                                                           │    │
│  │                                                                      │    │
│  │ Purpose: Real users, real data                                       │    │
│  │ Data: Production data (protected)                                    │    │
│  │ Access: End users                                                    │    │
│  │ Deployment: Manual approval or auto on main                          │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  ENVIRONMENT PARITY PRINCIPLE:                                               │
│  Staging should be as close to production as possible.                      │
│  "Works on staging" should mean "works in production."                      │
│                                                                              │
│  Same:                                                                       │
│  • Operating system                                                          │
│  • Runtime version                                                           │
│  • Database version                                                          │
│  • Infrastructure architecture                                               │
│                                                                              │
│  Different:                                                                  │
│  • Scale (staging can be smaller)                                           │
│  • Data (staging uses anonymized/test data)                                 │
│  • Domain (staging.example.com vs example.com)                              │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 51.2 Environment Configuration

```
ENVIRONMENT CONFIGURATION
─────────────────────────────────────────────────────────────────────────────

CONFIGURATION HIERARCHY:
─────────────────────────────────────────────────────────────────────────────
1. Default values (code)
2. Shared configuration (.env.example)
3. Environment-specific (.env.production)
4. Local overrides (.env.local)
5. Runtime environment variables

Priority: Higher number wins


FILE STRUCTURE:
─────────────────────────────────────────────────────────────────────────────
project/
├── .env.example          # Template, committed
├── .env.local            # Local overrides, NOT committed
├── .env.development      # Dev defaults, optional commit
├── .env.test             # Test environment, committed
├── .env.production       # Production template, secrets via platform
└── .env                   # Active environment, NOT committed


EXAMPLE CONFIGURATION:
─────────────────────────────────────────────────────────────────────────────
```bash
# .env.example (committed - template)
# Copy to .env.local and fill in values

# App
NODE_ENV=development
APP_URL=http://localhost:3000

# Database
DATABASE_URL=postgres://user:pass@localhost:5432/myapp

# Auth
JWT_SECRET=your-secret-here-min-32-chars
SESSION_SECRET=another-secret-here

# External Services
STRIPE_SECRET_KEY=sk_test_...
SENDGRID_API_KEY=SG...

# Feature Flags
ENABLE_NEW_DASHBOARD=false
```

```typescript
// src/config/env.ts
import { z } from 'zod';

const envSchema = z.object({
  // App
  NODE_ENV: z.enum(['development', 'test', 'production']),
  APP_URL: z.string().url(),
  
  // Database
  DATABASE_URL: z.string().url(),
  
  // Auth
  JWT_SECRET: z.string().min(32),
  SESSION_SECRET: z.string().min(32),
  
  // External Services
  STRIPE_SECRET_KEY: z.string().startsWith('sk_'),
  SENDGRID_API_KEY: z.string().optional(),
  
  // Feature Flags
  ENABLE_NEW_DASHBOARD: z.coerce.boolean().default(false),
});

export const env = envSchema.parse(process.env);
export type Env = z.infer<typeof envSchema>;
```
```

### 51.3 Feature Flags

```
FEATURE FLAGS
─────────────────────────────────────────────────────────────────────────────

PURPOSE:
─────────────────────────────────────────────────────────────────────────────
• Deploy code without releasing features
• Gradual rollouts (1% → 10% → 50% → 100%)
• A/B testing
• Kill switch for problematic features
• Environment-specific features


IMPLEMENTATION:
─────────────────────────────────────────────────────────────────────────────
```typescript
// Simple environment-based flags
const features = {
  newDashboard: process.env.ENABLE_NEW_DASHBOARD === 'true',
  betaFeatures: process.env.NODE_ENV !== 'production',
  debugMode: process.env.DEBUG === 'true',
};

// Usage
if (features.newDashboard) {
  return <NewDashboard />;
}
return <OldDashboard />;
```

```typescript
// More sophisticated feature flag system
interface FeatureFlag {
  name: string;
  enabled: boolean;
  rolloutPercentage?: number;
  allowedUsers?: string[];
  environments?: string[];
}

const flags: FeatureFlag[] = [
  {
    name: 'new-checkout',
    enabled: true,
    rolloutPercentage: 25, // 25% of users
  },
  {
    name: 'admin-dashboard-v2',
    enabled: true,
    allowedUsers: ['admin@company.com'],
  },
  {
    name: 'experimental-ai',
    enabled: true,
    environments: ['development', 'staging'],
  },
];

function isFeatureEnabled(
  flagName: string,
  context: { userId?: string; env: string }
): boolean {
  const flag = flags.find(f => f.name === flagName);
  
  if (!flag || !flag.enabled) return false;
  
  // Environment check
  if (flag.environments && !flag.environments.includes(context.env)) {
    return false;
  }
  
  // User allowlist
  if (flag.allowedUsers && context.userId) {
    return flag.allowedUsers.includes(context.userId);
  }
  
  // Percentage rollout
  if (flag.rolloutPercentage && context.userId) {
    const hash = simpleHash(context.userId + flagName);
    return (hash % 100) < flag.rolloutPercentage;
  }
  
  return true;
}
```
```

---

## 52. MONITORING & OBSERVABILITY

### 52.1 Observability Pillars

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      OBSERVABILITY PILLARS                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                           LOGS                                       │    │
│  │                    "What happened?"                                  │    │
│  │                                                                      │    │
│  │  • Discrete events with context                                      │    │
│  │  • Structured format (JSON)                                          │    │
│  │  • Levels: debug, info, warn, error                                 │    │
│  │  • Searchable and filterable                                         │    │
│  │                                                                      │    │
│  │  Tools: Datadog, Papertrail, LogDNA, CloudWatch                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                          METRICS                                     │    │
│  │                    "How much/many?"                                  │    │
│  │                                                                      │    │
│  │  • Numeric measurements over time                                    │    │
│  │  • Aggregatable (sum, avg, percentiles)                             │    │
│  │  • Alertable (threshold-based)                                       │    │
│  │  • Dashboard-friendly                                                │    │
│  │                                                                      │    │
│  │  Tools: Prometheus, Grafana, Datadog, CloudWatch                    │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                          TRACES                                      │    │
│  │                    "What path did it take?"                          │    │
│  │                                                                      │    │
│  │  • Request flow across services                                      │    │
│  │  • Timing breakdown per operation                                    │    │
│  │  • Correlation IDs link related events                              │    │
│  │  • Bottleneck identification                                         │    │
│  │                                                                      │    │
│  │  Tools: Jaeger, Zipkin, Datadog APM, New Relic                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  COMBINED: Full picture of system behavior                                  │
│  Trace → find slow request → check logs → see metrics spike               │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 52.2 Logging Standards

```
LOGGING STANDARDS
─────────────────────────────────────────────────────────────────────────────

LOG LEVELS:
─────────────────────────────────────────────────────────────────────────────
ERROR   | Something failed, action needed
WARN    | Something unexpected, but handled
INFO    | Normal operations, business events
DEBUG   | Detailed debugging information

Production: INFO and above
Development: DEBUG and above


STRUCTURED LOGGING:
─────────────────────────────────────────────────────────────────────────────
```typescript
import pino from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  formatters: {
    level: (label) => ({ level: label }),
  },
  base: {
    service: 'my-app',
    env: process.env.NODE_ENV,
  },
});

// Good: Structured log
logger.info({
  event: 'order_created',
  orderId: order.id,
  userId: user.id,
  total: order.total,
  items: order.items.length,
}, 'Order created successfully');

// Output:
// {
//   "level": "info",
//   "time": 1704067200000,
//   "service": "my-app",
//   "env": "production",
//   "event": "order_created",
//   "orderId": "ord_123",
//   "userId": "usr_456",
//   "total": 99.99,
//   "items": 3,
//   "msg": "Order created successfully"
// }

// Bad: Unstructured log
console.log(`Order ${order.id} created for user ${user.id} with total ${order.total}`);
```

LOGGING BEST PRACTICES:
─────────────────────────────────────────────────────────────────────────────
□ Use structured format (JSON)
□ Include correlation/request ID
□ Log at appropriate level
□ Include relevant context
□ Don't log sensitive data (passwords, tokens, PII)
□ Use consistent field names
□ Include timestamps
□ Log both success and failure


REQUEST LOGGING MIDDLEWARE:
─────────────────────────────────────────────────────────────────────────────
```typescript
function requestLogger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();
  const requestId = req.headers['x-request-id'] || uuidv4();
  
  // Attach to request for use in handlers
  req.requestId = requestId;
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    
    logger.info({
      event: 'http_request',
      requestId,
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration,
      userAgent: req.headers['user-agent'],
      userId: req.user?.id,
    });
  });
  
  next();
}
```
```

### 52.3 Alerting Strategy

```
ALERTING STRATEGY
─────────────────────────────────────────────────────────────────────────────

ALERT LEVELS:
─────────────────────────────────────────────────────────────────────────────
CRITICAL | Immediate action required    | Page on-call
HIGH     | Action needed soon           | Page during hours, notify off-hours
MEDIUM   | Action needed                | Notify, review next business day
LOW      | Informational                | Log, review weekly


ESSENTIAL ALERTS:
─────────────────────────────────────────────────────────────────────────────
CRITICAL:
□ Application down (health check fails)
□ Database unreachable
□ Error rate > 10%
□ Response time > 5 seconds
□ Security breach detected

HIGH:
□ Error rate > 5%
□ Response time > 2 seconds
□ Disk space < 10%
□ Memory usage > 90%
□ Failed deployments

MEDIUM:
□ Elevated error rate (> 1%)
□ Slow response times (> 1 second)
□ Certificate expiring (< 14 days)
□ Dependency deprecation warnings

LOW:
□ Unusual traffic patterns
□ Non-critical job failures
□ Cache hit rate drops


ALERT FATIGUE PREVENTION:
─────────────────────────────────────────────────────────────────────────────
□ Only alert on actionable issues
□ Include runbook link in alert
□ Set appropriate thresholds (not too sensitive)
□ Group related alerts
□ Implement alert deduplication
□ Review and tune regularly
□ Every alert should wake you up? If not, downgrade it


EXAMPLE ALERT CONFIGURATION:
─────────────────────────────────────────────────────────────────────────────
```yaml
# Datadog-style alert definition
alerts:
  - name: High Error Rate
    query: sum(last_5m):sum:http.errors{service:my-app} / sum:http.requests{service:my-app} > 0.05
    message: |
      Error rate is {{value}}% (threshold: 5%)
      
      Runbook: https://wiki.example.com/runbooks/high-error-rate
      Dashboard: https://dashboard.example.com/my-app
    notify:
      - "@slack-oncall"
      - "@pagerduty-high"
    
  - name: Application Health Check
    query: http.health_check{service:my-app} == 0
    message: |
      Health check failing for my-app
      
      Runbook: https://wiki.example.com/runbooks/app-down
    notify:
      - "@pagerduty-critical"
```
```

---

## 53. DEPLOYMENT STRATEGIES

### 53.1 Deployment Methods

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       DEPLOYMENT STRATEGIES                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ROLLING DEPLOYMENT                                                          │
│  ───────────────────────────────────────────────────────────────────────    │
│  Gradually replace old instances with new.                                  │
│                                                                              │
│  Before:  [v1] [v1] [v1] [v1]                                               │
│  During:  [v2] [v1] [v1] [v1] → [v2] [v2] [v1] [v1] → ...                  │
│  After:   [v2] [v2] [v2] [v2]                                               │
│                                                                              │
│  ✓ Zero downtime                                                             │
│  ✓ Gradual rollout                                                           │
│  ✗ Mixed versions during deploy                                             │
│  ✗ Rollback takes time                                                       │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  BLUE-GREEN DEPLOYMENT                                                       │
│  ───────────────────────────────────────────────────────────────────────    │
│  Two identical environments, switch traffic instantly.                      │
│                                                                              │
│  Blue (active):  [v1] [v1] [v1] [v1]  ◄── Traffic                           │
│  Green (idle):   [v2] [v2] [v2] [v2]                                        │
│                                                                              │
│  After switch:                                                               │
│  Blue (idle):    [v1] [v1] [v1] [v1]                                        │
│  Green (active): [v2] [v2] [v2] [v2]  ◄── Traffic                           │
│                                                                              │
│  ✓ Instant switch                                                            │
│  ✓ Easy rollback (switch back)                                              │
│  ✗ Requires double infrastructure                                           │
│  ✗ Database migrations tricky                                               │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  CANARY DEPLOYMENT                                                           │
│  ───────────────────────────────────────────────────────────────────────    │
│  Route small percentage of traffic to new version.                          │
│                                                                              │
│  [v1] [v1] [v1] [v1] [v1] [v1] [v1] [v1] [v1] [v2]                          │
│   90% traffic ────────────────────────────►  10%                            │
│                                                                              │
│  If healthy: gradually increase v2 percentage                               │
│  If problems: route all traffic back to v1                                  │
│                                                                              │
│  ✓ Low risk (only affects small %)                                         │
│  ✓ Real production testing                                                   │
│  ✗ More complex routing                                                      │
│  ✗ Need good metrics to compare                                             │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 53.2 Rollback Procedures

```
ROLLBACK PROCEDURES
─────────────────────────────────────────────────────────────────────────────

WHEN TO ROLLBACK:
─────────────────────────────────────────────────────────────────────────────
□ Error rate spikes above threshold
□ Response times degrade significantly
□ Critical functionality broken
□ Security vulnerability discovered
□ Data corruption detected

DECISION THRESHOLD:
If you're debating whether to rollback → rollback
It's easier to fix and redeploy than to debug in production


ROLLBACK CHECKLIST:
─────────────────────────────────────────────────────────────────────────────
□ 1. Confirm the issue is deployment-related
□ 2. Notify team of rollback decision
□ 3. Execute rollback command
□ 4. Verify rollback successful (health checks)
□ 5. Monitor metrics return to baseline
□ 6. Document incident
□ 7. Investigate root cause


ROLLBACK COMMANDS:
─────────────────────────────────────────────────────────────────────────────
```bash
# Vercel
vercel rollback

# Kubernetes
kubectl rollout undo deployment/my-app

# AWS ECS
aws ecs update-service --service my-service --task-definition my-app:previous

# Docker Compose
docker-compose up -d --no-deps my-app  # With previous image tag

# Database (if migration failed)
npm run db:rollback
```

PREVENTING ROLLBACK ISSUES:
─────────────────────────────────────────────────────────────────────────────
□ Keep deployments small (easier to identify problems)
□ Database migrations must be backward compatible
□ Feature flags for new functionality
□ Keep previous version running briefly
□ Test rollback procedure regularly
□ Automate rollback triggers
```

### 53.3 Database Migration Strategy

```
DATABASE MIGRATION STRATEGY
─────────────────────────────────────────────────────────────────────────────

ZERO-DOWNTIME MIGRATION RULES:
─────────────────────────────────────────────────────────────────────────────

RULE 1: ADDITIVE CHANGES ONLY
─────────────────────────────────────────────────────────────────────────────
Safe: Add column, add table, add index
Unsafe: Remove column, rename column, change type

For unsafe changes, use multi-step approach:
1. Add new column (deploy)
2. Migrate data, update code to use new column (deploy)
3. Remove old column (deploy after verification)


RULE 2: BACKWARD COMPATIBLE
─────────────────────────────────────────────────────────────────────────────
Old code must work with new schema.
New code must work with old schema.

This enables:
• Rolling deployments (mixed versions)
• Easy rollback (code rollback without DB rollback)


RULE 3: SEPARATE DEPLOY AND MIGRATE
─────────────────────────────────────────────────────────────────────────────
Don't run migrations as part of deployment.
Migrations should be a separate, controlled step.

```yaml
# CI/CD pipeline
deploy:
  steps:
    - name: Deploy new code
      run: deploy-to-production
    
    - name: Run migrations (manual approval)
      run: npm run db:migrate
      requires: manual-approval
```


EXAMPLE: RENAMING A COLUMN
─────────────────────────────────────────────────────────────────────────────
Goal: Rename `userName` to `displayName`

Step 1: Add new column (Migration 1)
```sql
ALTER TABLE users ADD COLUMN display_name VARCHAR(255);
```

Step 2: Deploy code that writes to both columns
```typescript
user.displayName = value;
user.userName = value; // Keep both in sync
```

Step 3: Backfill data (Migration 2)
```sql
UPDATE users SET display_name = user_name WHERE display_name IS NULL;
```

Step 4: Deploy code that reads from new column only
```typescript
const name = user.displayName;
```

Step 5: Remove old column (Migration 3)
```sql
ALTER TABLE users DROP COLUMN user_name;
```
```

---

## PART XI SUMMARY

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     PART XI: DEVOPS & DEPLOYMENT                             │
│                           KEY TAKEAWAYS                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  CI/CD PIPELINE:                                                             │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • Commit Checks (< 1 min): Lint, typecheck                                │
│  • Build (< 5 min): Compile, bundle                                        │
│  • Test (< 10 min): Unit, integration, E2E                                 │
│  • Deploy (< 5 min): Push to environment                                   │
│  • Verify (< 5 min): Health checks, smoke tests                            │
│                                                                              │
│  ENVIRONMENT MANAGEMENT:                                                     │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • Local → Staging → Production                                             │
│  • Environment parity (staging ≈ production)                                │
│  • Secrets in environment variables / secrets manager                       │
│  • Feature flags for gradual rollout                                        │
│                                                                              │
│  MONITORING & OBSERVABILITY:                                                 │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • Three pillars: Logs, Metrics, Traces                                    │
│  • Structured logging (JSON)                                                 │
│  • Actionable alerts only                                                    │
│  • Include runbook links in alerts                                           │
│                                                                              │
│  DEPLOYMENT STRATEGIES:                                                      │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • Rolling: Gradual replacement                                              │
│  • Blue-Green: Instant switch, easy rollback                                │
│  • Canary: Small % first, then expand                                       │
│  • If debating rollback → rollback                                          │
│                                                                              │
│  DATABASE MIGRATIONS:                                                        │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • Additive changes only                                                     │
│  • Backward compatible                                                       │
│  • Multi-step for breaking changes                                           │
│  • Separate from deployment                                                  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---


---
*End of propagated content*
