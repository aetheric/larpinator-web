import React from "react";

// @material-ui/core components
import { makeStyles, Theme } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = {
  progress: {
    width: "6rem !important",
    height: "6rem !important",
  },
  wrapperDiv: {
    margin: "100px auto",
    padding: "0px",
    maxWidth: "360px",
    textAlign: "center",
    position: "relative",
    zIndex: "9999",
    top: "0",
  },
  iconWrapper: {
    display: "block",
  },
  title: {
    color: "#FFFFFF",
  },
};

export default function PageChange(props: any) {
  const useStyles = makeStyles<Theme>(() => styles as any);
  const classes = useStyles();
  return (
    <div>
      <div className={classes.wrapperDiv}>
        <div className={classes.iconWrapper}>
          <CircularProgress className={classes.progress} />
        </div>
        <h4 className={classes.title}>
          Loading page contents for: {props.path}
        </h4>
      </div>
    </div>
  );
}
