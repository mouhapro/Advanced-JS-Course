setupUI()

getUser()


function getUser(){

    
    let id = getCurrentUserId()
    
 
axios.get(`https://tarmeezacademy.com/api/v1/users/${id}`)
.then((response)=>{
let user = response.data.data

document.getElementById("main-info-email").innerHTML=user.email
document.getElementById("main-info-name").innerHTML=user.name
document.getElementById("main-info-username").innerHTML=user.username
document.getElementById('header-image').src=user.profile_image
document.getElementById('name-post').innerHTML=`${user.username}'s`
document.getElementById("posts-count").innerHTML=user.posts_count
document.getElementById("comments-count").innerHTML=user.comments_count 


})

}


function getCurrentUserId()
{
    let urlParams = new URLSearchParams(window.location.search)
    let id = urlParams.get("userid")
    return id
}



getPost()


function getPost()
{
    let id = getCurrentUserId()

    axios.get(`https://tarmeezacademy.com/api/v1/users/${id}/posts`)
    .then((response)=>{
 
   
               let posts = response.data.data
               console.log(response)
  
    
        for(post of posts)
        {
            let author = post.author
    
            let postTitle=""
    let user = getCurrebtUser()
    let isMypost = user != null && post.author.id == user.id
    let buttonContent = ""
    if(isMypost){
        buttonContent=
        `
        <i class="fa-solid fa-trash m-3" style="float:right;font-size: 25px;color: red;cursor: pointer;" onclick="deletePostBtnClicked('${encodeURIComponent(JSON.stringify(post))}')"></i>
        <i class="fa-solid fa-pen-to-square m-3" style="float:right;font-size: 25px;color: black;cursor: pointer;" onclick="editPostBtnClicked('${encodeURIComponent(JSON.stringify(post))}')"></i>
        
        `
    }
            if(post.title!=null){
                postTitle=post.title
            }
    
           let content = `
           
           <div class="card shadow ">
           <div class="card-header">

             <img class="rounded-circle border border-3" src="${author.profile_image}" alt=""  style="width:55px ; height: 55px;">
             <b>${author.username}</b> 
             ${buttonContent}
           </div>
           <div class="card-body" onclick="postClicked(${post.id})" style="cursor:pointer">
               <img class="w-100" src="${post.image}" alt="">
    
               <h6 style="color: rgb(193, 193,193 );" class="mt-1">
                  ${post.created_at}
               </h6>
    
               <h5>
                   ${postTitle}
               </h5>
    
               <p>
                  ${post.body}
               </p>
               
               <hr>
    
               <div>
                   <i class="fa-solid fa-pen"></i>
                   <span>
                       (${post.comments_count})Commentaire
                   </span>
               </div>
    
           </div>
         </div>
    
         `
         document.getElementById('user-posts').innerHTML += content
         
    
           
    
        }
        
    })
}





















