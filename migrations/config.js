module.exports = {
  development: {
    mygrate: {
      // hooks will not run within migrations unless the migration timestamp
      // is older than this timestamp. Adjust this to be older than the last
      // production migration so hooks do not get rerun.
      minHookDate: "201312220012"
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
