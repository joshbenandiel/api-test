import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let FileSchema = new Schema(
	{
    name: String,
    path: String,
  },
	{ collection: 'file' },
);

// Export the model
export default mongoose.model('file', FileSchema);
