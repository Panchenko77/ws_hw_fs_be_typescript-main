/// <reference types="jest-extended" />

declare namespace jest {
  type ValidationConstraints = { [constraint: string]: string };
  type NestedValidationConstraints = {
    constraints?: ValidationConstraints;
    // eslint-disable-next-line no-use-before-define
    children: Array<ValidationExpected>;
  };
  type ValidationExpected = {
    [property: string]: ValidationConstraints | NestedValidationConstraints;
  };

  interface Matchers<R> {
    toGraphQLResponseData(data: any): R;
    toGraphQLResponseError(error: Error | string | RegExp): R;
  }
}
