import React from "react";
import { v4 as uuid } from "uuid";

import "./App.css";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            students: [],
            firstName: "",
            lastName: "",
            email: "",
            classEnrolled: "",
            showEditingModal: false,
            firstNameError: false,
            lastNameError: false,
            emailError: false,
            classEnrolledError: false,
            inputError: "",
            editedStudentId: "",
            editedFirstName: "",
            editedLastName: "",
            editedEmail: "",
            editedClassEnrolled: "",
            showConfirmingModal: false,
            deletingStudenId: ""
        };
    }

    addStudent = (e) => {
        e.preventDefault();

        const { firstName, lastName, email, classEnrolled } = this.state;

        if (!firstName || !lastName || !email || !classEnrolled) {
            return "Please fill out all fields!";
        }

        if (
            firstName.length <= 1 ||
            lastName.length <= 1 ||
            email.length <= 1 ||
            classEnrolled.length <= 1
        ) {
            this.setState({
                inputError: true
            });
            return;
        }

        const newStudent = {
            id: uuid(),
            firstName,
            lastName,
            email,
            classEnrolled
        };

        this.setState((prevState) => {
            const copyStudents = [...prevState.students, newStudent];
            return {
                students: copyStudents,
                firstName: "",
                lastName: "",
                email: "",
                classEnrolled: ""
            };
        });
    };

    handleFirstNameOnChange = (e) => {
        const { value } = e.target;
        this.setState({
            firstName: value
        });

        if (value.length <= 1) {
            this.setState({
                firstNameError: true
            });
        } else {
            this.setState({
                firstNameError: false
            });
        }
    };

    handleLastNameOnChange = (e) => {
        const { value } = e.target;
        this.setState({
            lastName: value
        });
        if (value.length <= 1) {
            this.setState({
                lastNameError: true
            });
        } else {
            this.setState({
                lastNameError: false
            });
        }
    };

    handleEmailAddressOnChange = (e) => {
        const { value } = e.target;

        this.setState({
            email: value
        });

        if (value.length <= 1) {
            this.setState({
                emailError: true
            });
        } else {
            this.setState({
                emailError: false
            });
        }
    };

    handleClassEnrolledOnChange = (e) => {
        const { value } = e.target;
        this.setState({
            classEnrolled: value
        });

        if (value.length <= 1) {
            this.setState({
                classEnrolledError: true
            });
        } else {
            this.setState({
                classEnrolledError: false
            });
        }
    };

    editingStudent = (studentId) => {
        for (const student of this.state.students) {
            if (student.id === studentId) {
                this.setState({
                    showEditingModal: true,
                    editedStudentId: studentId,
                    editedFirstName: student.firstName,
                    editedLastName: student.lastName,
                    editedEmail: student.email,
                    editedClassEnrolled: student.classEnrolled
                });
            }
        }
    };

    handleFirstNameEdit = (e) => {
        this.setState({
            editedFirstName: e.target.value
        });
    };

    handleLastNameEdit = (e) => {
        this.setState({
            editedLastName: e.target.value
        });
    };

    handleEmailAddressEdit = (e) => {
        this.setState({
            editedEmail: e.target.value
        });
    };

    handleClassEnrolledEdit = (e) => {
        this.setState({
            editedClassEnrolled: e.target.value
        });
    };

    submitEdit = () => {
        this.setState((prevState) => {
            const updatedStudents = prevState.students.map((student) => {
                if (student.id === this.state.editedStudentId) {
                    const copy = {
                        ...student,
                        firstName: this.state.editedFirstName,
                        lastName: this.state.editedLastName,
                        email: this.state.editedEmail,
                        classEnrolled: this.state.editedClassEnrolled
                    };
                    return copy;
                }
                return student;
            });
            return {
                students: updatedStudents,
                showEditingModal: false
            };
        });
    };

    deletingStudent = (studentId) => {
      this.setState((prevState) => {
          const leftStudents = prevState.students.filter((student) => student.id !== studentId);
          return {
              students: leftStudents,
              showConfirmingModal: false
          };
      });
  };
  
  
    render() {
        return (
            <main>
                <form className="form" onSubmit={this.addStudent}>
                    <h1>Student Enrollment Form</h1>
                    
                    <div className="form-control">
                    <input
                        type="text"
                        placeholder="First Name"
                        value={this.state.firstName}
                        onChange={this.handleFirstNameOnChange}
                    ></input>
                    {this.state.firstNameError && (
                        <span className="error-span">Invalid First Name</span>
                    )}
                    </div>

                    <div className="form-control">
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={this.state.lastName}
                        onChange={this.handleLastNameOnChange}
                    ></input>
                    {this.state.lastNameError && (
                        <span className="error-span">Invalid Last Name</span>
                    )}
                    </div>

                    <div className="form-control">
                    <input
                        type="text"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this.handleEmailAddressOnChange}
                    ></input>
                    {this.state.emailError && (
                        <span className="error-span">Invalid Email</span>
                    )}
                    </div>

                    <div className="form-control">
                    <select
                        value={this.state.classEnrolled}
                        onChange={this.handleClassEnrolledOnChange}
                    >
                        <option value="">Select Class</option>
                        <option value="Algebra">Algebra</option>
                        <option value="Geometry">Geometry</option>
                        <option value="Journalism">Journalism</option>
                        <option value="Literature">Literature</option>
                    </select>
                    {this.state.classEnrolledError && (
                        <span className="error-span">Invalid Class</span>
                    )}
                    </div>
                    <button className="submit" type="submit">Add student</button>
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
                        {this.state.students.map((student) => (
                            <tr key={student.id}>
                                <td>{student.firstName}</td>
                                <td>{student.lastName}</td>
                                <td>{student.email}</td>
                                <td>{student.classEnrolled}</td>
                                <td id="actions">
                                    <button
                                        className="edit-btn"
                                        onClick={() =>
                                            this.editingStudent(student.id)
                                        }
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="delete-btn"
                                        onClick={() =>{
                                          this.setState({
                                            showConfirmingModal: true,
                                            deletingStudenId: student.id
            
                                          })
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {this.state.showEditingModal && (
                    <div className="editing-modal">
                        <form onSubmit={this.editingStudent}>
                            <input
                                type="text"
                                placeholder="First Name"
                                value={this.state.editedFirstName}
                                onChange={this.handleFirstNameEdit}
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                value={this.state.editedLastName}
                                onChange={this.handleLastNameEdit}
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={this.state.editedEmail}
                                onChange={this.handleEmailAddressEdit}
                            />
                            <select
                                name="classEnrolled"
                                value={this.state.editedClassEnrolled}
                                onChange={this.handleClassEnrolledEdit}
                            >
                                <option value="">Select Class</option>
                                <option value="Algebra">Algebra</option>
                                <option value="Geometry">Geometry</option>
                                <option value="Journalism">Journalism</option>
                                <option value="Literature">Literature</option>
                            </select>
                            <button className="submit-edit" type="submit" onClick={this.submitEdit}>
                                Update Student
                            </button>
                            <button className="cancel-edit"
                            onClick={() => {
                                this.setState({
                                    showEditingModal: false,
                                    
                                });
                            }}
                        >
                            Cancel
                        </button>
                        </form>
                    </div>
                )}

                {this.state.showConfirmingModal && (
                    <div className="deleting-modal">
                        <h2>Are you sure to delete this student?</h2>
                        <button onClick={() => {this.deletingStudent(this.state.deletingStudenId);
                        this.setState({
                          showConfirmingModal: false,
                          deletingStudenId: ""
                        })}
                        }>Yes, Delete!</button>


                        <button
                            onClick={() => {
                                this.setState({
                                    showConfirmingModal: false,
                                    
                                });
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </main>
        );
    }
}

export default App;
