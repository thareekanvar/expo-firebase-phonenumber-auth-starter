import React from "react";
import { AuthUserProvider } from "./authUserProvider";
import Routes from "./routes";

/**
 * Wrap all providers here
 */

export default function Providers() {
  return (
    <AuthUserProvider>
      <Routes />
    </AuthUserProvider>
  );
}
