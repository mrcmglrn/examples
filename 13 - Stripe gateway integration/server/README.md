# Accepting a payment

An [Express server](http://expressjs.com) implementation

You can [🎥 watch a video](https://youtu.be/WG4ehXSEpz4) to see how this server was implemented and [read the transcripts](./TRANSCRIPTS.md).

## Requirements

- Node v10+
- Configured .env file

## How to run

1. Confirm `.env` configuration

Ensure the API keys are configured in `.env` in this directory. It should include the following keys:

```yaml
# Stripe API keys - see https://stripe.com/docs/development/quickstart#api-keys
STRIPE_PUBLISHABLE_KEY=pk_test_51QmervGfriQs0Y28iuBI9TExjxEzu7WIFkKsLgsiuZBZx5dHcrmT6WpWY0aEZ0W8NETpoMhiX66Gxv5w5KbI188j00C4cvzOMG
STRIPE_SECRET_KEY=sk_test_51QmervGfriQs0Y28S2mL7NIbRLUeMDfZPybHTEh6Msf9PB75Z18JfsJj3m38Oo8qewZzMSvH0lmsk4CAIgUjU9Yh008SDz2qdR

# Path to front-end implementation. Note: PHP has it's own front end implementation.
STATIC_DIR=../../client/html
```

2. Install dependencies and start the server

```
npm install
npm start
```

3. The react frontend will be running on `localhost:4242`. Follow the instructions in the README there to install and start the frontend server.
