import React, { Suspense, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Header } from "./components";
import { Home, Contact, About } from "./pages";

const loadMicroFrontend = async (scope, moduleName, url) => {
  const remoteEntryUrl = `${url}/remoteEntry.js`;
  await __webpack_init_sharing__("default");

  await new Promise((resolve, reject) => {
    if (!document.querySelector(`script[src="${remoteEntryUrl}"]`)) {
      const element = document.createElement("script");
      element.src = remoteEntryUrl;
      element.type = "text/javascript";
      element.async = true;

      element.onload = () => resolve();
      element.onerror = (err) => reject(err);

      document.head.appendChild(element);
    } else {
      resolve();
    }
  });

  const container = window[scope];
  await container.init(__webpack_share_scopes__.default);
  const factory = await container.get(moduleName);
  return factory();
};

const MicroFrontendLoader = ({ scope, moduleName, url }) => {
  const [Component, setComponent] = useState(null);

  React.useEffect(() => {
    let isMounted = true;

    (async () => {
      const LoadedComponent = await loadMicroFrontend(scope, moduleName, url);
      if (isMounted) {
        setComponent(() => LoadedComponent);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [scope, moduleName, url]);

  if (!Component) {
    return <div>Loading MicroFrontend...</div>;
  }

  const LazyComponent = React.lazy(() => Promise.resolve(Component));

  return (
    <Suspense fallback={<div>Loading MicroFrontend...</div>}>
      <LazyComponent />
    </Suspense>
  );
};

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />

        <div className="App-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/employee"
              element={
                <MicroFrontendLoader
                  key="employee"
                  scope="employee"
                  moduleName="./EmployeeApp"
                  url={process.env.REACT_APP_EMPLOYEE_URL}
                />
              }
            />
            <Route
              path="/employer"
              element={
                <MicroFrontendLoader
                  key="employer"
                  scope="employer"
                  moduleName="./EmployerApp"
                  url={process.env.REACT_APP_EMPLOYER_URL}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
