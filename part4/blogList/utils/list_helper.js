const dummy = (blogs) =>{
 return 1;
}
const totalLikes = (blogs)=>{
    return blogs.reduce((sum,items)=>{
        return sum + items.likes
    },0)
}
const favoriteBlog = (blogs) =>{
    let mostLiked = 0
    blogs.map((blog)=>{
        if(blog.likes > mostLiked) {
            mostLiked = blog.likes 
        } 
    })
    const answer =  blogs.filter((blog)=>{
        return blog.likes === mostLiked;
    })
    delete answer[0]._id
    delete answer[0].url
    delete answer[0].__v
    return answer[0]
}
const mostBlogs = (blogs)=>{
    let mostBlog = 0;
    blogs.map((blog)=>{
        if(blog.blogs > mostBlog){
            mostBlog = blog.blogs
        }
    })
    const answer = blogs.filter((blog)=>{
        return blog.blogs === mostBlog
    })
    return answer[0];
}
export default {dummy, totalLikes, favoriteBlog, mostBlogs}