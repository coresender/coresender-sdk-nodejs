# Coresender Node.js SDK

This is the officially supported Node.js library for [Coresender](https://coresender.com). It allows you to quickly and easily integrate with our API and improve your email deliverability.

### Prerequisites

What things you need to install the software and how to install them

* Node.js v6 or higher
* The Coresender service. You can start with a free 100 emails/month developer plan and move to one of our [pricing plans](https://coresender.com/pricing) when you're done.

### Installation

Install the library with
```bash
npm install --save coresender
```

### Usage

##### Simple email
```javascript
const {Coresender, BodyType} = require('coresender');

const client = new Coresender('account_id', 'account_secret');

const params = {
    fromEmail: 'alice@example.com',
    toEmail: 'bob@example.com',
    subject: 'Hello Bob',
    body: '<div>Nice to meet you.</div>',
    bodyType: BodyType.HTML,
};

const result = await client.simpleEmail(params);
```

###### Result
```javascript
{
  messageId: 'd2a82708-2067-4b3b-8866-b33355036fde',
  customId: '',
  status: 'accepted',
  errors: []
}
```

##### Email request
```javascript
const {Coresender} = require('coresender');

const client = new Coresender('account_id', 'account_secret');

const request = client.sendEmailRequest();

// required fields only
request.addToBatch({
    fromEmail: 'alice@example.com',
    toEmail: 'bob@example.com',
    subject: 'Hello Bob',
    bodyText: 'Nice to meet you.',
});

// available fields
request.addToBatch({
    fromEmail: 'alice@example.com',
    fromName: 'Alice',
    toEmail: 'bob@example.com',
    toName: 'Bob',
    subject: 'Hello Bob',
    bodyText: 'Nice to meet you.',
    trackOpens: true,
    trackClicks: true,
    listUnsubscribe: 'https://unsub.me/',
    listId: '000471416624-654a-3d21-b98e-7654e321',
    customId: '123e4567-e89b-12d3-a456-426614174000',
    customIdUnique: true,
    bodyHTML: '<div>Nice to meet you.</div>',
    replyTo: [{email: 'support@coresender.com', name: 'Support'}],
});

const result = await request.execute();
```

###### Result object
```javascript
result.allAccepted() // returns TRUE if all messages was accepted
result.getItems() // returns array of status objects for all messages

// Example result from getItems() method
[
  {
    messageId: 'ff191365-316e-41e0-a185-5c7433d92b8a',
    customId: '',
    status: 'accepted',
    errors: []
  },
  {
    messageId: '',
    customId: '',
    status: 'rejected',
    code: 'EMAIL_SUPPRESSED',
    errors: [
      {
        code: 'EMAIL_SUPPRESSED',
        description: "The recipient's email address suppressed@email.com is on a suppression list"
      }
    ]
  }
]
```


### Debugging
To enable debug logging for coresender module set NODE_DEBUG environment variable to coresender.

```bash
$ NODE_DEBUG=coresender node app.js
```

### Contribute

The Coresender Node.js SDK is an open-source project released under MIT license. We welcome any contributions!

You can help by:
* Writing new code
* Creating issues if you find problems
* Helping others with their issues
* Reviewing PRs
