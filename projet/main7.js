getPost()






function getPost(){
    
    toggleLoa(true)

    let baseUrl=`https://tarmeezacademy.com/api/v1`

    axios.get(`${baseUrl}/posts`)
    .then((response)=>{
 
   
               toggleLoa(false)
               document.getElementById('posts').innerHTML=""



        let posts = response.data.data
    
        for(post of posts)
        {
            let author = post.author
    
            let postTitle=""
    let user = getCurrebtUser()
    let isMypost = user != null && post.author.id == user.id
    let buttonContent = ""
    if(isMypost){
        // <button class="btn btn-danger m-3" style="float:right;" onclick="deletePostBtnClicked('${encodeURIComponent(JSON.stringify(post))}')">Delate</button>
        // <button class="btn btn-secondary m-3" style="float:right;" onclick="editPostBtnClicked('${encodeURIComponent(JSON.stringify(post))}')">Edit</button>
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
           
           <span onclick="userClicked(${author.id})" style="cursor:pointer" >
           <img class="rounded-circle border border-3" src="${author.profile_image}" alt=""  style="width:55px ; height: 55px;">
           <b>${author.username}</b> 
           </span>
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
         document.getElementById('posts').innerHTML += content
         
    
           
    
        }
        
    })
}


function userClicked(userId)
{
   
    location=`profile.html?userid=${userId}`

    
}





function showAlert(message,type)
{

    const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
    const appendAlert = (message, type) => {
      const wrapper = document.createElement('div')
      wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
      ].join('')
    
      alertPlaceholder.append(wrapper)
    }
    
   
        appendAlert(message, type)
        
        // setTimeout(()=>{

        //     let alertTohide = bootstrap.Alert.getOrCreateInstance("#liveAlertPlaceholder")
        // alertTohide.close()

        // },2000)

        
}








 
function createNewpostclicked()
{
    let baseUrl="https://tarmeezacademy.com/api/v1"
    let postIdd = document.getElementById('post-id').value
    let isCreate = postIdd == null || postIdd==""

    

    let title = document.getElementById('post-title-input').value
    let body = document.getElementById('post-body-input').value
    let token = localStorage.getItem('token')
    let image = document.getElementById('post-image-input').files[0]

    
    let formdata = new FormData()

    formdata.append('body',body)
    formdata.append('title',title)
    formdata.append('image',image)


    const url =``
    
    if(isCreate)
    {
        
    //    url=`${baseUrl}/posts`
       
       axios.post("https://tarmeezacademy.com/api/v1/posts",formdata,{
        headers:{
            "authorization":`Bearer ${token}`,
            "Content-Type":"multipart/form-data"
        }
    })
       .then((response)=>{
        showAlert('New Post Has Been Created ! ','success')
        let modal = document.getElementById('post-modal')
        let modalInstance = bootstrap.Modal.getInstance(modal)
        modalInstance.hide()
       
        getPost()
   
    })
    .catch(error=>{
        showAlert(error.response.data.message,'danger')
    })
}

else{
    formdata.append('_method',"put")
   
       let url = `https://tarmeezacademy.com/api/v1/posts/${postIdd} `

        axios.post(url,formdata,{
            headers:{
                "authorization":`Bearer ${token}`,
                "Content-Type":"multipart/form-data"
            }
        })
           .then((response)=>{
            showAlert('New Post Has Been Created ! ','success')
            let modal = document.getElementById('post-modal')
            let modalInstance = bootstrap.Modal.getInstance(modal)
            modalInstance.hide()
           
            getPost()
       
        })
        .catch(error=>{
            showAlert(error.response.data.message,'danger')
        })
    }
}







function postClicked(postid){
    window.location=`post.deatels.html?postid=${postid}`

    
}





function addBtnClicked()
{

     document.getElementById('post-id').value = ''
     document.getElementById('Post-Modal-Title').innerHTML="Create New Post "
     let postModal = new bootstrap.Modal(document.getElementById('post-modal'),{})
     postModal.toggle()
 
     document.getElementById('post-title-input').value=''
     document.getElementById('post-body-input').value=''
     document.getElementById('post-modal-submit-button').innerHTML="Create"
 
}



function toggleLoa(show=true)
{
    if(show){
        document.getElementById('loader').style.visibility='visible'
    }
    else{
        document.getElementById('loader').style.visibility='hidden'
    }

}


