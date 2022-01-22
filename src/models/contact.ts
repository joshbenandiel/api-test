import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let ContactSchema = new Schema(
	{
    first_name: String,
    last_name: String,
    middle_name: String,
    address: String,
    title: String,
    contact_number: String,
    email: String,
    avatar: String
  },
	{ collection: 'contacts' },
);

// Export the model
export default mongoose.model('contacts', ContactSchema);
