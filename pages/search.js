import { Component, useState, useEffect } from "react";
import { getSession } from "next-auth/client";
import axios from "axios";
import Layout from "components/layout";
import Protected from "components/protected";
import AccessDenied from "components/access-denied";
import { getUser } from "utils/front/storage";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: ""
    };
  }

  render() {
    const { app } = this.props;
    const { themeColor } = app;

    return (
      <Layout title="Search" app={app}>

      </Layout>
    );
  }
}

export default Search;
