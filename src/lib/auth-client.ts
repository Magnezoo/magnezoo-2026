import { createAuthClient } from "better-auth/client";
import { adminClient, genericOAuthClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [genericOAuthClient(), adminClient()],
});
