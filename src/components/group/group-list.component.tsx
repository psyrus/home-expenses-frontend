import { useContext, useEffect, useState } from "react";
import { UserContext, UserContextType } from "../../contexts/user.context";
import { Container, Row, Spinner } from "react-bootstrap";
import { UserApiResponse } from "../expense/expenses-list.component";

export type GroupMemberApiResponse = {
  id: number
  group_id: number
  user_id: number
  user?: UserApiResponse
  is_admin: boolean
}
export type GroupApiResponse = {
  id: number
  name: string
  description: string
  members?: GroupMemberApiResponse[]
}

const GroupsList = () => {
  const { currentUser } = useContext(UserContext) as UserContextType;
  const [groupsData, setGroupsData] = useState<GroupApiResponse[]>([]);

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

    console.log(`Finished getting members for group ${groupId}. Found ${members.length}`)
    console.log(members);

    setGroupsData([...newGroupsData]);
  }

  return (
    <Container>
      <h1>Groups</h1>
      <Row>
        {
          groupsData ? (
            groupsData.map((groupItem: GroupApiResponse) => {
              return (
                <div>
                  <span>{groupItem.name}</span>
                  <span onClick={() => getGroupMembers(groupItem.id)}>Get Members</span>
                </div>
              )
            })
          ) : (
            <div className="text-center">
              <Spinner animation="border" role="status" />
            </div>
          )
        }
      </Row>
    </Container>
  )
}

export default GroupsList;