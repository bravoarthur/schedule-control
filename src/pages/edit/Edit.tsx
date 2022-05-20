import { Button, TextField, Typography } from "@mui/material";
import { TClient } from "types/TypeClients";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
/*import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from "react";
import { ClientsContext } from "common/context/ClientsContext";

export async function getStaticPaths() {
    
    const {clientList} = useContext(ClientsContext)
    const paths = clientList.map((item) => {
      return { params: { id: `${item.name}` } };
    })

    console.log('dados:', clientList);
    console.log('paths:', paths);

    return {
      paths: paths,
      fallback: false // false or 'blocking'
    };
}
// --------------------------------------------------------------




//--------------------------------------------------------------------

//Essa funcao vai ler o url e atravez do id da pagina fazer um find na lista de posts, achar o Post correto e retornar um objeto props, com todas as propriedades do post. tb nao precisamos chamar essa lista em outro lugar, essa funcao ajuda a carregar de forma eficiente a pagina

//A primeira funcao pegou cada path existente, a segunda esta pegando os props de cada path e a terceira vai gerar o componente. Assim o next gera uma pagina pronta no build para melhorar a eficiencia. Essas coisas rodam a nivel de servidor e nao no navegador



export async function getStaticProps(context) {
    console.log('Contexto', context.params.id);
    const id = context.params.id; // da pagina que estamos

    const post = clientList.posts.find((currentPost) => {
      if(currentPost.id === id) {
        return true;
      }
      return false;
    })

    console.log(post);

    //tudo o que e colocado nesse return e recebido na funcao PostByIdScreen, que e a proxima funcao
  return {
    props: {
      id: post.id,
      title: post.title,
      date: post.date,
      content: post.content,
    }, 
  }
}
//----------------------------------------------------------------------
//-----------------------------------------------------------------------



//Aqui pegou as Props do getStaticProps
export default function PostByIdScreen(props) {
  // console.log(props);
  const router = useRouter();
  // console.log(router);
  const post = {
    title: props.title,
    date: props.date,
    content: props.content,
  };

  if(router.isFallback) {
    return 'Essa página não existe!';
  }

  return (
    <Box
      styleSheet={{
        flexDirection: 'column',
        margin: '32px auto',
        maxWidth: '700px',
        paddingHorizontal: '16px',
      }}
    >
      {}
      <Text
        variant="heading2"
        tag="h1"
        styleSheet={{ color: '#F9703E', justifyContent: 'center', lineHeight: '1.2' }}
      >
        {post.title}
      </Text>
      <Text styleSheet={{ color: '#F9703E', justifyContent: 'center', borderBottom: '1px solid #F9703E', paddingVertical: '16px', marginVertical: '16px' }}>
        {post.date}
      </Text>

     }
      <Box
        styleSheet={{
          flexDirection: 'column',
        }}
      >
        <Text>
          {post.content}
        </Text>

        {post.video && <iframe style={{ marginTop: '32px', minHeight: '400px' }} src={post.video} /> }
      </Box>


     
      <Box
        styleSheet={{
          marginTop: '16px',
          paddingVertical: '16px',
          borderTop: '1px solid #F9703E',
          color: '#F9703E',
        }}
      >
        <NextLink href="/" passHref>
          <Text tag="a" styleSheet={{ hover: { textDecoration: 'underline' } }}>
            Voltar para a home
            {console.log('estou aqui')}
          </Text>
        </NextLink>
      </Box>
    </Box>
  )
}
















*/



function EditPage(props: TClient ) {

    const {name, area, address, interval, lastVisit, visitList, notes} = props

    console.log(visitList)

    

    return ( 
        <>
            <Typography variant="h5"> Edit Client</Typography>

            <table>
                <tbody>
                    <tr>
                        <td>Name</td>
                        <td><TextField label='Name' value={name}/></td>
                    </tr>
                    <tr>
                        <td>Area</td>
                        <td><TextField label='Area' value={area}/></td>
                    </tr>
                    <tr>
                        <td>Address</td>
                        <td><TextField label='Address' value={address}/></td>
                    </tr>
                    <tr>
                        <td>Frequency</td>
                        <td><TextField label='Frequency' type='number' value={interval}/></td>
                    </tr>
                    <tr>
                        <td>Last Visit</td>
                        <td>{lastVisit}</td>
                    </tr>
                </tbody>
            </table>

            <div>
                <h4>Notes</h4>
                <TextField type="text"
                    multiline
                    maxRows={4}
                    minRows={4}
                    fullWidth
                    label="Notes"
                    value={notes} />
                  
            </div>

            <div>
                <Button> Save Changes</Button>
                <Button>Home</Button>
                <Button>Delete Client</Button>
            </div>

            <div>
                <Typography variant="h4">Visit List</Typography>

                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Delete Visit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {visitList?.map((item,index) => {
                            return(
                                <tr key={index}>
                                    <td>{item}</td>
                                    <td><DeleteForeverIcon/></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        
        </>

    );
}

export default EditPage;

