import React, { useState, useContext, useEffect } from "react";
import { loginContext } from "../App";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import cover from '../images/buildings.jpeg'
import profile from '../images/profile.png'

interface Post {
  id: number
  title: string
  body: string | undefined
  author: string
  userId: number
}

const Blog = () => {
  const userContext: any = useContext(loginContext) || {}
  const [yourPosts, setYourPosts] = useState<Post[]>([])
  const [feed, setFeed] = useState<Post[]>([])
  const [newPost, setNewPost] = useState<string>()

  let navigate = useNavigate()

  const getPostData = async () => {
    const postData = await axios.get('https://jsonplaceholder.typicode.com/posts')
    let initialyourPosts:Post[] = []
    let initialFeed:Post[] = []

    postData?.data?.map(
      (post:Post) => {

        const authorName = post?.userId === userContext?.user?.id ? 
          userContext?.user?.name :
          userContext?.users?.data[post?.userId - 1].name

        const newPost = {
          id: post.id,
          title: post.title,
          body: post?.body,
          author: authorName,
          userId: userContext?.users?.data[post?.userId - 1].id
        }

        post?.userId === userContext?.user?.id ?
        initialyourPosts = [...initialyourPosts, { ...newPost }] :
        initialFeed = [...initialFeed, { ...newPost }]
      }
    )

    setYourPosts(initialyourPosts)
    setFeed(initialFeed)
  }

  const addNewPost = (e: React.FormEvent) => {
    e.preventDefault()

    setYourPosts([
      ...yourPosts,
      {
        id: Date.now(),
        title: `Authored by ${userContext?.user?.name}`,
        body: newPost,
        author: userContext?.user?.name,
        userId: userContext?.user?.id 
      }
    ])

    setNewPost('')
  }

  useEffect(() => {
    getPostData();

    (!userContext || !userContext?.user) &&
      navigate('/')

  }, [])

  return (
    <>
      <div className="header">
        <img src={cover} alt="Buildings" className="header__cover" />
        <img src={profile} alt="Profile" className="header__profile" />
      </div>
      <h1> { userContext?.user?.name } </h1>
      <form>
      <textarea name="newPost" value={newPost} onChange={e => setNewPost(e.target.value)} placeholder="What's on your mind?" className="new-post"></textarea>
      <button onClick={addNewPost}> Post </button>
      </form>
      <ul className="posts">
        {
          yourPosts.slice(0).reverse().map(
            post => {
              return (
                <li key={post.id}>
                  <h2> { post.title } </h2>
                  <p> { post.body } </p>
                  <p> <small> -- { post.author } </small> </p>
                </li>
              )
            } 
          )
        }
      </ul>
      <h2 className="section-title"> General Post </h2>
      <ul className="feed">
      {
          feed.map(
            post => {
              return (
                <li key={post.id}>
                  <h2> { post.title } </h2>
                  <p> { post.body } </p>
                  <p> <small> -- { post.author } </small> </p>
                </li>
              )
            } 
          )
        }
      </ul>
    </>
  )
}

export default Blog
