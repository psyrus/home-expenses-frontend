import { useContext, useEffect, useState } from "react";
import { UserContext, UserContextType } from "../../contexts/user.context";
import { Button, Card, Container, ListGroup, Row, Spinner } from "react-bootstrap";
import { UserApiResponse } from "../expense/expenses-list.component";
import GroupInfoModal from "./group-info.component";
import CreateGroupModal from "./group-create.component";

export type GroupMemberApiResponse = {
  id: number
  group_id: number
  user_id: number
  user?: UserApiResponse
  is_admin: boolean
  created_at: Date
}
export type GroupApiResponse = {
  id: number
  name: string
  description: string
  created_at: Date
  members?: GroupMemberApiResponse[]
}

const GroupsList = () => {
  const { currentUser } = useContext(UserContext) as UserContextType;
  const [groupsData, setGroupsData] = useState<GroupApiResponse[]>([]);
  const [modalShow, setModalShow] = useState<GroupApiResponse>();
  const [newGroupModalShow, setNewGroupModalShow] = useState<boolean>(false);

  useEffect(() => {

    const client = currentUser?.apiClient;
    if (!client) {
      return;
    }

    const getApiContent = async () => {
      const groupsContent = await client.getGroups()
      setGroupsData(groupsContent);
    }

    getApiContent();

  }, [currentUser]);

  const getGroupMembers = async (groupId: number) => {
    const client = currentUser?.apiClient;
    if (!client) {
      return;
    }
    const members: GroupMemberApiResponse[] = await client.getGroupMembers(groupId)

    const newGroupsData = groupsData.map((group) => {
      if (group.id == groupId) {
        group.members = members;
      }

      return group;
    })

    setGroupsData([...newGroupsData]);
  }

  return (
    <Container>
      <Row>
        <h1>Groups</h1>
      </Row>
      <Row>
        <Button className="col-md-2" size="sm" variant="primary" onClick={() => setNewGroupModalShow(true)}>
          Add New Group
        </Button>
      </Row>
      <Row className="gy-5 gx-5">
        {
          groupsData ? (
            groupsData.map((groupItem: GroupApiResponse, index) => {
              return (
                <Card className="col-md-3 col-sm-6" key={index}>
                  <Card.Body>
                    <Card.Title>{groupItem.name} (ID: {groupItem.id})</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Members: {groupItem.members?.length ?? 0}</Card.Subtitle>
                    <Card.Text>
                      <Button variant="primary" onClick={() => setModalShow(groupItem)}>
                        View Group Info
                      </Button>

                    </Card.Text>
                  </Card.Body>
                </Card>
              )
            })
          ) : (
            <div className="text-center">
              <Spinner animation="border" role="status" />
            </div>
          )
        }
        <GroupInfoModal
          show={modalShow !== undefined}
          onHide={() => setModalShow(undefined)}
          group={modalShow}
        />
        <CreateGroupModal
          show={newGroupModalShow}
          onHide={() => setNewGroupModalShow(false)}
        />
      </Row>
    </Container>
  )
}

export default GroupsList;
