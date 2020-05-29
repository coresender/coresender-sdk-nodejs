# Coresender node.js SDK

One Paragraph of project description goes here

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
Node.js v6 or higher
```

### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be

```bash
$ npm install --save coresender
```

End with an example of getting some data out of the system or using it for a little demo


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
