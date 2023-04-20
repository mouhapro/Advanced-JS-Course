let urlparams = new URLSearchParams(window.location.search) 
let id =  urlparams.get("postid")
console.log(id)

getpost()
function getpost(){
    let baseUrl=`https://tarmeezacademy.com/api/v1`

    axios.get(`${baseUrl}/posts/${id}`)
    .then((response)=>{
 
        let post = response.data.data
        let comments = post.comments
        let other = post.author

        document.getElementById('username-span').innerHTML=other.username       
       

        
        
        
        
     
       
        let container = `
        <div class="card shadow ">
    <div class="card-header">
      <img class="rounded-circle border border-3" src="${other.profile_image}" alt=""  style="width:55px ; height: 55px;">
      <b>${other.username}</b> 
    </div>
    <div class="card-body">
        <img class="w-100" src="${post.image}" alt="">

        <h6 style="color: rgb(193, 193,193 );" class="mt-1">
            ${post.created_at}
        </h6>

        <h5>
            ${post.title}
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


        <div class="input-group mb-3 " id="add-comment-div">
        <input id="comment-input" type="text" placeholder="add your comment here ..." class="form-control">
        <button onclick="createCommenter()" class="btn btn-outline-primary" type="button" >send</button>
        </div>

  </div>
        `
      

let part = document.getElementById('all')
part.innerHTML=container

    })
}
        


document.getElementById('home').addEventListener('click',()=>{
window.location='index7.html'
})



function createCommenter(){
    let baseUrl=`https://tarmeezacademy.com/api/v1`
    let commentBody = document.getElementById('comment-input').value 
    let params = {
        "body":commentBody
    }
    let token = localStorage.getItem("token")
    let url = `${baseUrl}/posts/${id}/comments`

    axios.post(url,params,{
        headers:{
            "authorization": `Bearer ${token}`
        }
    })
    .then((response)=>{ 
        console.log(response)
        getpost()
        showAlert("The comment has been created successfuly","success")
    })
    .catch(error=>{
        showAlert(error.response.data.message,"danger")
    })




}










