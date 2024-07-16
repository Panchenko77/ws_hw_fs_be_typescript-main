# Full-Stack / Backend homework (TypeScript, GraphQL)

Welcome to the Digication work sample for Full-Stack developers (TypeScript, GraphQL, React)! This is our way to get 
some experience working with you and to gauge your skill in using TypeScript, GraphQL and databases. There is no 
official time-limit for this exercise, but you should finish it within a week. We encourage you to take the time you 
need in order to **provide quality work that best reflects your skills**.

## Context

We have implemented a basic backend service in TypeScript which uses TypeORM to manage portfolios and pages. Currently, 
a portfolio can keep only one version of a set of pages. We would like to extend the service, so a portfolio can support many 
versions of a set of pages.

## Data Models

The `Portfolio` has fields: `id`, `name`, `url`

The `Page` has fields: `id`, `name`, `url`

## Relationships

The model relationship in this example is kept as simple as possible, think of it this way:

A `Portfolio` can have a set of many `Pages`.

One `Page` must belong to exactly one `Portfolio`.

## Versioning of Pages

There are many ways to version content. We want you to get creative and come up with a couple of different approaches 
how to support versioning for pages and the pro's and con's of each approach. Please provide your ideas in the 
questionnaire when submitting your project.

After you got creative we would like you to focus on the implementation of a specific idea: How could you implement 
a `PortfolioVersion` entity which supports many versions of a set of pages. eg a portfolio version of type `draft` with 
3 pages. This is the main version a user is working on and where she makes changes to the pages. 

But there should also be two more version types: 
- a `published` version, eg with 2 pages
- a `snapshot` version with 5 pages

Please make the necessary changes to the provided entities and introduce new entities as you see a need.

Note: it should be possible to have as many `snapshot` versions as the user wants.

## Queries and Mutations

Add a mutation to use the `draft` version to create a new `snapshot` version.

Provide a query to get all available portfolio versions and a second query to fetch all portfolio pages for a given portfolio version.

## Technical Requirements

You have to use `TypeScript 4.4` and `Apollo Server`. We prefer the `code-first` approach so please choose a proper 
tool like `TypeGraphQL` (recommended). A relational database like SQLite, MySQL or Postgres is probably a good idea as well. 
Regarding an ORM and SQL query builder you should use `TypeORM`. For testing we recommend to use `jest` but feel free 
to use a different test framework if needed.

## Final Notes

When running the service with `yarn dev` or the tests with `yarn test` you will notice a small problem. Please fix this
issue first before you implement the versioning.

Also, please take a look at the provided `scripts` in `package.json` as they might give you some more ideas about that
is expected.

Some documentation and good unit tests will be much appreciated. Please make sure to apply common design patterns and 
best practices like you would do for any of your professional projects.

Are you usually using additional tools in your projects? We can’t wait to hear about your best practices and why you 
think it's important to use them! Please provide your best practices in the questionnaire when submitting your project.

## Encouragement

Digication team members have worked through this work sample to make sure we are not asking for too much of your time. 
This shouldn't take you longer than a couple of hours depending on your knowledge and the bells and whistles you want 
to add. We are looking forward to hearing from you!
