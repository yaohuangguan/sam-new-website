import React, { useEffect, useState } from "react";
import { RouterProps } from "react-router";
import dayjs, { Dayjs } from "dayjs";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { createMark } from "../../apis";

// uikit
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Paper, Input, Button } from "@material-ui/core";

// styles
const useStyles = makeStyles((theme) => ({
  layout: {
    height: "100%",
    padding: 0,
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
  },
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  listRoot: {
    position: "relative",
    top: 56,
    paddingTop: 0,
    height: "calc(100% - 56px)",
    overflow: "auto",
  },
  listSubHeaderRoot: {
    // backgroundColor: "#f9f7f3",
  },
}));

const schema = Yup.object().shape({
  description: Yup.string().required("该项为必填项"),
});

export function CreateMark(props: any & RouterProps) {
  // states
  const [date, setDate] = useState<Dayjs>(dayjs().startOf("date"));

  const classes = useStyles();

  // effects
  useEffect(() => {
    setDate(dayjs(props.match.params.date));
  }, []);

  // functions
  function handleCancel() {
    props.history.go(-1);
  }
  function handleCreate() {}
  function handleSubmit(values: any, actions: any) {
    createMark({
      date: date.toString(),
      ...values,
    })
      .then(() => {
        actions.setSubmitting(true);
        props.history.go(-1);
      })
      .finally(() => {
        actions.setSubmitting(false);
      });
  }

  // functions
  function handleGoBack() {
    props.history.go(-1);
  }
  return (
    <Container
      classes={{
        root: classes.layout,
      }}
    >
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleGoBack}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            添加标记 Mark
          </Typography>
        </Toolbar>
      </AppBar>
      <Paper
        elevation={0}
        square={true}
        classes={{
          root: classes.listRoot,
        }}
      >
        <Formik
          {...{
            initialValues: {
              description: "hi~",
            },
            validationSchema: schema,
            onSubmit: handleSubmit,
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset,
            isSubmitting,
          }) => (
            <Form onReset={handleReset} onSubmit={handleSubmit}>
              <div>
                <div>
                  <Input
                    type="text"
                    name="description"
                    value={values.description}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </div>
                <div>{touched.description && errors.description}</div>
              </div>
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCreate}
                >
                  确定
                </Button>
                <Button
                  variant="contained"
                  onClick={handleCancel}
                >
                  取消
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
}
