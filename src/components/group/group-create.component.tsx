import { group } from "console";
import { ChangeEvent, Fragment, MouseEvent, useState } from "react";
import { Badge, Button, CloseButton, Container, FormCheck, InputGroup, ListGroup, ListGroupItem, Modal } from "react-bootstrap";
import Form from 'react-bootstrap/Form';

export type NewGroupMember = {
  email: string
  isAdmin?: boolean
}

const CreateGroupModal = (props: any) => {

  const [groupMembers, setGroupMembers] = useState<NewGroupMember[]>([{ email: "one", isAdmin: true }, { email: "two", isAdmin: false }])


  const handleCreateGroup = () => {
    console.log("Creating group")
  }

  const handleAddMember = () => {
    console.log("Adding member to group")
    setGroupMembers([...groupMembers, { email: "" }])
  }

  const handleRemoveMember = (indexToRemove: number) => {
    console.log(`Removing member ${indexToRemove} from group`)
    groupMembers.splice(indexToRemove, 1);
    setGroupMembers([...groupMembers]);
  }

  const handleGroupMemberEmailUpdate = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const emailAddress = event.target.value.toLocaleLowerCase();
    console.log(emailAddress)
    groupMembers[index].email = emailAddress;
    if (emailAddress.length < 1) {
      groupMembers[index].isAdmin = false;
    }
    setGroupMembers([...groupMembers]);
  }

  const toggleGroupMemberAdminStateUpdate = (index: number) => {
    groupMembers[index].isAdmin = !groupMembers[index].isAdmin;
    setGroupMembers([...groupMembers]);
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Form>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create Group
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form.Group className="mb-3" controlId="formGroupName">
              <Form.Label>Group Name</Form.Label>
              <Form.Control required type="input" placeholder="Name of group" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAddMembers">
              <Form.Label>Group Members</Form.Label>
              <InputGroup>
                <Button onClick={handleAddMember}>Add Member</Button>
              </InputGroup>
              {groupMembers.map((item, index) => {
                return (
                  <InputGroup key={index}>
                    <InputGroup.Text><CloseButton onClick={() => { handleRemoveMember(index) }}></CloseButton></InputGroup.Text>
                    <Form.Control required type="email" className="col-md-6" onChange={(event: React.ChangeEvent<HTMLInputElement>) => { handleGroupMemberEmailUpdate(event, index) }} value={item.email} placeholder="Email Address" />
                    <InputGroup.Text>Is Admin:</InputGroup.Text>
                    <InputGroup.Checkbox checked={item.isAdmin ?? false} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { toggleGroupMemberAdminStateUpdate(index) }} disabled={item.email.length < 1} />
                  </InputGroup>
                )
              })}
            </Form.Group>
            {/* {groupMembers.length > 0 ? (
              <Fragment>
                <Form.Label>Group Members</Form.Label>
                <ListGroup className="col-md-6">
                  {groupMembers.map((item, index) => {
                    return <ListGroup.Item className="d-flex justify-content-between align-items-start" as="li" key={index} variant={item.isAdmin ? ("success") : ""}>
                      {item.email}{item.isAdmin ? (" (Admin)") : ""}
                      <Badge bg="" pill>
                        <CloseButton onClick={() => { handleRemoveMember(index) }}></CloseButton>
                      </Badge>
                    </ListGroup.Item>
                  })}
                </ListGroup>
              </Fragment>
            ) : ""} */}
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCreateGroup} type="submit">Create group</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default CreateGroupModal;
