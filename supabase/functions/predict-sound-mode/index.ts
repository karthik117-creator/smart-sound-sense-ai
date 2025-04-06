
// Follow the Supabase Edge Function format
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

interface PredictionRequest {
  user_id: string;
  current_time: string; // ISO string
  day_of_week: number; // 0-6
  location?: {
    latitude: number;
    longitude: number;
  };
  recent_activity?: string[];
}

// This would be replaced with a real ML model in production
function predictSoundMode(data: PredictionRequest): string {
  // Simple logic for demonstration:
  
  // Parse time
  const date = new Date(data.current_time);
  const hours = date.getHours();
  
  // Night time (10 PM - 7 AM) - Silent
  if (hours >= 22 || hours < 7) {
    return "silent";
  }
  
  // Work hours (9 AM - 5 PM on weekdays) - Vibrate
  if ((hours >= 9 && hours < 17) && (data.day_of_week >= 1 && data.day_of_week <= 5)) {
    return "vibrate";
  }
  
  // Default - Normal
  return "normal";
}

serve(async (req) => {
  // CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Content-Type": "application/json",
  };
  
  // Handle OPTIONS request for CORS
  if (req.method === "OPTIONS") {
    return new Response(null, { headers });
  }
  
  try {
    // Parse request body
    const requestData = await req.json() as PredictionRequest;
    
    if (!requestData.user_id) {
      return new Response(
        JSON.stringify({ error: "Missing user_id parameter" }),
        { headers, status: 400 }
      );
    }
    
    // In a real implementation, we would:
    // 1. Get user's historical data from database
    // 2. Run it through a trained ML model
    // 3. Return prediction
    
    // For this example, we'll use a simplified rule-based approach
    const predictedMode = predictSoundMode(requestData);
    
    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );
    
    // Log the prediction (this would be used to train the model in the future)
    await supabaseClient
      .from("ml_predictions")
      .insert({
        user_id: requestData.user_id,
        timestamp: requestData.current_time,
        predicted_mode: predictedMode,
        input_data: requestData
      });
    
    return new Response(
      JSON.stringify({ 
        predicted_mode: predictedMode,
        confidence: 0.85,  // Mock confidence value
        timestamp: new Date().toISOString()
      }),
      { headers }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers, status: 500 }
    );
  }
})
