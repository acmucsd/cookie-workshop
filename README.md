# Cookie Craze

So how can an attacker steal your cookies, and what can they actually do about it?

Let's check: log into your [ACM membership](https://members.acmucsd.com) account and open dev tools (Ctrl+Shift+I or F12)

Head to the Application tab and look at the `ACCESS_TOKEN` cookie. Go through the security attributes HttpOnly, SameSite, and Secure. Are any of them set?

*No!*

Importantly, HttpOnly isn't set. That means that any JavaScript running in the page can access it.
Hop over to the Console tab and type this code:
```js
document.cookie
```
Yup, there it is. Let's add some code to extract it:
```js
document.cookie
    .split('; ')
    .find(c => c.startsWith('ACCESS_TOKEN='))
    ?.split('=').slice(1).join('=');
```
Now this should print out just the token.

Importantly, here's how to make an HTTP request in JavaScript. The elipses (...) are for you to fill in
> Hint: The Authorization header needs to be the string `Bearer <TOKEN>`

```js
(async () => {
  const endpoint = 'https://api.acmucsd.com/api/v2/...'
  const body = {
    ...
  }
  const method = '...'

  const res = await fetch(endpoint, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + ...
    },
    body: JSON.stringify(body),
  });
  console.log(res.status, await res.json());
})();
```

For the endpoint, body, and method, you might find the [ACM membership portal API docs](https://documenter.getpostman.com/view/12949536/TVRedVwQ#062470b7-d176-42b6-878f-37cf56844da7) helpful.
