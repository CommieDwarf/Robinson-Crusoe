import mongoose from 'mongoose';

export enum EMAIL_TYPE {
  ACTIVATION = "activation",
  PASSWORD_RESET = "password reset",
  NOTIFICATION = "notification",
}


const emailLogSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  emailType: { 
    type: String, 
    enum: EMAIL_TYPE, 
    required: true 
  },
  sentAt: { 
    type: Date, 
    default: Date.now 
  }
});

const EmailLog = mongoose.model('EmailLog', emailLogSchema);

export {EmailLog}