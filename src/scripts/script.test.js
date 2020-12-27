export default function testTest(test = 'testing test') {
  const url = 'https://jsonplaceholder.typicode.com/users';
  return fetch(url).then((response) => response.text());

  console.log(test);
}
