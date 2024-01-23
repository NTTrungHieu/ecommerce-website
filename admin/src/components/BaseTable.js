import { Button, Dropdown, Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import {
  EDIT_DATA,
  SEE_DETAIL,
  showDrawer,
} from "../features/drawer/drawerSlice";
import { Link } from "react-router-dom";
import {
  useGetDataQuery,
  useRemoveDataMutation,
} from "../features/api/general";
import { LuRefreshCcw } from "react-icons/lu";
import { toast } from "react-toastify";

const BaseTable = ({ title, columns, url, ...others }) => {
  const dispatch = useDispatch();
  const { data: dataSource, refetch, isFetching } = useGetDataQuery(url.data);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { refresh: isRefresh } = useSelector((state) => state.table);
  const [removeData] = useRemoveDataMutation();

  useEffect(() => {
    refetch();
  }, [isRefresh, refetch]);

  const handleRemove = (record) => {
    removeData({
      url: url.remove,
      id: record._id,
    })
      .unwrap()
      .then((payload) => {
        toast.success(<div>{title} removed successfully!</div>);
        refetch();
      })
      .catch((error) => {
        toast.error(
          <div>
            {title} removed failed! <br />
            {error.data.message}
          </div>
        );
        refetch();
      });
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  const indexColumn = {
    title: "No",
    dataIndex: "no",
    key: "no",
    width: "5%",
    align: "center",
    render: (item, record, index) => <>{index + 1}</>,
  };

  const operationColumn = {
    title: "",
    dataIndex: "operation",
    fixed: "right",
    width: "50px",
    render: (item, record, index) => {
      let items = [];
      items.push({
        label: (
          <Link
            onClick={() =>
              dispatch(showDrawer({ action: SEE_DETAIL, data: record }))
            }
          >
            See Detail
          </Link>
        ),
        key: "0",
      });
      if (url?.edit) {
        items.push({
          label: (
            <Link
              onClick={() =>
                dispatch(showDrawer({ action: EDIT_DATA, data: record }))
              }
            >
              Edit
            </Link>
          ),
          key: "1",
        });
      }
      if (url?.remove) {
        items.push({
          type: "divider",
        });
        items.push({
          label: (
            <Link className="text-danger" onClick={() => handleRemove(record)}>
              Remove
            </Link>
          ),
          key: "3",
        });
      }
      return (
        <Dropdown
          menu={{
            items: items,
          }}
          trigger={["click"]}
        >
          <Link>
            <HiDotsVertical />
          </Link>
        </Dropdown>
      );
    },
  };

  const config = {
    rowSelection: { rowSelection },
    columns: [indexColumn, ...columns, operationColumn],
    dataSource,
    rowKey: "_id",
    pagination: {
      showSizeChanger: true,
      pageSizeOptions: ["5", "10", "20", "50"],
      pageSize: "5",
      total: dataSource?.length || 0,
      showTotal: (total) => `Total ${total} items`,
    },
    scroll: { x: true },
    loading: isFetching,
    footer: () => {
      return (
        <div className="position-relative">
          <Tooltip title="Refresh table" className="position-absolute">
            <Button
              shape="circle"
              type="default"
              onClick={() => refetch()}
              className="d-flex align-items-center justify-content-center"
              icon={<LuRefreshCcw />}
              style={{ top: "16px", "--ant-color-primary-hover": "#131921" }}
            />
          </Tooltip>
        </div>
      );
    },
    ...others,
  };

  return <Table {...config} />;
};

export default BaseTable;
