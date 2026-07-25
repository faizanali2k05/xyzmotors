const fs = require('fs');
let content = fs.readFileSync('src/app/App.tsx', 'utf8');

// Remove Blog nav link
content = content.replace('{ label: "Blog", page: "blog" },', '');
content = content.replace('{page === "blog" && <BlogPage setPage={navigate} />}', '');

// Remove BLOG_POSTS
content = content.replace(/const BLOG_POSTS = \[[\s\S]*?\];\n/, '');

// Remove BlogPage component completely
content = content.replace(/\/\/ ─── BLOG PAGE ────────────────────────────────────────────────────────────────[\s\S]*?function ContactPage/g, 'function ContactPage');

// Remove any other hyphen in text inside the file just to be absolutely sure.
// Be careful with css classes like `border-b` or `text-blue-500`.
// Let's manually replace the remaining user-facing hyphens just in case:
content = content.replace(/post-purchase/g, 'post purchase');
content = content.replace(/well-maintained/g, 'well maintained');
content = content.replace(/pre-owned/g, 'pre owned');

fs.writeFileSync('src/app/App.tsx', content);
console.log("Done updates 4");
