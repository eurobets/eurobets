import { createUseStyles } from 'react-jss';
import { useEffect } from 'react';
import Layout from '../components/Layout';
// import { API, graphqlOperation } from 'aws-amplify';
// import { listRooms } from '../graphql/queries';

const useStyles = createUseStyles({
  container: {
  },
});

const Index = () => {
  // const classes = useStyles();
  // useEffect(() => {
  //   fetchRooms();
  // }, [])
  //
  // async function fetchRooms() {
  //   try {
  //     // @ts-ignore
  //     const { data: { listRooms: { items } } } = await API.graphql(graphqlOperation(listRooms));
  //     //const todos = roomsData.data.listRooms.items
  //
  //     console.log(items);
  //   } catch (err) { console.log('error fetching todos', err) }
  // }

  return (
    <Layout>
      <div>dashboard</div>
    </Layout>
  )
}

export default Index;
