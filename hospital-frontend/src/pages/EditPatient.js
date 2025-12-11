import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/Api";
import { authContext } from "../components/AuthContext";

function EditPatient() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(authContext);

  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
    disease: ""
  });

  const [errors, setErrors] = useState({});

  // Fetch patient by ID
  useEffect(() => {
    API.get(`/patients/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => setForm(res.data))
      .catch((err) => console.log(err));
  }, [id, token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (form.age < 0 || form.age > 120)
      newErrors.age = "Age must be between 0 and 120";
    if (!/^\d{10}$/.test(form.phone))
      newErrors.phone = "Phone number must be 10 digits";
    if (!form.disease.trim()) newErrors.disease = "Disease is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // PUT request for updating
    API.put(`/patients/${id}`, form, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => navigate("/patients"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-warning">
          <h4 className="mb-0">Edit Patient</h4>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label">Name</label>
              <input name="name" className="form-control"
                value={form.name} onChange={handleChange} />
              {errors.name && <div className="text-danger">{errors.name}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Age</label>
              <input name="age" className="form-control"
                value={form.age} onChange={handleChange} />
              {errors.age && <div className="text-danger">{errors.age}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Gender</label>
              <input name="gender" className="form-control"
                value={form.gender} onChange={handleChange} />
            </div>

            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input name="phone" className="form-control"
                value={form.phone} onChange={handleChange} />
              {errors.phone && <div className="text-danger">{errors.phone}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Address</label>
              <input name="address" className="form-control"
                value={form.address} onChange={handleChange} />
            </div>

            <div className="mb-3">
              <label className="form-label">Disease</label>
              <input name="disease" className="form-control"
                value={form.disease} onChange={handleChange} />
              {errors.disease && <div className="text-danger">{errors.disease}</div>}
            </div>

            <button className="btn btn-primary w-100" type="submit">
              Update Patient
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default EditPatient;
