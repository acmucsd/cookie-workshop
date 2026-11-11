(async () => {
  const body = {
    user: {
      "firstName": "Matt",
      "lastName": "Sucks"
    }
  }

  const token = document.cookie
    .split('; ')
    .find(c => c.startsWith('ACCESS_TOKEN='))
    ?.split('=').slice(1).join('=');
  if (!token) return console.error('ACCESS_TOKEN cookie not found');
  const res = await fetch('https://api.acmucsd.com/api/v2/user', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${decodeURIComponent(token)}`,
    },
        body: JSON.stringify(body),
  });
  console.log(res.status, await res.json());
})();
