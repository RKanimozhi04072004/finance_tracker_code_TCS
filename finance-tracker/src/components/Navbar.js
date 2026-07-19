import { Link, useNavigate } from "react-router-dom";
import API from "../services/Api";

function Navbar() {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const currentMonth = new Date().toISOString().slice(0, 7);

  const downloadCSV = async () => {

    try {

      const response = await API.get(

        `/export/csv/${user.id}?month=${currentMonth}`,

        {
          responseType: "blob"
        }

      );

      const url = window.URL.createObjectURL(
        new Blob([response.data])
      );

      const link = document.createElement("a");

      link.href = url;

      link.setAttribute(
        "download",
        "Monthly_Report.csv"
      );

      document.body.appendChild(link);

      link.click();

      link.remove();

    } catch (error) {

      console.log(error);

      alert("CSV Download Failed");

    }

  };

  // const logout = () => {

  //   localStorage.removeItem("user");

  //   navigate("/login");

  // };
  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
};

  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

      <div className="container">

        <Link className="navbar-brand" to="/dashboard">
          Finance Tracker
        </Link>

        <div className="navbar-nav me-auto">

          {user && (

            <>
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>

              <Link className="nav-link" to="/transactions">
                Transactions
              </Link>

              <Link className="nav-link" to="/add-transaction">
                Add Transaction
              </Link>

              <Link className="nav-link" to="/budget">
                Budget
              </Link>
            </>

          )}

        </div>

        <div className="d-flex align-items-center">

          {!user ? (

            <>
              <Link
                className="btn btn-outline-light me-2"
                to="/login"
              >
                Login
              </Link>

              <Link
                className="btn btn-warning"
                to="/signup"
              >
                Signup
              </Link>
            </>

          ) : (

            <>

              <span className="text-white me-3">
                Welcome, {user.name}
              </span>

              <button
                className="btn btn-success me-2"
                onClick={downloadCSV}
              >
                Download CSV
              </button>

              <button
                className="btn btn-danger"
                onClick={logout}
              >
                Logout
              </button>

            </>

          )}

        </div>

      </div>

    </nav>

  );

}

export default Navbar;