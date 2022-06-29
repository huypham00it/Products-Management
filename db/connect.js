import mongoose from 'mongoose';

const mongoConnect = (url) => mongoose.connect(url);

export default mongoConnect;