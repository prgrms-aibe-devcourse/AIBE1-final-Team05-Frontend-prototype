// src/main.tsx

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Material-UI에서 사용하는 폰트 로드를 위한 CSS 임포트
// index.html에서 이미 Google Fonts를 로드하고 있지만,
// 필요한 경우 추가 CSS를 여기서 임포트할 수 있습니다.

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
