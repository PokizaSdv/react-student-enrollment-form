class StudentAPI {
    constructor() {
      this.endpoint = process.env.REACT_APP_API
    }
  
    async addStudent(input) {
      const { firstName, lastName, email, classEnrolled } = input;
  
      try {
        const response = await fetch(`${this.endpoint}/students`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ firstName, lastName, email, classEnrolled }),
        });
  
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message);
        }
  
        return await response.json();
      } catch (error) {
        console.log(error.message);
      }
    }
  
    async getAll() {
      try {
        const response = await fetch(`${this.endpoint}/students`);
        if (!response.ok) {
          throw new Error(response.error);
        }
  
        return await response.json();
      } catch (error) {
        console.log(error);
      }
    }
  
    async deleteOne(id) {
      try {
        const response = await fetch(`${this.endpoint}/students/${id}`, {
          method: "DELETE",
        });
  
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  
    async update(id, input) {
      const { firstName, lastName, email, classEnrolled } = input;
  
      try {
        const response = await fetch(`${this.endpoint}/students/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ firstName, lastName, email, classEnrolled }),
        });
  
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  }
  
 export const studentAPI = new StudentAPI();