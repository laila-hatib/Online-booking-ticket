function ViewUsers({ setPage }) {

  // Dummy users
  const users = [
    { id: 1, name: "Laila Hatibu", email: "laila@gmail.com" },
    { id: 2, name: "John Doe", email: "john@gmail.com" },
  ];

  return (
    <div className="container mt-5">
      <h2>All Users</h2>

      <table className="table table-bordered mt-4">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="btn btn-secondary" onClick={() => setPage("adminDashboard")}>
        Back
      </button>
    </div>
  );
}

export default ViewUsers;
