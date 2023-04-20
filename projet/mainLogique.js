setupUI()

let baseUrl=`https://tarmeezacademy.com/api/v1`



function setupUI()
{
      let token = localStorage.getItem("token")
      let logoubtn = document.getElementById("logout-btn")
      let logibtn = document.getElementById("login-btn")
      let registerbtn = document.getElementById("register-btn")
      let postclick = document.getElementById('add-btn')

      if(token==null)
      {
          logoubtn.classList.add("hidden")
        logibtn.classList.remove("hidden")
        registerbtn.classList.remove("hidden")
        document.getElementById('nav-username').innerHTML=""
        document.getElementById('nav-user-image').classList.add('hidden')
        if(postclick!=null)
        {
            postclick.classList.add('hidden')
            
        }
        
        
      }else{
          
      logibtn.classList.add("hidden")
      registerbtn.classList.add("hidden")
      logoubtn.classList.remove("hidden")
      if(postclick!=null)
      {
          postclick.classList.remove('hidden')
          
      }

      let userr = getCurrebtUser()
      document.getElementById('nav-username').innerHTML=userr.username
      document.getElementById('nav-user-image').src= userr.profile_image
      document.getElementById('nav-user-image').classList.remove('hidden')
    }
}





function loginBtnClicked()
{
   
    let username = document.getElementById('username-input').value
    let password = document.getElementById('password-input').value

    const params = {
        "username":username,
        "password":password
    }

    const url =`${baseUrl}/login`
    axios.post(url,params)
    .then((response)=>{
        localStorage.setItem("token",response.data.token)
        localStorage.setItem("user",JSON.stringify(response.data.user))
        
        let modal = document.getElementById('login-modal')
        let modalInstance = bootstrap.Modal.getInstance(modal)
        modalInstance.hide()
        setupUI()
        showAlert('Nice, you triggered this alert message!','success')

})
.catch(error=>{
    showAlert('Change The Data','danger')
})
}




function RegisterBtnClicked()
{
    let baseUrl="https://tarmeezacademy.com/api/v1"
    let username = document.getElementById('register-username-input').value
    let password = document.getElementById('register-passwoard-input').value
    let name = document.getElementById('register-name-input').value
    let image = document.getElementById('register-image-input').files[0]


    
    
    let formdata = new FormData()

    formdata.append('name',name)
    formdata.append('username',username)
    formdata.append('password',password)
    formdata.append('image',image)



 


    const url =`${baseUrl}/register`
    axios.post(url,formdata,{
        headers:{
            "Content-Type":"multipart/form-data"
        }
    })

    .then((response)=>{
  
        localStorage.setItem("token",response.data.token)
        localStorage.setItem("user",JSON.stringify(response.data.user))
        
        let modal = document.getElementById('register-modal')
        let modalInstance = bootstrap.Modal.getInstance(modal)
        modalInstance.hide()
        setupUI()
        showAlert(" New User Registered Success ",'success')



        
    })
    .catch(error=>{
        let message = error.response.data.message
        showAlert(message,'danger')
    })
}



function logout()
{
     localStorage.removeItem('token')
     localStorage.removeItem("user")
     setupUI()
     showlogoutalerts()
   
     
     
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




function getCurrebtUser()
{
    let user = null
    let storageUser = localStorage.getItem('user')

    if(storageUser!=null){
        user = JSON.parse(storageUser)
    }
    return user
}



function showlogoutalerts()
{
    const alertPlaceholder = document.getElementById('logoutalert')
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
    
   
        appendAlert(' You Log Out !', 'danger')
        
        // setTimeout(()=>{

        //     let alertTohide = bootstrap.Alert.getOrCreateInstance("#logoutalert")
        // alertTohide.close()

        // },2000)
}






function editPostBtnClicked(postes)
{
    let post = JSON.parse(decodeURIComponent(postes))
   console.log(post)
  
    document.getElementById('post-id').value = post.id
    document.getElementById('Post-Modal-Title').innerHTML="Edit Post"
    let postModal = new bootstrap.Modal(document.getElementById('post-modal'),{})
    postModal.toggle()

    document.getElementById('post-title-input').value=post.title
    document.getElementById('post-body-input').value=post.body
    document.getElementById('post-modal-submit-button').innerHTML="Edit"

}



function deletePostBtnClicked(postes)
{
    let post = JSON.parse(decodeURIComponent(postes))
    
    let postModal = new bootstrap.Modal(document.getElementById('delete-post-modal'),{})
    postModal.toggle()
    document.getElementById('delete-post-id-input').value=post.id




}




function confirmPostDelete()
{
    let token = localStorage.getItem('token')
    let postid =  document.getElementById('delete-post-id-input').value
   
    let baseUrl=`https://tarmeezacademy.com/api/v1`

    const url =`${baseUrl}/posts/${postid}`
    
    let headers = { 
        "authorization":`Bearer ${token}`,
        "Content-Type":"multipart/form-data"
    }

    axios.delete(url,{
        headers:headers
    })
    .then((response)=>{
    
      
        let modal = document.getElementById('delete-post-modal')
        let modalInstance = bootstrap.Modal.getInstance(modal)
        modalInstance.hide()
        showAlert(" The Post Has Been Deleted Successfuly ",'success')
        getPost()

})
.catch(error=>{
    showAlert(error.response.data.message,'danger')
})
}




function profileClicked()
{
    let user = getCurrebtUser()
    let userId = user.id 
    location=`profile.html?userid=${userId}`

}








