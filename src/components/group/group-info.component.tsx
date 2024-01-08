import { Button, Container, ListGroup, Modal, ModalProps } from "react-bootstrap";
import { GroupMemberApiResponse, GroupApiResponse } from "./group-list.component";

const GroupInfoModal = (props: any) => {
  const group: GroupApiResponse = props.group
  if (group === undefined) {
    return <></>
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {group.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>ID: {group.id}</h4>
        <Container>
          <p style={{ "wordWrap": "break-word" }}>
            {group.description}
          </p>
        </Container>
        {group.members ? (
          <ListGroup as="ol" numbered>
            {group.members.map((member) => {
              return (
                <ListGroup.Item as="li" key={member.id}>{member.user?.username}</ListGroup.Item>
              )
            })}
          </ListGroup>
        ) : <></>}

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default GroupInfoModal;
