# Beacon - Test Automation Tool Picker

This is a NextJS starter in Firebase Studio, for an application named Beacon. Beacon helps users find the best test automation tools tailored to their needs.

To get started, take a look at src/app/page.tsx.

## Troubleshooting Common Next.js Issues

### Hydration Mismatches

If you encounter hydration errors (where the server-rendered HTML differs from the initial client-side render), consider the following:

*   **Browser Extensions:** Some browser extensions can modify the HTML of a page before React loads, leading to mismatches. Attributes like `data-qb-installed="true"` or similar are strong indicators of an extension interfering. Try disabling extensions or using an incognito/private browsing window to see if the error persists. If an extension is identified as the cause, you may need to configure it to ignore your development site or disable it during development.
*   **Dynamic Values:** Ensure that client-side specific values (e.g., `new Date()`, `Math.random()`, `window` object access) are handled within `useEffect` hooks to prevent them from causing differences between server and client initial renders. This typically involves initializing state to a neutral value (like `null` or an empty string) and then setting the dynamic value in `useEffect`.

