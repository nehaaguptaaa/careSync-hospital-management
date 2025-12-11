import { useEffect, useState, useContext } from "react";
import API from "../services/Api";
import { Link } from "react-router-dom";
import { authContext } from "../components/AuthContext";

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const { token } = useContext(authContext);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = () => {
    API.get("/appointments", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => setAppointments(res.data))
      .catch((err) => console.log(err));
  };

  // ✅ FIXED delete logic with Authorization token
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this appointment?")) return;

    API.delete(`/appointments/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => loadAppointments())
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mt-4">

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Appointment List</h3>

        <Link to="/appointments/add" className="btn btn-success">
          Add Appointment
        </Link>
      </div>

      {/* Filters */}
      <div className="d-flex gap-2 mb-3">
        <select
          className="form-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="SCHEDULED">Scheduled</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>

        <input
          type="date"
          className="form-control"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
      </div>

      <table className="table table-striped table-hover shadow">
        <thead className="table-info">
          <tr>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {appointments
            .filter((a) =>
              (statusFilter ? a.status === statusFilter : true) &&
              (dateFilter ? a.date === dateFilter : true)
            )
            .map((a) => (
              <tr key={a.id}>
                <td>{a.patient?.name}</td>
                <td>{a.doctor?.name}</td>
                <td>{a.date}</td>
                <td>{a.time}</td>
                <td>{a.status}</td>

                <td>
                  <Link
                    to={`/appointments/edit/${a.id}`}
                    className="btn btn-warning btn-sm me-2"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(a.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

    </div>
  );
}

export default AppointmentList;
