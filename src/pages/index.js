
import Title from "common/Title";
import GeneralList from "components/List/GeneralList/GeneralList";


export default function Home() {
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <Title/>
      <GeneralList/>
    </div>
  )
}
