import { Button } from '@radix-ui/themes'
const IssueDeleteButton = ({issueId}: {issueId: number}) => {
  return (
    <Button color='red'>Delete Issue</Button>
  )
}

export default IssueDeleteButton