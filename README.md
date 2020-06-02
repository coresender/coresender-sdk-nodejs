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
```typescript
import {Coresender, BodyType} from 'coresender';

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

##### Email request
```typescript
import {Coresender} from 'coresender';

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
});

const result = await request.execute();
```

### Contribute

The Coresender Node.js SDK is an open-source project released under MIT license. We welcome any contributions!

You can help by:
* Writing new code
* Creating issues if you find problems
* Helping others with their issues
* Reviewing PRs
