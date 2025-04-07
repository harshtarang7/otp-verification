import express from 'express';
const app = express();
app.get('/', (req, res) => {
    res.send('OTP Verification App');
});
const port = 3000;
app.listen(port, () => {
    console.log('Server running on', port);
});
