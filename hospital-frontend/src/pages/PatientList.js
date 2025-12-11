import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import API from "../services/Api";
import { authContext } from "../components/AuthContext";

function PatientList() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");

  const { token } = useContext(authContext);

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = () => {
    API.get("/patients", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => setPatients(res.data))
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this patient?")) return;

    API.delete(`/patients/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => loadPatients())
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Patient List</h3>
        <Link to="/patients/add" className="btn btn-success">
          Add Patient
        </Link>
      </div>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by name or disease..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="table table-striped table-hover shadow">
        <thead className="table-primary">
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Phone</th>
            <th>Disease</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {patients
            .filter((p) =>
              p.name.toLowerCase().includes(search.toLowerCase()) ||
              p.disease.toLowerCase().includes(search.toLowerCase())
            )
            .map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.age}</td>
                <td>{p.gender}</td>
                <td>{p.phone}</td>
                <td>{p.disease}</td>

                <td>
                  <Link
                    to={`/patients/edit/${p.id}`}
                    className="btn btn-sm btn-warning me-2"
                  >
                    Edit
                  </Link>

                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(p.id)}
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

export default PatientList;
