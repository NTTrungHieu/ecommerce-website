import { Button, Col, Drawer, Flex, Form, Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_DATA,
  EDIT_DATA,
  SEE_DETAIL,
  closeDrawer,
  showDrawer,
} from "../features/drawer/drawerSlice";
import CustomInput from "./CustomInput";
import { toast } from "react-toastify";
import {
  useAddDataMutation,
  useEditDataMutation,
} from "../features/api/general";
import { refresh } from "../features/table/tableSlice";
import dayjs from "dayjs";

const CustomDrawer = ({
  children,
  title,
  actionUrl,
  icon,
  columns,
  ...configs
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { show, action, dataForm } = useSelector((state) => state.drawer);
  const [editData] = useEditDataMutation();
  const [addData] = useAddDataMutation();

  const handleSubmit = () => {
    form.submit();
  };

  const onFinish = (values) => {
    switch (action) {
      case ADD_DATA:
        addData({
          url: actionUrl.add,
          body: values,
        })
          .unwrap()
          .then((payload) => {
            toast.success(<div>{title} added successfully!</div>);
            dispatch(refresh());
          })
          .catch((error) => {
            toast.error(
              <div>
                {title} added failed! <br />
                {error.data.message}
              </div>
            );
            dispatch(refresh());
          });
        break;
      case EDIT_DATA:
        editData({
          url: actionUrl.edit,
          body: values,
          id: dataForm._id,
        })
          .unwrap()
          .then((payload) => {
            toast.success(<div>{title} updated successfully!</div>);
            dispatch(refresh());
          })
          .catch((error) => {
            toast.error(
              <div>
                {title} updated failed! <br />
                {error.data.message}
              </div>
            );
            dispatch(refresh());
          });
        break;
      default:
    }
  };

  useEffect(() => {
    if (dataForm) {
      columns.forEach((e) => {
        let data = dataForm[e.dataIndex] || e?.defaultValue;
        if (e.type === "date" || e.type === "datetime") {
          if (data) data = dayjs(new Date(data));
        }
        form.setFieldValue(e.dataIndex, data);
      });
    }
  }, [dataForm, columns, form]);

  const handleShowDrawer = () => {
    dispatch(showDrawer({ action: ADD_DATA }));
  };

  const onClose = () => {
    dispatch(closeDrawer());
  };

  return (
    <>
      {actionUrl?.add && (
        <Button type="primary" onClick={handleShowDrawer} icon={icon}>
          {ADD_DATA + " " + title}
        </Button>
      )}
      <Drawer
        title={action + " " + title}
        width={720}
        onClose={onClose}
        open={show}
        footer={
          <Flex justify="end" align="center" gap="10px" className="mb-3">
            <Button
              className={` ${action === SEE_DETAIL ? "d-none" : ""}`}
              type="primary"
              htmlType="submit"
              onClick={() => handleSubmit()}
            >
              Submit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </Flex>
        }
        {...configs}
      >
        {children || (
          <Form
            form={form}
            layout="horizontal"
            onFinish={onFinish}
            disabled={action === SEE_DETAIL}
            hideRequiredMark={action === SEE_DETAIL}
          >
            {columns.map((e, i) => {
              const rule = [
                {
                  required: action === SEE_DETAIL || e?.required,
                  message: "Please enter " + e.title,
                },
              ];
              if (e?.moreRules) rule.push(...e.moreRules);

              return (
                <Row key={i}>
                  <Col span={24}>
                    <Form.Item
                      name={e.dataIndex}
                      label={e.title + " :"}
                      colon={false}
                      rules={rule}
                      labelAlign="left"
                      labelCol={{ span: 6 }}
                      validateDebounce={300}
                      validateFirst="parallel"
                      hidden={e?.hideInForm && action !== SEE_DETAIL}
                    >
                      <CustomInput
                        data={e}
                        actionUrl={actionUrl}
                        placeholder={e.title}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              );
            })}
          </Form>
        )}
      </Drawer>
    </>
  );
};

export default CustomDrawer;
