# rest-auth-example

This example app don not include DB integration. We use in-memory storage in models singletone
for emulating basic DB operations.

App was written under node v.11.0.0 and uses simple Koa.js framework as a basement.

At first run `npm install` for installing dependecies and then you can try `npm run start` for running it as an application
or you can try `npm run test` to perform automatic testing.

When you run app, you can try:

`POST localhost:3000/api/v1/auth/log-in` with body `{"login": "user", "password": "password"}` to become authorized
You'll get a response object like `{"accessToken": "...", "expiresIn": "..."}` or 40x error if something goes wrong

Then you can use `accessToken` for signing your protected requests with header {"Authorization": "your-token-here"}, 
you can test it via accessing a protected method `GET localhost:3000/api/v1/content/protected`

You can also try to log-out via `POST localhost:3000/api/v1/auth/log-out` - request must also be signed with your token.
If you logged in several times, log-out method will revoke only token that you give to it. Other tokens will be still alive.
For example, you logged-in from different devices and want to log-out only on one of them.

There is another method `GET localhost:3000/api/v1/content/public` which requires no authorization at all.

I used JWT for generating tokens because it can store some signoficant information to use both on client and server.

This kind of authorization is very simple. In the real projects I commonly use a pair of tokens: a very short-living 
access token with a long-living refresh token for common toking renewing. I find it more secure and handy.
