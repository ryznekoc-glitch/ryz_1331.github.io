console.log('succsesful')
const Users = [
    //admin
    {key : "0000&a0000", bd : "0000", name : "admin"},
    {key : "0331&r0331", bd : "0331", name : "ryuzo"},
    {key : "0108&k0108", bd : "0108", name : "koto"},
    {key : "0117&n0117", bd : "0117", name : "natsuna"},
    {key : "0223&k0223", bd : "0223", name : "kazuki"},
    {key : "0309&h0309", bd : "0309",name : "hatsuki"},
    {key : "0317&s0317", bd : "0317", name : "sakura"},
    {key : "0318&s0318", bd : "0318", name : "sakura"},
    {key : "0327&s0327", bd : "0327", name : "sora"},
    {key : "0604&a0604", bd : "0604", name : "ayano"},
    {key : "0711&a0711", bd : "0711", name : "aoi"},
    {key : "0813&t0813", bd : "0813", name : "tsukasa"},
    {key : "1202&n1202", bd : "1202", name : "nico"},
    {key : "1220&m1220", bd : "1220", name : "miina"}
]

function verify() {
    const UserID = document.getElementById("userId").value
    const Password = document.getElementById("password").value
    const UserKey = UserID + "&" + Password
    
    const wasfound = Users.some(user => user.key === UserKey)
    
    if (wasfound === true){
        location.href = '../redirect/home.html'
    }
}