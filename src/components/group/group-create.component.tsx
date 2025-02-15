import { group } from "console";
import { ChangeEvent, Fragment, MouseEvent, useState } from "react";
import { Badge, Button, CloseButton, Container, FormCheck, InputGroup, ListGroup, ListGroupItem, Modal } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import ApiClient from "../../utils/backend-api";
import { GroupApiResponse } from "./group-list.component";
import { UserApiResponse } from "../expense/expenses-list.component";

export type NewGroupMember = {
  email: string
  isAdmin?: boolean
}

const CreateGroupModal = (props: any) => {

  const apiClient: ApiClient = props.apiClient;
  const [groupMembers, setGroupMembers] = useState<NewGroupMember[]>([])
  const [groupName, setGroupName] = useState<string>("")
  const [groupDescription, setGroupDescription] = useState<string>("")
  const [filteredUsers, setFilteredUsers] = useState<UserApiResponse[]>([...props.usersList])

  const handleCreateGroup = (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log("Creating group");
    apiClient.addGroup({ name: groupName, description: groupDescription }).then((response: GroupApiResponse) => {
      console.log(response);
      props.setGroupsCallback(response);
      return response;
    }).then((groupResponse: GroupApiResponse) => {
      groupMembers.forEach(item => {
        apiClient.addGroupMember(groupResponse.id, item);
      });
    });
  }

  const handleAddMemberSelectInput = () => {
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

  const handleUpdateGroupName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newGroupName = event.target.value;
    console.log(newGroupName)
    setGroupName(newGroupName);
  }

  const handleMemberAdd = (index: number, e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log(index);
    console.log(value);
    groupMembers[index] = {
      email: filteredUsers[parseInt(value) - 1].email,
      isAdmin: false
    };
    setGroupMembers([...groupMembers]);
    console.log(groupMembers);
  };

  const handleUpdateGroupDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newGroupDescription = event.target.value;
    console.log(newGroupDescription)
    setGroupDescription(newGroupDescription);
  }

  const toggleGroupMemberAdminStateUpdate = (index: number) => {
    groupMembers[index].isAdmin = !groupMembers[index].isAdmin;
    setGroupMembers([...groupMembers]);
  }

  if (!filteredUsers) {
    return <Fragment></Fragment>
  }

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Form onSubmit={handleCreateGroup}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create Group
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form.Group className="mb-3" controlId="formGroupName">
              <Form.Label>Group Name</Form.Label>
              <Form.Control required type="input" placeholder="Name of group" value={groupName} onChange={handleUpdateGroupName} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control minLength={10} required as="textarea" placeholder="Short description of group" value={groupDescription} onChange={handleUpdateGroupDescription} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAddMembers">
              <Form.Label>Group Members</Form.Label>
              <InputGroup>
                <Button onClick={handleAddMemberSelectInput}>Add Member</Button>
              </InputGroup>
              {groupMembers.map((member, index) => {
                return (
                  <InputGroup key={index}>
                    <InputGroup.Text><CloseButton onClick={() => { handleRemoveMember(index) }}></CloseButton></InputGroup.Text>
                    {/* <Form.Control required type="email" className="col-md-6" onChange={(event: React.ChangeEvent<HTMLInputElement>) => { handleGroupMemberEmailUpdate(event, index) }} value={item.email} placeholder="Email Address" /> */}
                    <Form.Select onChange={(e: any) => handleMemberAdd(index, e)}>
                      <option>User</option>
                      {
                        filteredUsers ? (
                          filteredUsers.map((item) => {
                            return (
                              <option value={item.id} key={item.id}>{item.username} ({item.email})</option>
                            )
                          })
                        ) : (
                          <Fragment></Fragment>
                        )
                      }
                    </Form.Select>
                    <InputGroup.Text>Is Admin:</InputGroup.Text>
                    <InputGroup.Checkbox checked={member.isAdmin ?? false} onChange={() => { toggleGroupMemberAdminStateUpdate(index) }} disabled={member.email.length < 1} />
                  </InputGroup>
                )
              })}
            </Form.Group>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit">Create group</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default CreateGroupModal;
