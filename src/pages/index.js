import { Button } from "@mui/material";
import Link from 'next/link'
import Title from "common/Title";
import GeneralList from "components/List/GeneralList/GeneralList";


export default function Home() {
  return (
    <div>
      <Title/>
      <Link href={'addClient'}>
        <Button variant="contained">Add Client</Button>
      </Link>
      <Link href={'editArea'}>
        <Button variant="contained">Edit Area</Button>
      </Link>
      <GeneralList/>
    </div>
  )
}
