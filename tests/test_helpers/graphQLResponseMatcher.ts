expect.extend({
  toGraphQLResponseData(received: any, expected: any) {
    const pass = this.equals(received?.data, expected);

    return {
      pass,
      message: () => {
        let message = `Expected GraphQL query response data:\n${this.utils.printExpected(expected)}\n`;
        message += `But it was response with:\n${this.utils.printReceived(received)}\n`;

        return message;
      },
    };
  },

  toGraphQLResponseError(received: any, expected: Error | string | RegExp) {
    let pass = false;
    if (expected instanceof RegExp) {
      pass = expected.test(received?.errors[0]?.message);
    } else {
      pass = this.equals(received?.errors[0]?.message, expected instanceof Error ? expected.message : expected);
    }

    return {
      pass,
      message: () => {
        let message = `Expected GraphQL query response error:\n${this.utils.printExpected(expected)}\n`;
        message += `But it was response with:\n${this.utils.printReceived(received)}`;
        return message;
      },
    };
  },
});
