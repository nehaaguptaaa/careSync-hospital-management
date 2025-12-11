import { useEffect, useState, useContext } from "react";
import API from "../services/Api";
import { Link } from "react-router-dom";
import { authContext } from "../components/AuthContext";

function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [specialization, setSpecialization] = useState("");
  const { token } = useContext(authContext);

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = () => {
    API.get("/doctors", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => setDoctors(res.data))
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this doctor?")) return;

    API.delete(`/doctors/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(() => loadDoctors())
      .catch((err) => console.log(err));
  };

  const uniqueSpecializations = ["All", ...new Set(doctors.map((d) => d.specialization))];

  return (
    <div className="container mt-4">

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Doctor List</h3>
        <Link to="/doctors/add" className="btn btn-success">
          Add Doctor
        </Link>
      </div>

      {/* FILTER */}
      <div className="mb-3">
        <select
          className="form-select"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
        >
          {uniqueSpecializations.map((spec, index) => (
            <option
              key={index}
              value={spec === "All" ? "" : spec}
            >
              {spec}
            </option>
          ))}
        </select>
      </div>

      <table className="table table-striped table-hover shadow">
        <thead className="table-primary">
          <tr>
            <th>Name</th>
            <th>Specialization</th>
            <th>Phone</th>
            <th>Qualification</th>
            <th>Experience</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {doctors
            .filter((d) =>
              specialization === "" ? true : d.specialization === specialization
            )
            .map((d) => (
              <tr key={d.id}>
                <td>{d.name}</td>
                <td>{d.specialization}</td>
                <td>{d.phone}</td>
                <td>{d.qualification}</td>
                <td>{d.experience}</td>

                <td>
                  <Link
                    to={`/doctors/edit/${d.id}`}
                    className="btn btn-warning btn-sm me-2"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(d.id)}
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

export default DoctorList;
