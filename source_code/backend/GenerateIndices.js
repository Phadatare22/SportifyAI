const fs = require('fs');
const { Client } = require('@elastic/elasticsearch');

// Connect to the local Elasticsearch instance
const client = new Client({
  node: 'http://localhost:9200'
});

// Function to read the JSON file and parse it
function readJSONFile(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Failed to read or parse the JSON file:', error);
    process.exit(1);
  }
}

// Function to index a single blog post
async function indexBlogPost(blog) {
  try {
    const response = await client.index({
      index: 'blogs',
      id: blog.id,
      body: blog
    });
    console.log(`Indexed blog post with ID: ${blog.id}`, response);
  } catch (error) {
    console.error(`Failed to index blog post with ID: ${blog.id}`, error);
  }
}

// Main function to read blogs and index them
async function main() {
  const blogsData = readJSONFile('./data/db.json');
  if (blogsData && blogsData.blogs) {
    for (const blog of blogsData.blogs) {
      await indexBlogPost(blog);
    }
    console.log('All blog posts have been indexed.');
  } else {
    console.log('No blog data found in the JSON file.');
  }
}

// Run the main function
main();
