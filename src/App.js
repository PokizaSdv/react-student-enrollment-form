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
            editStudentId: "",
            editFirstName: "",
            editLastName: "",
            editEmail: "",
            editClassEnrolled: ""
        };
    }

    addStudent = (e) => {
        e.preventDefault();

        const { firstName, lastName, email, classEnrolled } = this.state;

        if (!firstName || !lastName || !email || !classEnrolled) {
            return "Please fill out all fields!";
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
                classEnrolled: "",
                showEditModal: false
            };
        });
    };

    handleFirstNameOnChange = (e) => {
        const { value } = e.target;

        this.setState({
            firstNameValue: value
        });
    };

    handleLastNameOnChange = (e) => {
        const { value } = e.target;

        this.setState({
            lastNameValue: value
        });
    };

    handleEmailAddressOnChange = (e) => {
        const { value } = e.target;

        this.setState({
            emailAddressValue: value
        });

    };

    handleClassEnrolledOnChange = (e) => {
        const { value } = e.target;

        this.setState({
            classEnrolledValue: value
        });

    };

    handleFirstNameEdit = (e) => {
      this.setState({
          firstNameEditValue: e.target.value
      });
  };

  handleLastNameEdit = (e) => {
      this.setState({
          lastNameEditValue: e.target.value
      });
  };

  handleEmailAddressEdit = (e) => {
      this.setState({
          emailAddressEditValue: e.target.value
      });
  };

  handleClassEnrolledEdit = (e) => {
      this.setState({
          classEnrolledEditValue: e.target.value
      });
  };

    editingStudent = (studentId) => {
        for (const student of this.state.students) {
            if (student.id === studentId) {
                this.setState({
                    showEditingModal: true,
                    editStudentId: studentId,
                    editfirstName: student.firstName,
                    editlastName: student.lastName,
                    editemail: student.email,
                    editclassEnrolled: student.classEnrolled
                });
            }
        }
    };

    deletingStudent = (studentId) => {
        this.setState((prevState) => {
            const leftStudents = prevState.students.map((student) => {
                return student.id !== studentId;
            });
            return {
                students: leftStudents
            };
        });
    };

    render() {
        return (
            <main>
                <form onSubmit={this.addStudent}>
                    <input
                        type="text"
                        placeholder="First Name"
                        value={this.state.firstName}
                        onChange={this.handleFirstNameOnChange}
                    ></input>

                    <input
                        type="text"
                        placeholder="Last Name"
                        value={this.state.lastName}
                        onChange={this.handleLastNameOnChange}
                    ></input>

                    <input
                        type="text"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this.handleEmailAddressOnChange}
                    ></input>

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

                    <button type="submit">Add student</button>
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
                                <td>
                                    <button
                                        onClick={() =>
                                            this.editingStudent(student.id)
                                        }
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() =>
                                            this.deletingStudent(student.id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {this.state.showEditingModal && (
                    <div className="modal">
                        <form onSubmit={this.editingStudent}>
                            <input
                                type="text"
                                placeholder="First Name"
                                value={this.state.editFirstName}
                                onChange={this.handleFirstNameEdit}
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                value={this.state.editLastName}
                                onChange={this.handleLastNameEdit}
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={this.state.editEmail}
                                onChange={this.handleEmailAddressEdit}
                            />
                            <select
                                name="classEnrolled"
                                value={this.state.editClassEnrolled}
                                onChange={this.handleClassEnrolledEdit}
                            >
                                <option value="">Select Class</option>
                                <option value="Algebra">Algebra</option>
                                <option value="Geometry">Geometry</option>
                                <option value="Journalism">Journalism</option>
                                <option value="Literature">Literature</option>
                            </select>
                            <button type="submit">Update Student</button>
                        </form>
                    </div>
                )}
            </main>
        );
    }
}

export default App;
