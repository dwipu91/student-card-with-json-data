import {
  Button,
  Card,
  Col,
  Container,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { BiSolidShow } from "react-icons/bi";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Students = () => {
  const [modal, setModal] = useState(false);
  const [students, setStudents] = useState([]);
  const [input, setInput] = useState({
    name: "",
    age: "",
    roll: "",
    photo: "",
  });

  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleModalShow = () => {
    setModal(true);
  };

  const handleModalHide = () => {
    setModal(false);
  };

  // get all student data fack data in api/db.json folder
  const getAllStudents = async () => {
    const response = await axios.get("http://localhost:7000/students");
    setStudents(response.data);
  };

  // from submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!input.name || !input.roll || !input.roll || !input.photo) {
      Swal.fire({
        icon: "error",
        title: "OH NO!...",
        text: "All Fildes are required ",
      });
    } else {
      await axios
        .post("http://localhost:7000/students", input)
        .then((res) => {})
        .catch((error) => {});

      setInput({
        name: "",
        age: "",
        roll: "",
        photo: "",
      });

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Work Done",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    handleModalHide();
    getAllStudents();
  };

  // handle Eidet Student
  const handleEidetStudent = async (id) => {
    setInput(students.find((data) => data.id === id));
    handleModalShow();

    await axios.patch(`http://localhost:7000/students/${id}`);
  };

  // student delete
  const handleDeleteStudent = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:7000/students/${id}`, input);

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        getAllStudents();
      }
    });
  };

  //get student data in api/db.json
  useEffect(() => {
    getAllStudents();
  }, []);

  return (
    <>
      <Container className="my-5">
        <Row className=" my-5 justify-content-center ">
          <Col md={8}>
            <Button
              show={modal}
              onClick={handleModalShow}
              className="mb-3 text-light "
              variant="info"
            >
              {" "}
              Create New Student
            </Button>
            <Card>
              <Card.Header>
                <Card.Title style={{ alignItems: "center" }}>
                  All Students
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Table className="text-center">
                  <thead>
                    <tr>
                      <th>SL</th>
                      <th>Photo</th>
                      <th>Name</th>
                      <th>Age</th>
                      <th>Roll</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.length === 0 ? (
                      <tr>
                        <th
                          colSpan={6}
                          style={{
                            color: "#2471a3",
                            fontWeight: "700",
                            padding: "10px",
                            backgroundColor: "#e5e7e9",
                            letterSpacing: "20px",
                            fontSize: "20px",
                          }}
                        >
                          Data is not Found
                        </th>
                      </tr>
                    ) : (
                      students.map((item, index) => {
                        return (
                          <tr style={{ verticalAlign: "middle" }} key={index}>
                            <td>{index + 1}</td>
                            <td>
                              <img
                                style={{
                                  width: "70px",
                                  height: "70px",
                                  objectFit: "cover",
                                  borderRadius: "50%",
                                  margin: "auto",
                                }}
                                src={item.photo}
                                alt=""
                              />
                            </td>
                            <td> {item.name} </td>
                            <td> {item.age} </td>
                            <td> {item.roll} </td>
                            <td>
                              <Button variant="info">
                                {" "}
                                <BiSolidShow />
                              </Button>{" "}
                              &nbsp;
                              <Button
                                variant="warning"
                                onClick={() => handleEidetStudent(item.id)}
                              >
                                {" "}
                                <FaEdit />
                              </Button>{" "}
                              &nbsp;
                              <Button
                                variant="danger"
                                onClick={() => handleDeleteStudent(item.id)}
                              >
                                {" "}
                                <FaTrash />{" "}
                              </Button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* modal for creat student  */}
      <Modal show={modal} centered onHide={handleModalHide}>
        <Modal.Header>
          <Modal.Title>Creat a Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleFormSubmit}>
            <div className="my-3">
              <label htmlFor="">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={input.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="my-3">
              <label htmlFor="">age</label>
              <input
                type="text"
                className="form-control"
                name="age"
                value={input.age}
                onChange={handleInputChange}
              />
            </div>
            <div className="my-3">
              <label htmlFor="">Roll</label>
              <input
                type="text"
                className="form-control"
                name="roll"
                value={input.roll}
                onChange={handleInputChange}
              />
            </div>
            <div className="my-3">
              <label htmlFor="">Photo</label>
              <input
                type="text"
                className="form-control"
                name="photo"
                value={input.photo}
                onChange={handleInputChange}
              />
            </div>
            <div className="my-">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      {/* modal for update stusent   */}
      <Modal show={modal} centered onHide={handleModalHide}>
        <Modal.Header>
          <Modal.Title>Updat a Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleFormSubmit}>
            <div className="my-3">
              <label htmlFor="">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={input.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="my-3">
              <label htmlFor="">age</label>
              <input
                type="text"
                className="form-control"
                name="age"
                value={input.age}
                onChange={handleInputChange}
              />
            </div>
            <div className="my-3">
              <label htmlFor="">Roll</label>
              <input
                type="text"
                className="form-control"
                name="roll"
                value={input.roll}
                onChange={handleInputChange}
              />
            </div>
            <div className="my-3">
              <label htmlFor="">Photo</label>
              <input
                type="text"
                className="form-control"
                name="photo"
                value={input.photo}
                onChange={handleInputChange}
              />
            </div>
            <div className="my-">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Students;
