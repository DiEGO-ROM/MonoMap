import mongoose from "mongoose";

const caseSchema = new mongoose.Schema({
  lat: {
    type: Number,
    required: true
  },
  lng: {
    type: Number,
    required: true
  },
  isSent: {
    type: Boolean,
    required: false,
    default: false
  },
  genre: {
    type: String,
    required: true,
    enum: ['male', 'female', 'other']
  },
  age: {
    type: Number,
    required: true
  },
  creationDate: {
    type: Date,
    default: Date.now
  }
});

export const CaseModel = mongoose.model("Case", caseSchema);
