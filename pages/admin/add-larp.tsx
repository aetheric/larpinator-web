import React, { FC, useEffect } from "react";

import { AuthContext } from "pages/_app";
import { Row, Col, Layout, Form, Input, Divider, Space, Button } from "antd";
import Title from "antd/lib/typography/Title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDragon } from "@fortawesome/free-solid-svg-icons";
import { MailFilled } from "@ant-design/icons";

export default function DashboardPage(props: any) {
  return (
    <AuthContext.Consumer>
      {(value) => {
        const { currentUser } = value;
        console.log(currentUser);
        return (
          <Layout>
            <Row>
              <Col span={24}>
                <Title>
                  <FontAwesomeIcon icon={faDragon} />
                  <span className="ml-4">Add New Larp</span>
                </Title>
              </Col>
              <Divider />
              <Col span={24}></Col>
            </Row>
          </Layout>
        );
      }}
    </AuthContext.Consumer>
  );
}
