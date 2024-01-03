import mongoose, {SchemaTypes} from 'mongoose';
import 'dotenv/config';

const MONGO_URI = process.env.MONGO_URI;


mongoose.connect(MONGO_URI, {
  dbName: 'plansdb'
})
  .then(()=> console.log('Connected to Mongo DB.'))
  .catch(err => console.log(`Mongo err: ${err}`));


const Schema = mongoose.Schema;

const columnSchema = new Schema ({
  column: {type: String, required: true},
  values: [String],
  type: {type: String, required: true},
  fixed: {type: Boolean, required: true},
});


const planSchema = new Schema ({
  dayView: {type: String, required: true},
  planName: {type: String, required: true},
  planDescription: String,
  rowsLen: {type: Number, required: true},
  colsLen: {type: Number, required: true},
  earliestDate: {type: String, required: true},
  latestDate: {type: String, required: true},
  defaultEmpty: SchemaTypes.Mixed,
  defaultColKey: {type: String, required: true},
  defaultColValues: {type: String, required: true},
  _table: {
    type: Map,
    of: columnSchema
  }

});



export const PlanModel = mongoose.model('plan', planSchema);

