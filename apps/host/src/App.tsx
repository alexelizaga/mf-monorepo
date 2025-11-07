import React, { Suspense } from "react";

const RemoteWidget = React.lazy(() => import("remote1/Widget"));

export default function App() {
  return (
    <div style={{ padding: 16 }}>
      <h1>Host</h1>
      <Suspense fallback={<div>Cargando remoto...</div>}>
        <RemoteWidget />
      </Suspense>
    </div>
  );
}
