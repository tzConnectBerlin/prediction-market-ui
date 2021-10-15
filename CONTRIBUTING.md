# Contribution Guidelines

## Dependency Checklist

Before adding a dependency to the project please make sure it satisfies the below criteria:

1. Is open-source and has a permissive license [MIT, ISC, Apache, etc.]
2. Is actively maintained

   1. Check if the author/owner/maintainer is active in the github issues, fixing issues, adding features with new releases etc.
   2. Merging dependabot PRs should not be classified as activity on a repository.

3. Dependency should be tree-shakable. Check on [bundlephobia](https://bundlephobia.com/)
4. Should have a low footprint than others that provide same functionality. Check on [bundlephobia](https://bundlephobia.com/)

## Creating a commit

This repository conforms with [conventional commits](https://www.conventionalcommits.org/) and uses commitilint for that. So when making a commit please always perform below steps:

1. git add <path/of/file/to/add>
2. yarn commit

`yarn commit` will start the commitilint wizard which will help you to create a commit message that follows conventional commit guidelines.

You can read the conventional commit specification [here](https://www.conventionalcommits.org/en/v1.0.0/#specification).

Note: PRs without proper commit messages might get rejected.

## Creating and Merging PRs

1. PR title should not be same as branch name but should follow the convention commit guidelines.

   Invalid PR title:

   ```text
   Add component Button
   ```

   Valid PR title:

   ```text
   feat(Button): add button component
   ```

2. All PRs require at least 1 approval during the review.

3. All feature/bug fix branches should be merged using `Squash and merge` button.

## Creating a Release

1. Create a `release` branch from develop.
2. Bump the version and commit in the release branch.
3. Merge release branch in `main`. DO NOT `Squash and merge`. Create a merge commit instead.
4. Create a release from `main`.
5. After merging, create a `realign` branch from `main` and `Squash and merge` the realign branch in `develop`.

---

## Conventions

This section of the readme defines the coding conventions and rules that should be followed by all the contributors.
This section is more based on taste and style and should not be taken as absolute truth.
If you want to modify/add/remove any part of this section then please open a issue on GitHub and start the discussion.
Comments and suggestions for improvements are most welcome.

### Goals

**Why do we need conventions?**

Most of the time the software once developed is not supported or maintained by the original author and as new members join the team (and others leave) it
becomes difficult to maintain the project and discussions like "my style is bette than your style" start. The goal here is to minimize these discussions and lay a solid groundwork for new members to work upon.

These are the 5 base goals that we'll try to achieve when creating a rule or coding convention:

1. **Consistency** - Conventions enforce consistency. If we are doing something bad it is best to do it in a consistent way than to do things in an inconsistent manner. Consistency throughout the project allows reader to focus on the content rather than the structure.
2. **Bug Reduction** - Rules and conventions help us to identify and quash bugs easily.
3. **Speed of development** - Doing things as per given set of rules the speed of development increases as everyone in the team know what X method or Y component will do and how to use it.
4. **Scalability** - With a proper structure we can scale any project easily be it 5 component app or 500.
5. **Ease of Refactoring** - Refactoring a piece of code that was written 3-4 years back becomes easy for new member refactor and add new features.

### Rules

#### General

1. Minimize the use of `any`. Read when to use `never` and `unknown` [here](https://blog.logrocket.com/when-to-use-never-and-unknown-in-typescript-5e4d6c5799ad/).
2. Always use `async/await` and never `then/catch`.
3. Co-location: Files that belong together should be kept in same folder or at least near each other.
4. Always catch and log errors. All the code that can break should be enclosed inside `try/catch`.
5. Always question the design that you are given. You do not need to blindly implement all the designs provided.

#### React

1. Always use functional components.
2. Always try to decompose the components in smaller section. [Read](https://medium.com/dailyjs/techniques-for-decomposing-react-components-e8a1081ef5da)
3. A `tsx` file should always export a component with same name as the file. e.g a `XYZ.tsx` file should not export `ABC` component.
4. When creating a component in `design-system` (and `pages`), make sure the below requirements are met:
   1. It should be in its own folder.
   2. A storybook file (`.stories.tsx`) with proper stories defined showing all the available states. **Not required for `pages`**
   3. A test file (`.test.tsx`) with proper and meaningful tests incl. at least one snapshot. A single snapshot test should not be considered as proper testing.
   4. An `index.ts` file that exports the main component and its props.
   5. It is properly categorized as `atom`, `molecule` or an `organism`.
   6. It the component requires a child component then keep it in the same folder. **This should only be done if the child component will not be re-used anywhere outside of the parent component**
5. Component importing: When importing a component refer the below example

   ```jsx
   // bad
   import Footer from './Button/Button';

   // bad
   import Button from './Button/index';

   // good
   import Button from './Button';
   ```

6. Redux should be used only in the `pages` and only to share the state with the other `pages`. It should never be used to store API results.
7. `atom`, `molecule` or an `organism` should never trigger an API call.
8. `atom` should never import a `molecule` or `organism`, `molecule` can import `atom` components but not another `molecule` or `organism` and `organism` can import both `atom` and `molecule`.
9. API calls should always have their own method (No nested or multiple API calls inside same method).

   ```js
   // bad
   const getAllUserData = async () => {
     const data = await axios.get('/api/v1/user/1');
     const profile = await axios.get('/api/v1/user/profile/1');
     return { ...data, ...profile };
   };

   // good

   const getUserData = async () => {
     const userData = await axios.get('/api/v1/user/1');
     return userData;
   };

   const getUserProfileData = async () => {
     const profile = await axios.get('/api/v1/user/profile/1');
     return profile;
   };

   const getAllUserData = async () => {
     const data = await getUserData();
     const profile = await getUserProfileData();
     return { ...data, ...profile };
   };
   ```

10. `pages` should never call an API method directly but use subscription/api hooks.
11. All the forms should be created using `Formik`.
12. When handling complex state update prefer `useReducer` over `useState`.

#### Styling

1. Never use `px` always use `rem`. Read the difference between `em` and `rem` [here](https://zellwk.com/blog/rem-vs-em/).
2. Never use `cursor: pointer` on a normal button. [Read here why](https://medium.com/simple-human/buttons-shouldnt-have-a-hand-cursor-b11e99ca374b)
3. Never use `style` prop and try to minimize the use of `sx` prop. Use styled-components (using emotion) as much as possible.
4. Use `Typography` atom for all text related things. The `size` prop accepts material-ui [variants](https://next.material-ui.com/customization/typography/#variants) as well as custom size.
5. We use [emotion global styles](https://emotion.sh/docs/globals) together with [material-ui themes](https://material-ui.com/customization/theming/).
   1. We use a primary color with varying opacity levels to differentiate between the states (e.g. disabled, active, hover) of a given component.
   2. If the primary color needs to be changed then that changes the theme and goes to the theme section. **Approval from designer is required**
   3. If you need to override color(or other attribute) of a material-ui component then that goes to the Global style section.
