import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import {makeStyles, Theme} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {GridProps} from "@material-ui/core/Grid/Grid";

const styles = {
  grid: {
    margin: "0 -15px !important",
    width: "unset",
  },
};

export default function GridContainer(props: GridProps) {
  const useStyles = makeStyles<Theme>(() => styles as any);
  const classes = useStyles();
  const { children, ...rest } = props;
  return (
    <Grid container {...rest} className={classes.grid}>
      {children}
    </Grid>
  );
}

GridContainer.propTypes = {
  children: PropTypes.node,
};
