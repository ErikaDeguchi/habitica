import mongoose from 'mongoose';
import validator from 'validator';
import baseModel from '../libs/baseModel';

const { Schema } = mongoose;

export const currencies = ['gems', 'hourglasses'];
export const transactionTypes = ['buy_money', 'buy_gold', 'contribution', 'spend', 'gift_send', 'gift_receive', 'debug', 'create_challenge', 'create_guild', 'change_class', 'rebirth', 'release_pets', 'release_mounts', 'reroll', 'contribution', 'subscription_perks'];

export const schema = new Schema({
  currency: { $type: String, enum: currencies, required: true },
  transactionType: { $type: String, enum: transactionTypes, required: true },
  reference: { $type: String },
  referenceText: { $type: String },
  amount: { $type: Number, required: true },
  userId: {
    $type: String, ref: 'User', required: true, validate: [v => validator.isUUID(v), 'Invalid uuid for Transaction.'],
  },
}, {
  strict: true,
  minimize: false, // So empty objects are returned
  typeKey: '$type', // So that we can use fields named `type`
});

schema.plugin(baseModel, {
  noSet: ['id', '_id', 'userId', 'currency', 'transactionType', 'reference', 'referenceText', 'amount'], // Nothing can be set from the client
  timestamps: true,
  _id: false, // using custom _id
});

export const model = mongoose.model('Transaction', schema);
