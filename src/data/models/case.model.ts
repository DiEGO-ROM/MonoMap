import { Schema, model } from 'mongoose';

const caseModel = new Schema({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  genre: { type: String, required: true },
  age: { type: Number, required: true },
  isSent: { type: Boolean, default: false },
  creationDate: { type: Date, default: Date.now }
});

export const Case = model('Case', caseModel);
