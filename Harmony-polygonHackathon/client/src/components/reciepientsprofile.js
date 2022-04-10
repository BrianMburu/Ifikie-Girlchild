import React, { useState } from "react";
import { Container, Table } from "react-bootstrap";

const Account = () => {
  const [membersID, setMembersID] = useState(0);
  const [membersAddress, setMembersAdress] = useState(
    "0xDBF84248124cD22aC17E0Ea42be2C895C15D9a2b"
  );
  const [isLoaning, setIsLoaning] = useState("false");
  const [groupName, setGroupName] = useState("Maendeleo");
  return (
    <div>
      <Container className="mt-5 mx-9">
        <h3 className="font-weight-bold">
          Hello, 
          <span
            className="text-success"
          >
            {groupName}
          </span>
          , The following are your fellow members
        </h3>
        <Table responsive striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>GropMembers</th>
              <th>Loaning Status</th>
            </tr>
          </thead>
          <tbody>
            {/* Top be mapped Through */}
            <tr>
              <td>{membersID} </td>
              <td>{membersAddress}</td>
              <td>{isLoaning}</td>
            </tr>
              {/* The code to be used reaches here  the rest is for demo */}
            <tr>
              <td>{membersID} </td>
              <td>{membersAddress}</td>
              <td>{isLoaning}</td>
            </tr>
            <tr>
              <td>{membersID} </td>
              <td>{membersAddress}</td>
              <td>{isLoaning}</td>



            </tr>
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default Account;