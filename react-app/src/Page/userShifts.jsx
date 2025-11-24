import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShiftsTable } from "../Component/ShiftsTable";
import * as managementService from "../Service/Management";
import { UpdateShift } from "../Component/ShiftsTable";
import ManagerNav from "../Component/ManagerNav";
import Layout from "../Component/Layout";

export default function UserShifts() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [shifts, setShifts] = useState([]);
  const [popup, setPopup] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await managementService.getUser(id);
        if (response.data.status === "success") {
          setUser(response.data.data);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error(err);
      }
      try {
        const response = await managementService.getUserShifts(id);
        if (response.data.status === "success") {
          setShifts(response.data.data);
        } else {
          setShifts([]);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, [id]);
  const [expanedShift, setExpanedShift] = useState(null);
  function expandShift(shift) {
    setExpanedShift(shift.id == expanedShift ? null : shift.id);
  }
  return (
    <Layout Navbar={ManagerNav}>
      {popup}
      <ShiftsTable
        shifts={shifts}
        extra={(shift) =>
          expanedShift == shift.id && (
            <tr>
              <td colSpan={3}>
                <UpdateShift
                  id={id}
                  shift={shift}
                  expandShift={expandShift}
                  setPopup={setPopup}
                />
              </td>
            </tr>
          )
        }
        func={(shift) => expandShift(shift)}
      />
    </Layout>
  );
}
