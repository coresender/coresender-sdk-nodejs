# Coresender node.js SDK

One Paragraph of project description goes here

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
Give examples
```

### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be

```bash
$ npm install --save coresender
```

End with an example of getting some data out of the system or using it for a little demo


### Usage

```typescript
import {Coresender} from 'coresender';

const client = new Coresender('account_id', 'account_secret');

const request = client.sendEmailRequest();

request.addToBatch({
    fromEmail: 'alice@example.com',
    toEmail: 'bob@example.com',
    subject: 'Hello Bob',
    bodyText: 'Nice to meet you.',
});

const result = await request.execute();
```



