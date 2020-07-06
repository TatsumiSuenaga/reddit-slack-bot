# Reddit Slack Bot

### Description
This project is under construction and largely based off of a [Medium tutorial](https://medium.com/northcoders/make-a-web-scraper-with-aws-lambda-and-the-serverless-framework-807d0f536d5f).

### Set up

1. Install and set up `serverless` in your local environment with `npm i -g serverless`.
2. [Create a slack app/bot for your workspace](https://api.slack.com/apps?new_app=1)
3. Next locate your bot's webhook and then create a AWS SSM secure string parameter called `SLACK_WEB_HOOK_URL` on [AWS System Manager](https://console.aws.amazon.com/systems-manager) under **Parameter Store**
4. Configure your AWS credentials with the app and deploy
```
serverless login
serverless config credentials --provider aws --key <YOUR-KEY-ID> --secret <YOUR-SECRET>
serverless deploy
```
5. Go to your Lambda dashboard in your AWS and set custom triggers

### Running jobs
You can run a job locally with
`npm run dev:getCelestePosts`
