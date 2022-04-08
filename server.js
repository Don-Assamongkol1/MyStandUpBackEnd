require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', (err) => console.error(error));
db.once('open', () => console.log('connected to database'));

app.use(express.json()); // lets our server accept json as a body instead of a get elem, etc.

const subscribersRouter = require('./routes/subscribers');
app.use('/subscribers', subscribersRouter);

app.listen(4000, () => console.log('server started'));

// https://www.google.com/search?q=web+dev+simplified+mongo&rlz=1C5CHFA_enUS964US964&sxsrf=APq-WBt1q6nqSRW9MLlAudFIzgE2O8c51g%3A1649421175674&ei=dytQYs7cKNrQtQbj1rj4AQ&ved=0ahUKEwiO9IravIT3AhVaaM0KHWMrDh8Q4dUDCA4&uact=5&oq=web+dev+simplified+mongo&gs_lcp=Cgdnd3Mtd2l6EAMyBQgAEIAEMgUIABCABDIFCAAQgAQ6BwgAEEcQsAM6BAgjECc6BAgAEEM6BQgAEJECOgsIABCABBCxAxCDAToLCC4QgAQQsQMQgwE6BAguEEM6CwguEIAEEMcBEKMCOg0ILhCABBDHARDRAxAKOgoIABCxAxCDARBDOgsILhCABBCxAxDUAjoKCAAQsQMQyQMQQzoFCAAQkgM6CwgAEIAEELEDEMkDOgYIABAWEB46BQgAEIYDSgQIQRgASgQIRhgAUOUrWJdCYKhEaAFwAXgAgAGhAYgB9BGSAQQxNy43mAEAoAEByAEIwAEB&sclient=gws-wiz
// Find way to connect front-end to this backend.
