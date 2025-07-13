// This endpoint is now deprecated as we're using browser-based Web Speech API
// The TTS functionality has been moved to the client-side using speechSynthesis API
export async function GET(req) {
  return Response.json({ 
    message: "TTS functionality has been moved to client-side Web Speech API",
    deprecated: true 
  }, { status: 200 });
}
