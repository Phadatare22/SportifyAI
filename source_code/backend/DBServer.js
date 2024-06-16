const { Client } = require('@elastic/elasticsearch');
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router('data/db.json');
const middlewares = jsonServer.defaults();
const esClient = new Client({ node: 'http://localhost:9200' });

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Use a custom route to handle POST and ensure Elasticsearch is updated after json-server
server.post('/blogs', (req, res, next) => {
    // Temporary hold the original send
    const originalSend = res.send;
    res.send = function (body) {
        // Continue using the original send
        originalSend.apply(this, arguments);

        // Now body contains the response including the ID generated by json-server
        // Parse the body to get the ID and other data
        const newBlog = JSON.parse(body);

        // Index the new blog in Elasticsearch
        esClient.index({
            index: 'blogs',
            id: newBlog.id, // Use the json-server generated ID
            body: newBlog
        }).then(() => {
            console.log(`Blog indexed in Elasticsearch with ID: ${newBlog.id}`);
        }).catch(err => {
            console.error('Elasticsearch indexing error:', err);
        });
    };

    // Proceed with json-server's default handler
    next();
});

// Intercept PUT requests to update a blog
server.put('/blogs/:blog_id', (req, res, next) => {
    let originalSend = res.send;
    res.send = function (data) {
        originalSend.apply(res, arguments);  // Continue sending the original response
    
        try {
            const updatedData = JSON.parse(data);
            console.log("Attempting to update Elasticsearch with ID:", updatedData.id);
            console.log("Updated data:", updatedData);
    
            if (updatedData) {
                esClient.update({
                    index: 'blogs',
                    id: updatedData.id,
                    body: {
                        doc: updatedData
                    }
                }).then((esResponse) => {
                    console.log(`Elasticsearch update successful for ID ${req.params.blog_id}:`, esResponse);
                }).catch((err) => {
                    console.error('Elasticsearch update error:', err);
                });
            }
        } catch (err) {
            console.error('Error parsing data or during Elasticsearch update:', err);
        }
    };
    

    // Continue with json-server's default PUT handler
    next();
});



server.delete('/blogs/:blog_id', (req, res, next) => {
    esClient.delete({
        index: 'blogs',
        id: req.params.blog_id
    }).then(() => {
        console.log(`Blog ${req.params.blog_id} deleted in Elasticsearch`)
        next();
    }).catch(err => {
        console.error('Elasticsearch delete error:', err);
    })
});



// Use the default router
server.use(router);
server.listen(8000, () => {
    console.log('Server is running on http://localhost:8000');
});
