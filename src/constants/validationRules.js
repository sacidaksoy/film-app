const authCredentials = {
  username: 'test@test.com',
  password: 'test1234'
}

const validationMessages = {
  // SignUp Form
  signUp: {
      email: 'Please enter a valid email address',
      password: 'Please enter a valid password',
  }
};

const regex = {
  email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  password: /^(?=.*).{6,}$/,
};

const {
  signUp
} = validationMessages;

const validationRules = {
  //sign up
  signUp: {
      fields: {
          email: {
              pattern: '',
              regexPattern: authCredentials.username,
              regexMessage: signUp.email,
          },
          password: {
              pattern: '',
              regexPattern: authCredentials.password,
              regexMessage: signUp.password,
          },
      }
  },
};


export {
  validationRules
}