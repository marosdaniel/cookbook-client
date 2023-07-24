const slugify = (str: string) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

export default slugify;

// const title = 'Generating slugs with one line of code using JavaScript';

// console.log(slugify(title));
// output: generating-slugs-with-one-line-of-code-using-javascript
