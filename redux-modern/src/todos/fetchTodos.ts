import { Todo } from "./types";

export function fetchTodos(): Todo[] {
  return [
    { id: 1, title: "Migrate to TypeScript", text: "Convert the project to TypeScript for better type safety.", done: false },
    { id: 2, title: "Upgrade React", text: "Ensure React is updated to the latest stable version.", done: false },
    { id: 3, title: "Replace Class Components", text: "Refactor class components into functional components with hooks.", done: false },
    { id: 4, title: "Install Redux Toolkit", text: "Replace legacy Redux with Redux Toolkit for cleaner state management.", done: false },
    { id: 5, title: "Upgrade Bootstrap", text: "Upgrade from Bootstrap 3 to Bootstrap 5 and update all styles accordingly.", done: false },
    { id: 6, title: "Remove Material-UI 0.5", text: "Replace deprecated Material-UI 0.5 with the latest @mui version.", done: false },
    { id: 7, title: "Remove Bluebird", text: "Remove Bluebird and replace it with native JavaScript Promises and async/await.", done: false },
    { id: 8, title: "Optimize Routing", text: "Update routing to use react-router-dom v6, including nested routes.", done: false },
    { id: 9, title: "Add State Management Tests", text: "Write unit tests for Redux slices or reducers using Jest.", done: false },
    { id: 10, title: "Adopt Styled Components or CSS Modules", text: "Migrate styling to a modern approach like CSS Modules or styled-components.", done: false },
    { id: 11, title: "Implement Code Splitting", text: "Use React's lazy and Suspense for code splitting to improve performance.", done: false },
    { id: 12, title: "Upgrade Webpack or Vite", text: "Ensure the build tool is upgraded to the latest Webpack version or migrate to Vite.", done: false },
    { id: 13, title: "Improve Testing Framework", text: "Replace old testing frameworks with Jest and React Testing Library.", done: false },
    { id: 14, title: "Implement ESLint and Prettier", text: "Add ESLint and Prettier for code linting and formatting.", done: false },
    { id: 15, title: "Update Package Dependencies", text: "Upgrade all npm packages to their latest stable versions.", done: false },
    { id: 16, title: "Add CI/CD Pipeline", text: "Set up a continuous integration and deployment pipeline with GitHub Actions, CircleCI, or similar.", done: false },
    { id: 17, title: "Improve Accessibility", text: "Ensure the app meets accessibility standards (WCAG).", done: false },
    { id: 18, title: "Add Performance Monitoring", text: "Integrate tools like Lighthouse, Sentry, or New Relic to monitor app performance and errors.", done: false },
    { id: 19, title: "Add Dark Mode", text: "Implement a toggleable dark mode using modern UI frameworks.", done: false },
    { id: 20, title: "Refactor API Calls", text: "Replace old API calls with Axios or modern fetch patterns and centralize them in a service layer.", done: false },
    { id: 21, title: "Implement Add Todo", text: "Probably more stuff that needs to be done, implement Add Todo Component", done: false },
  ];
}
