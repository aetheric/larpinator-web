import React, { FC, useEffect } from "react";

import { AuthContext } from "pages/_app";
import styles from "styles/components/Login.module.css";

export default function DashboardPage(props: any) {
  return (
    <AuthContext.Consumer>
      {(value) => {
        const { currentUser } = value;
        console.log(currentUser);
        return (
          <div
            className={styles.pageContainer}
            style={{
              backgroundImage: "url('/login-bg.jpeg')",
            }}
          ></div>
        );
      }}
    </AuthContext.Consumer>
  );
}
