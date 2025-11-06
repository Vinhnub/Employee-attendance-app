import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShiftsTable } from "./WorkPage";
import * as managementService from "../Service/Management";

export default function UserShifts() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [shifts, setShifts] = useState([]);
  const [popup, setPopup] = useState("");
  const [showShifts, setShowShifts] = useState(false);
  const [expanedShift, setExpanedShift] = useState(null);

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

  return (
    <div>
      <ShiftsTable
        shifts={shifts}
        extra={(shift) =>
          (expanedShift === shift.id) && (
            <tr>
              <td colSpan={3}>expaned</td>
            </tr>
          )
        }
        onRowClick={(shift) =>
          setExpanedShift(shift.id == expanedShift ? null : shift.id)
        }
      />
    </div>
  );
}
