import React, { useEffect, useState, useRef } from "react";
import DefaultLayout from "./../components/DefaultLayout";
import { useDispatch } from "react-redux";
import { useReactToPrint } from "react-to-print";
import axios from "axios";
import { EyeOutlined } from "@ant-design/icons";
import { Button, Modal, Table } from "antd";
import "../styles/Invoice.css";
const BillsPage = () => {
  const componentRef = useRef();
  const [billsData, setBillsData] = useState([]);
  const dispatch = useDispatch();
  const [popupModal, setPopupModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const getAllBills = async () => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      const { data } = await axios.get(
        "http://127.0.0.1:8081/api/bills/get-bills"
      );
      setBillsData(data);
      dispatch({ type: "HIDE_LOADING" });
      console.log(data);
    } catch (error) {
      dispatch({ type: "HIDE_LOADING" });
      console.log(error);
    }
  };
  useEffect(() => {
    getAllBills();
  }, []);
  //print function
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  //handle delete
  //able data
  const columns = [
    { title: "ID", dataIndex: "_id" },
    {
      title: "Tên Khách Hàng",
      dataIndex: "customerName",
    },
    { title: "Liên Hệ", dataIndex: "customerNumber" },
    { title: "Tổng tiền hàng", dataIndex: "subTotal" },
    { title: "Thuế", dataIndex: "tax" },
    { title: "Tổng Cộng", dataIndex: "totalAmount" },

    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <EyeOutlined
            style={{ cursor: "pointer" }}
            onClick={() => {
              setSelectedBill(record);
              setPopupModal(true);
            }}
          />
        </div>
      ),
    },
  ];
  //handle from submit

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h1>Danh Sách Hoá Đơn</h1>
      </div>
      <Table columns={columns} dataSource={billsData} bordered />
      {popupModal && (
        <Modal
          title="Invoice Details"
          visible={popupModal}
          onCancel={() => {
            setPopupModal(false);
          }}
          footer={false}
        >
          <div id="invoice-Pet" ref={componentRef}>
            <center id="top">
              <div className="logo"></div>
              <div className="info">
                <h2> Pet Shop</h2>
                <p>Liên Hệ :999999999 | TPHCM</p>
              </div>
            </center>
            <div id="mid">
              <div className="mt-2">
                <p>
                  Tên Khách Hàng: <b>{selectedBill.customerName}</b>
                  <br />
                  SĐT: <b>{selectedBill.customerNumber}</b>
                  <br />
                  Ngày: <b>{selectedBill.date.toString().substring(0, 10)}</b>
                  <br />
                </p>
                <hr style={{ margin: "5px" }} />
              </div>
            </div>
            <div id="bot">
              <div id="table">
                <table>
                  <tbody>
                    <tr className="tabletitle">
                      <td className="item">
                        <h2>Sản Phẩm</h2>
                      </td>
                      <td className="Hours">
                        <h2>Số Lượng</h2>
                      </td>
                      <td className="Rate">
                        <h2>Giá</h2>
                      </td>
                      <td className="Rate">
                        <h2>Tổng Cộng</h2>
                      </td>
                    </tr>
                    {selectedBill.cartItems.map((item) => (
                      <>
                        <tr className="service">
                          <td className="tableitem">
                            <p className="itemtext">{item.name}</p>
                          </td>
                          <td className="tableitem">
                            <p className="itemtext">{item.quantity}</p>
                          </td>
                          <td className="tableitem">
                            <p className="itemtext">{item.price}</p>
                          </td>

                          <td className="tableitem">
                            <p className="itemtext">
                              {item.quantity * item.price}
                            </p>
                          </td>
                        </tr>
                      </>
                    ))}
                    <tr className="tabletitle">
                      <td />
                      <td />
                      <td className="Rate">
                        <h2>Thuế</h2>
                      </td>
                      <td className="payment">
                        <h2>${selectedBill.tax}</h2>
                      </td>
                    </tr>
                    <tr className="tabletitle">
                      <td />
                      <td />
                      <td className="Rate">
                        <h2>Tổng</h2>
                      </td>
                      <td className="payment">
                        <h2>
                          <b>${selectedBill.totalAmount}</b>
                        </h2>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div id="legalcopy">
                <p className="legal">
                  <strong>Thank you for your order!</strong>
                </p>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end mt-3">
            <Button type="primary" onClick={handlePrint}>
              Print
            </Button>
          </div>
        </Modal>
      )}
    </DefaultLayout>
  );
};
export default BillsPage;
