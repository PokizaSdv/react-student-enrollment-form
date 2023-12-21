import { useState, useEffect } from "react";
import { studentAPI } from "./api/student";
import "./App.css";

const App = () => {
    const [students, setStudents] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [classEnrolled, setClassEnrolled] = useState("");

    const [showEditingModal, setShowEditingModal] = useState(false);

    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [classEnrolledError, setClassEnrolledError] = useState(false);
    const [inputError, setInputError] = useState("");

    const [editedStudentId, setEditedStudentId] = useState("");
    const [editedFirstName, setEditedFirstName] = useState("");
    const [editedLastName, setEditedLastName] = useState("");
    const [editedEmail, setEditedEmail] = useState("");
    const [editedClassEnrolled, setEditedClassEnrolled] = useState("");
    
    const [showConfirmingModal, setShowConfirmingModal] = useState(false);
    const [deletingStudentId, setDeletingStudentId] = useState("");

  
    useEffect(() => {
      studentAPI
          .getAll()
          .then((response) => {
              setStudents(response.data);
          })
          .catch((err) => {
              console.log(err);
          });
  }, []);

  const addStudent = (e) => {
    e.preventDefault();

    if (
        firstName.length <= 1 ||
        lastName.length <= 1 ||
        email.length <= 1 ||
        classEnrolled.length <= 1
    ) {
        setInputError(true);
        return;
    }

    studentAPI
        .addStudent({ firstName, lastName, email, classEnrolled })
        .then((response) => {
            setFirstName("");
            setLastName("");
            setEmail("");
            setClassEnrolled("");
            setStudents((prevStudents) => {
                return [...prevStudents, response.data];
            });
        })
        .catch((err) => {
            console.log(err);
        });
};
    

    const handleFirstNameOnChange = (e) => {
        const { value } = e.target;
        setFirstName(value);

        if (value.length <= 1) {
            setFirstNameError(true);
        } else {
            setFirstNameError(false);
        }
    };

    const handleLastNameOnChange = (e) => {
        const { value } = e.target;
        setLastName(value);

        if (value.length <= 1) {
            setLastNameError(true);
        } else {
            setLastNameError(false);
        }
    };

    const handleEmailAddressOnChange = (e) => {
        const { value } = e.target;
        setEmail(value);

        if (value.length <= 1) {
            setEmailError(true);
        } else {
            setEmailError(false);
        }
    };

    const handleClassEnrolledOnChange = (e) => {
        const { value } = e.target;
        setClassEnrolled(value);

        if (value.length <= 1) {
            setClassEnrolledError(true);
        } else {
            setClassEnrolledError(false);
        }
    };

    const editingStudent = (studentId) => {
      setEditedStudentId(studentId);
      setShowEditingModal(true);

      for (const student of students) {
          if (student.id === studentId) {
              setEditedFirstName(student.firstName);
              setEditedLastName(student.lastName);
              setEditedEmail(student.email);
              setEditedClassEnrolled(student.className);
              break;
          }
      }
  };

    const handleFirstNameEdit = (e) => {
        setEditedFirstName(e.target.value);
    };

    const handleLastNameEdit = (e) => {
        setEditedLastName(e.target.value);
    };

    const handleEmailAddressEdit = (e) => {
        setEditedEmail(e.target.value);
    };

    const handleClassEnrolledEdit = (e) => {
        setEditedClassEnrolled(e.target.value);
    };

    // const submitEdit = async () => {
    //     try {
    //         await studentAPI.update(editedStudentId, {
    //             firstName: editedFirstName,
    //             lastName: editedLastName,
    //             email: editedEmail,
    //             classEnrolled: editedClassEnrolled
    //         });

    //         setStudents((prevStudents) =>
    //             prevStudents.map((student) =>
    //                 student.id === editedStudentId
    //                     ? {
    //                           ...student,
    //                           firstName: editedFirstName,
    //                           lastName: editedLastName,
    //                           email: editedEmail,
    //                           classEnrolled: editedClassEnrolled
    //                       }
    //                     : student
    //             )
    //         );

    //         setShowEditingModal(false);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };


    const submitEdit = () => {
      studentAPI
          .update(editedStudentId, {
              editedFirstName,
              editedLastName,
              editedEmail,
              editedClassEnrolled
          })
          .then((_) => {
              setStudents((prevStudents) => {
                  const copyStudents = [];
                  for (let i = 0; i < prevStudents.length; i++) {
                      const student = prevStudents[i];
                      if (student.id === editedStudentId) {
                          const copy = { ...student };
                          copy.firstName = editedFirstName;
                          copy.lastName = editedLastName;
                          copy.email = editedEmail;
                          copy.classEnrolled =editedClassEnrolled;
                          copyStudents.push(copy);
                      } else {
                          copyStudents.push(student);
                      }
                  }
                  return copyStudents;
              });
          })
          .catch((err) => {
              console.log(err);
          });

      setShowEditingModal(false);
  };

    const deletingStudent = (id) => {
      studentAPI
          .deleteOne(id)
          .then(() => {
              setStudents((prevStudents) => {
                  return prevStudents.filter((student) => student.id !== id);
              });
          })
          .catch((err) => {
              console.log(err);
          });
  };

    return (
        <main>
            <form className="form" onSubmit={addStudent}>
                <h1>Student Enrollment Form</h1>

                <div className="form-control">
                    <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={handleFirstNameOnChange}
                    />
                    {firstNameError && (
                        <span className="error-span">Invalid First Name</span>
                    )}
                </div>

                <div className="form-control">
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={handleLastNameOnChange}
                    />
                    {lastNameError && (
                        <span className="error-span">Invalid Last Name</span>
                    )}
                </div>

                <div className="form-control">
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailAddressOnChange}
                    />
                    {emailError && (
                        <span className="error-span">Invalid Email</span>
                    )}
                </div>

                <div className="form-control">
                    <select
                        value={classEnrolled}
                        onChange={handleClassEnrolledOnChange}
                    >
                        <option value="">Select Class</option>
                        <option value="Algebra">Algebra</option>
                        <option value="Geometry">Geometry</option>
                        <option value="Journalism">Journalism</option>
                        <option value="Literature">Literature</option>
                    </select>
                    {classEnrolledError && (
                        <span className="error-span">Invalid Class</span>
                    )}
                </div>
                <button className="submit" type="submit">
                    Add student
                </button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Class Enrolled</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.id}>
                            <td>{student.firstName}</td>
                            <td>{student.lastName}</td>
                            <td>{student.email}</td>
                            <td>{student.classEnrolled}</td>
                            <td id="actions">
                                <button
                                    className="edit-btn"
                                    onClick={() => editingStudent(student.id)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="delete-btn"
                                    onClick={() => {
                                        setShowConfirmingModal(true);
                                        setDeletingStudentId(student.id);
                                    }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showEditingModal && (
                <div className="editing-modal">
                    <form onSubmit={editingStudent}>
                        <input
                            type="text"
                            placeholder="First Name"
                            value={editedFirstName}
                            onChange={handleFirstNameEdit}
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={editedLastName}
                            onChange={handleLastNameEdit}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={editedEmail}
                            onChange={handleEmailAddressEdit}
                        />
                        <select
                            name="classEnrolled"
                            value={editedClassEnrolled}
                            onChange={handleClassEnrolledEdit}
                        >
                            <option value="">Select Class</option>
                            <option value="Algebra">Algebra</option>
                            <option value="Geometry">Geometry</option>
                            <option value="Journalism">Journalism</option>
                            <option value="Literature">Literature</option>
                        </select>
                        <button
                            className="submit-edit"
                            type="submit"
                            onClick={submitEdit}
                        >
                            Update Student
                        </button>
                        <button
                            className="cancel-edit"
                            onClick={() => setShowEditingModal(false)}
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            )}

            {showConfirmingModal && (
                <div className="deleting-modal">
                    <h2>Are you sure to delete this student?</h2>
                    <button
                        onClick={() => {
                            deletingStudent(deletingStudentId);
                            setShowConfirmingModal(false);
                            setDeletingStudentId("");
                        }}
                    >
                        Yes, Delete!
                    </button>

                    <button onClick={() => setShowConfirmingModal(false)}>
                        Cancel
                    </button>
                </div>
            )}
        </main>
    );
};

export default App;
