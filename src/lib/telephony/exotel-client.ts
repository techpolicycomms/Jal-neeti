/**
 * Exotel REST API v2 client
 * Handles outbound call initiation and status queries
 */

function getConfig() {
  const apiKey = process.env.EXOTEL_API_KEY;
  const apiToken = process.env.EXOTEL_API_TOKEN;
  const subdomain = process.env.EXOTEL_SUBDOMAIN;
  const sid = process.env.EXOTEL_SID;
  const callerId = process.env.EXOTEL_CALLER_ID;
  if (!apiKey || !apiToken || !subdomain || !sid || !callerId) {
    throw new Error('Missing Exotel configuration. Set EXOTEL_API_KEY, EXOTEL_API_TOKEN, EXOTEL_SUBDOMAIN, EXOTEL_SID, EXOTEL_CALLER_ID.');
  }
  return { apiKey, apiToken, subdomain, sid, callerId };
}

function getBaseUrl() {
  const { subdomain, sid } = getConfig();
  return `https://${subdomain}.exotel.com/v2/accounts/${sid}`;
}

function getAuthHeader() {
  const { apiKey, apiToken } = getConfig();
  return 'Basic ' + Buffer.from(`${apiKey}:${apiToken}`).toString('base64');
}

/** Initiate an outbound call with optional audio streaming */
export async function initiateCall(params: {
  to: string;
  statusCallbackUrl: string;
  streamUrl?: string;
  customField?: string;
}): Promise<{ callSid: string; status: string }> {
  const { callerId } = getConfig();
  const baseUrl = getBaseUrl();

  const body: Record<string, string> = {
    From: callerId,
    To: params.to,
    CallerId: callerId,
    StatusCallback: params.statusCallbackUrl,
    StatusCallbackEvents: 'terminal,ringing,answered',
  };

  if (params.streamUrl) {
    body.StreamUrl = params.streamUrl;
  }
  if (params.customField) {
    body.CustomField = params.customField;
  }

  const res = await fetch(`${baseUrl}/Calls`, {
    method: 'POST',
    headers: {
      Authorization: getAuthHeader(),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(body).toString(),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Exotel initiateCall failed: ${JSON.stringify(data)}`);
  }

  return {
    callSid: data.Call?.Sid ?? data.Sid ?? '',
    status: data.Call?.Status ?? data.Status ?? 'initiated',
  };
}

/** Get status of an existing call */
export async function getCallStatus(callSid: string): Promise<{
  status: string;
  duration: number | null;
  recordingUrl: string | null;
}> {
  const baseUrl = getBaseUrl();

  const res = await fetch(`${baseUrl}/Calls/${callSid}`, {
    headers: { Authorization: getAuthHeader() },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Exotel getCallStatus failed: ${JSON.stringify(data)}`);
  }

  return {
    status: data.Call?.Status ?? 'unknown',
    duration: data.Call?.Duration ? parseInt(data.Call.Duration) : null,
    recordingUrl: data.Call?.RecordingUrl ?? null,
  };
}

/** End an active call */
export async function endCall(callSid: string): Promise<void> {
  const baseUrl = getBaseUrl();

  const res = await fetch(`${baseUrl}/Calls/${callSid}`, {
    method: 'POST',
    headers: {
      Authorization: getAuthHeader(),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ Status: 'completed' }).toString(),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(`Exotel endCall failed: ${JSON.stringify(data)}`);
  }
}
