import React, { Suspense, lazy } from "react";
import { useAuth } from "modules/auth/hooks";
import { ModalMarker, AlertMarker } from "modules/common/modal";
import ToastMarker from "modules/common/toast";
import ErrorBoundary from "modules/common/components/ErrorBoundary";
import ScreenLoader from "modules/common/components/ScreenLoader";

const Public = lazy(() => import("./Public"));
const Private = lazy(() => import("./Private"));

function App() {
  const [isAppReady, isAuthenticated] = useAuth();

  if (!isAppReady) return null;
  return (
    <ErrorBoundary>
      <ToastMarker />
      <AlertMarker />
      <ModalMarker />
      <Suspense fallback={<ScreenLoader />}>
        {isAuthenticated ? <Private /> : <Public />}
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
