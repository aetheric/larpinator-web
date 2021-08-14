import React from "react";
import moment from "moment";
import { AuthContext } from "pages/_app";
import {
  Row,
  Col,
  Layout,
  Form,
  Input,
  Divider,
  message,
  DatePicker,
  Button,
} from "antd";
import Title from "antd/lib/typography/Title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDragon } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCreateLarpMutation } from "../../src/generated/graphql";
import { gql } from "@apollo/client";
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const A = gql`
  mutation createLarp($input: CreateLarpInput!) {
    createLarp(input: $input) {
      title
      description
      startAt
      endAt
      isPublished
      createdAt
    }
  }
`;

export default function DashboardPage(props: any) {
  const [createLarpMutation, { data, loading, error }] =
    useCreateLarpMutation();

  const validationSchema = Yup.object({
    title: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    // startAt: Yup.mixed().required("Required"),
    // endAt: Yup.mixed().required("Required"),
  });
  const { errors, values, handleSubmit, handleChange, setFieldValue } =
    useFormik({
      initialValues: {
        title: "",
        description: "",
        startAt: moment(),
        endAt: moment(),
      },
      validationSchema,
      validateOnChange: true,
      onSubmit: (values) => {
        createLarpMutation({
          variables: {
            input: {
              title: String(values.title).trim(),
              description: values.description,
              startAt: values.startAt.startOf("day").format(),
              endAt: values.endAt.startOf("day").format(),
              isPublished: false,
            },
          },
        }).then((r) => {
          if (r.data?.createLarp) {
            message.success("Larp is successfully added!");
          }
        });
      },
    });

  return (
    <AuthContext.Consumer>
      {(value) => {
        const { currentUser } = value;
        console.log(currentUser);
        return (
          <Layout>
            <Row>
              <Col span={24}>
                <Title level={3}>
                  <FontAwesomeIcon icon={faDragon} />
                  <span className="ml-4">Add New Larp</span>
                </Title>
              </Col>
              <Divider />
              <Col span={24}>
                <Form.Item
                  validateStatus={errors.title ? "error" : "success"}
                  help={errors.title}
                >
                  <Input
                    size="large"
                    name="title"
                    placeholder="title"
                    value={values.title}
                    onChange={handleChange}
                  />
                </Form.Item>
                <Form.Item
                  validateStatus={
                    errors.startAt || errors.endAt ? "error" : "success"
                  }
                  help={errors.startAt || errors.endAt}
                >
                  <RangePicker
                    size="large"
                    value={[values.startAt, values.endAt]}
                    onChange={(date, dateString) => {
                      setFieldValue("startAt", moment(dateString[0]));
                      setFieldValue("endAt", moment(dateString[1]));
                      console.log(values);
                    }}
                  />
                </Form.Item>
                <Form.Item
                  validateStatus={errors.description ? "error" : "success"}
                  help={errors.description}
                >
                  <TextArea
                    rows={7}
                    name="description"
                    placeholder="description"
                    value={values.description}
                    onChange={handleChange}
                  />
                </Form.Item>
                <Button
                  style={{ float: "right" }}
                  color="primary"
                  onClick={(e) => handleSubmit()}
                  type="primary"
                >
                  Add new Larp
                </Button>
              </Col>
            </Row>
          </Layout>
        );
      }}
    </AuthContext.Consumer>
  );
}
