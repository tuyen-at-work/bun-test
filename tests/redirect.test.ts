import { test, expect } from 'bun:test';

interface Redirect {
  old: string;
  new: string;
  permanent: boolean;
}

const cases: Redirect[] = [
  {
    old: 'https://kfwt02aap8ru8pinte.dxcloud.episerver.net/en/283661-query-parmaters',
    new: 'https://kfwt02aap8ru8pinte.dxcloud.episerver.net:443/en/dung-block-test',
    permanent: true,
  },
  {
    old: 'https://kfwt02aap8ru8pinte.dxcloud.episerver.net/globalassets/hanh-qa-redirect/',
    new: '/globalassets/ha-noi---qa/hanh/',
    permanent: false,
  },
];

test.each(cases)('redirect to new url', async (item) => {
  console.log(`Redirecting from ${item.old} to ${item.new}`);
  let res = await fetch(item.old, { redirect: 'manual' });
  console.log(res.status);

  // Status code
  expect(res.status).toBe(item.permanent ? 301 : 302);

  // Location header
  expect(res.headers.get('Location')).toEqual(item.new);
});
