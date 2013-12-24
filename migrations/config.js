module.exports = {
  development: {
    mygrate: {
      // hooks will not run within migrations unless the name of the folder
      // is >= to this timestamp.
      minHookDate: "201312220022"
    },
    postgresql: {
      host: "localhost",
      database: "plv8_bedrock_dev",
      user: "plv8_bedrock_dev_user",
      password: "dev"
    }
  },
  test: {
    postgresql: {
      host: "localhost",
      database: "plv8_bedrock_test",
      user: "plv8_bedrock_test_user",
      password: "test"
    }
  },
  production: {
    postgresql: {
      host: "localhost",
      database: "plv8_bedrock_prod",
      user: "plv8_bedrock_prod_user",
      password: "prod"
    }
  }
};
