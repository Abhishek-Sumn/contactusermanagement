// models/tenant.js
import mongoose from "mongoose"

// Define the Tenant schema
const tenantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  }
});

// Create and export the Tenant model
//const Tenant = mongoose.model('Tenant', tenantSchema);

const Tenant = mongoose.models.Tenant || mongoose.model('Tenant', tenantSchema);

export default Tenant;
