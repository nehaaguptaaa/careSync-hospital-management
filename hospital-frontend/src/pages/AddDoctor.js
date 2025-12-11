import { useState, useContext } from "react";
import API from "../services/Api";
import { useNavigate } from "react-router-dom";
import { authContext } from "../components/AuthContext";

function AddDoctor() {
  const navigate = useNavigate();
  const { token } = useContext(authContext);   // ✔ token properly used

  const [form, setForm] = useState({
    name: "",
    specialization: "",
    phone: "",
    qualification: "",
    experience: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.specialization.trim()) newErrors.specialization = "Specialization is required";
    if (!/^\d{10}$/.test(form.phone)) newErrors.phone = "Phone must be 10 digits";
    if (!form.qualification.trim()) newErrors.qualification = "Qualification is required";

    const exp = Number(form.experience);
    if (isNaN(exp) || exp < 0 || exp > 50)
      newErrors.experience = "Experience must be between 0 and 50 years";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // ✔ token is used here, so warning disappears
    API.post("/doctors", form, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(() => navigate("/doctors"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Add Doctor</h4>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label">Name</label>
              <input name="name" className="form-control" onChange={handleChange} />
              {errors.name && <div className="text-danger">{errors.name}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Specialization</label>
              <input name="specialization" className="form-control" onChange={handleChange} />
              {errors.specialization && <div className="text-danger">{errors.specialization}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input name="phone" className="form-control" onChange={handleChange} />
              {errors.phone && <div className="text-danger">{errors.phone}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Qualification</label>
              <input name="qualification" className="form-control" onChange={handleChange} />
              {errors.qualification && <div className="text-danger">{errors.qualification}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Experience (Years)</label>
              <input name="experience" className="form-control" onChange={handleChange} />
              {errors.experience && <div className="text-danger">{errors.experience}</div>}
            </div>

            <button className="btn btn-success w-100" type="submit">
              Save Doctor
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default AddDoctor;
