import React from "react";
import { Provider } from "next-auth/client";
import axios from "axios";
import "tailwindcss/tailwind.css";

import "./styles.css";

// Use the <Provider> to improve performance and allow components that call
// `useSession()` anywhere in your application to access the `session` object.
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      logo: "",
      color: "",
      customCSS: "",
      url: "",
    }
  }

  componentDidMount() {
    axios.get("/api/config/settings")
      .then(({ data }) => this.setState({ ...data }))
      .catch(console.error);
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Provider
        // Provider options are not required but can be useful in situations where
        // you have a short session maxAge time. Shown here with default values.
        options={{
          // Client Max Age controls how often the useSession in the client should
          // contact the server to sync the session state. Value in seconds.
          // e.g.
          // * 0  - Disabled (always use cache value)
          // * 60 - Sync session state with server if it's older than 60 seconds
          clientMaxAge: 0,
          // Keep Alive tells windows / tabs that are signed in to keep sending
          // a keep alive request (which extends the current session expiry) to
          // prevent sessions in open windows from expiring. Value in seconds.
          //
          // Note: If a session has expired when keep alive is triggered, all open
          // windows / tabs will be updated to reflect the user is signed out.
          keepAlive: 0
        }}
        session={pageProps.session}
      >
        <Component {...pageProps} app={this.state} />
      </Provider>
    )
  }
}

export default App;
