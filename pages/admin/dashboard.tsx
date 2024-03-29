import React, { FC, useEffect } from "react";

import { AuthContext } from "pages/_app";
import dynamic from "next/dynamic";
const DynamicCalendar = dynamic(
  () => import("components/Plots/plots.calendar"),
  {
    ssr: false,
  }
);
export default function DashboardPage(props: any) {
  return (
    <AuthContext.Consumer>
      {(value) => {
        const { currentUser } = value;

        return <DynamicCalendar />;
      }}
    </AuthContext.Consumer>
  );
}
