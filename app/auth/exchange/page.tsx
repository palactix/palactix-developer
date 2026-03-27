import { apiClient } from "@/lib/api-client";

type ExchangeResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  redirect_url: string;
};

export default async function ExchangeTokenPage({ searchParams }: { searchParams: { exchange_token?: string } }) {
  const resolvedSearchParams = await searchParams;
  const exchangeToken = resolvedSearchParams.exchange_token;

  if (!exchangeToken) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="text-lg font-semibold">Missing exchange token. Please try again.</span>
      </div>
    );
  }

  let payload: ExchangeResponse;
  try {
    payload = await apiClient<ExchangeResponse>("/api/auth/exchange", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ exchange_token: exchangeToken }),
      cache: "no-store",
    });
  } catch {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="text-lg font-semibold">Token exchange failed. Please try again.</span>
      </div>
    );
  }

  const { access_token, redirect_url, expires_in } = payload;
  // Server components cannot set cookies directly. Use a dedicated API route for exchange.
  // Show placeholder and redirect to API route that sets cookie and redirects.
  return (
    <div className="flex min-h-screen items-center justify-center">
      <span className="text-lg font-semibold">Preparing your workspace...</span>
      <meta httpEquiv="refresh" content={`0;url=/api/auth/exchange-token-redirect?access_token=${encodeURIComponent(access_token)}&expires_in=${encodeURIComponent(expires_in)}&redirect_url=${encodeURIComponent(redirect_url)}`} />
    </div>
  );
}
