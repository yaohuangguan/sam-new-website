import React, { useState, useEffect } from "react";
// import { RouterProps } from 'react-router'
import { connect } from "react-redux";

// uikit
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({

}));

export function Main(props: any) {
  return <Container>a</Container>;
}

export default connect((state: any) => ({
  settings: state.settings,
}))(Main);
