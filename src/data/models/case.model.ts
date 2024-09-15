import mongoose, { Document, Schema } from 'mongoose';

export interface ICase extends Document {
  lat: number;
  lng: number;
  genre: string;
  age: number;
  isSent: boolean;
}

const CaseSchema: Schema = new Schema({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  genre: { type: String, required: true },
  age: { type: Number, required: true },
  isSent: { type: Boolean, default: false },
  creationDate: { type: Date, default: Date.now }
});

export const Case = mongoose.model<ICase>('Case', CaseSchema);
