import express from 'express';
import route from './src/routes/routes.js';

const app = express();

// routes 
app.use('/', route);
// listen server on port 3000
app.listen(3000, () => { 
	console.log('listening on port 3000'); 
});

export default app;