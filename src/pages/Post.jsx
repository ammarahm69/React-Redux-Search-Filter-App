import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../store";
import { Card, CardContent, Typography, Grid } from "@mui/material";

const PostsPage = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.postsState);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => dispatch(setPosts(data)));
  }, [dispatch]);

  return (
    <div style={styles.container}>
      <h1>All Posts</h1>
      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid item key={post.id} xs={12} sm={6} md={4}>
            <Card style={styles.card}>
              <CardContent>
                <Typography variant="h6" component="h3">
                  {post.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {post.body}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
  },
};

export default PostsPage;
