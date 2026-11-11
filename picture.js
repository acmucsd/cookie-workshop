(async () => {
  // Set ONE of these: an image URL, or a base64 string (raw or a data: URL)
  const imageUrl = '';
  const imageBase64 = '';

  let blob;
  if (imageBase64) {
    const dataUrl = imageBase64.startsWith('data:')
      ? imageBase64
      : `data:image/png;base64,${imageBase64}`;
    blob = await (await fetch(dataUrl)).blob();
  } else if (imageUrl) {
    const imgRes = await fetch(imageUrl);
    if (!imgRes.ok) return console.error('Failed to fetch image', imgRes.status);
    blob = await imgRes.blob();
  } else {
    return console.error('Set imageUrl or imageBase64');
  }

  const ext = (blob.type.split('/')[1] || 'png').split('+')[0];
  const form = new FormData();
  form.append('image', blob, `picture.${ext}`);

  const token = document.cookie
    .split('; ')
    .find(c => c.startsWith('ACCESS_TOKEN='))
    ?.split('=').slice(1).join('=');
  if (!token) return console.error('ACCESS_TOKEN cookie not found');
  const res = await fetch('https://api.acmucsd.com/api/v2/user/picture', {
    method: 'POST',
    headers: {
      // No Content-Type here: the browser sets multipart/form-data with the boundary
      'Authorization': `Bearer ${decodeURIComponent(token)}`,
    },
    body: form,
  });
  console.log(res.status, await res.json());
})();
