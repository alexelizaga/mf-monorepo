import React, { Suspense } from "react";

import { useAppStore } from './shared/store';

const RemoteWidget = React.lazy(() => import("remote1/Widget"));

export default function App() {
  console.log(useAppStore.getState());

  return (
    <div style={{ padding: 16 }}>
      <h1>Host</h1>
      <Suspense fallback={<div>Cargando remoto...</div>}>
        <RemoteWidget />
      </Suspense>
    </div>
  );
}
