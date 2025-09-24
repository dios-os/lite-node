const { createClient } = require("@supabase/supabase-js");
require('dotenv').config();

// Load environment variables
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

// Create a Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

module.exports = supabase;
/*
Module exported to:
 - synchFile.js
*/