Next.js testing suite uses a 'Testing Trophy' approach. Implement Jest for isolated business logic and Playwright for full-user-flow integration tests.

Requirements:

    Server Side: For Server Components and Actions, prioritize integration tests that verify data outcomes rather than unit testing the RSCs directly.

    Client Side: Use React Testing Library with an accessibility-first approach (e.g., findByRole).

    Data Mocking: Use MSW to intercept network requests for client-side components.

    Infrastructure: Set up a Playwright configuration that includes Trace Viewer for debugging and a GitHub Actions workflow to run these tests on push."