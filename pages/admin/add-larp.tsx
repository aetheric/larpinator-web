import React, { FC, useEffect } from "react";

import { AuthContext } from "pages/_app";
import styles from "styles/components/Login.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDragon } from "@fortawesome/free-solid-svg-icons";

export default function DashboardPage(props: any) {
  return (
    <AuthContext.Consumer>
      {(value) => {
        const { currentUser } = value;
        console.log(currentUser);
        return <FontAwesomeIcon icon={faDragon} />;
      }}
    </AuthContext.Consumer>
  );
}
