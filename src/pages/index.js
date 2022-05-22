import { Button } from "@mui/material";
import NextLink from 'next/link'
import Title from "common/Title";
import GeneralList from "components/List/GeneralList/GeneralList";


export default function Home() {
  return (
    <div>
      <Title/>
      <NextLink href={'addClient/AddClient'}>
        <Button variant="contained">Add Client</Button>
      </NextLink>
      <GeneralList/>
    </div>
  )
}
