# prediction-market-ui

UI interface for the prediction market

## Available Scripts

In the project directory, you can run:

- `yarn start` to start the project in dev mode
- `yarn test` to run the tests in watch mode
- `yarn test-ci` to run all tests and generate a code coverage report
- `yarn build` to build the app
- `yarn commit` to start the commit wizard
- `yarn storybook` to start the storybook
- `yarn lint` to run the linter on entire project
- `yarn format` to run prettier
- `yarn analyze` to build and create a the source/dependency graph

## Contribution Guidelines

### Dependency Checklist

Before adding a dependency to the project please make sure it satisfies the below criteria:

1. Is open-source and has a permissive license [MIT, ISC, Apache, etc.]
2. Is actively maintained

   1. Check if the author/owner/maintainer is active in the github issues, fixing issues, adding features with new releases etc.
   2. Merging dependabot PRs should not be classified as activity on a repository.

3. Dependency should be tree-shakable.
4. Should have a low footprint than others that provide same functionality.

### Creating a commit

This repository conforms with [conventional commits](https://www.conventionalcommits.org/) and uses commitilint for that. So when making a commit please always perform below steps:

1. git add <path/of/file/to/add>
2. yarn commit

`yarn commit` will start the commitilint wizard which will help you to create a commit message that follows conventional commit guidelines.

You can read the conventional commit specification [here](https://www.conventionalcommits.org/en/v1.0.0/#specification).

Note: PRs without proper commit messages might get rejected.

### Creating and Merging PRs

1. PR title should not be same as branch name but should follow the convention commit guidelines.

Invalid PR title:

```
Add component Button
```

Valid PR title:

```
feat(Button): add button component
```

2. All PRs require at least 1 approval during the review.

3. All feature/bug fix branches should be merged using `Squash and merge` button.
