import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Transition } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../util/graphql';

const Home = () => {
  try {
    const { user } = useContext(AuthContext);
    const {
      loading,
      data: { getPosts: posts }
    } = useQuery(FETCH_POSTS_QUERY);

    if (posts) {
      return (
        <Grid columns={1}>
          <Grid.Row>
            {user && (
              <Grid.Column>
                <PostForm />
              </Grid.Column>
            )}
          </Grid.Row>
          <Grid.Row>
            <h1>Recent Posts</h1>
          </Grid.Row>
          <Grid.Row>
            {loading ? (
              <h1>Loading posts..</h1>
            ) : (
                <Transition.Group>
                  {posts &&
                    posts.map((post) => (
                      <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                        <PostCard post={post} />
                      </Grid.Column>
                    ))}
                </Transition.Group>
              )}
          </Grid.Row>
        </Grid>
      );
    } else {
      return (
        <h1>Loading posts..</h1>
      );
    }
  } catch (e) {
    const { user } = useContext(AuthContext);
    const {
      loading,
      data: { getPosts: posts }
    } = useQuery(FETCH_POSTS_QUERY);

    console.info(e, user, loading, posts);
    return (
      <h1>Loading posts..</h1>
    );
  }
}

export default Home;
