// Logic
const gun = Gun(["http://localhost:8765/gun"]);
const user = gun.user();

signup.addEventListener("click", (e) => {
  e.preventDefault();
  user.create(username.value, pwd.value);
});

signin.addEventListener("click", (e) => {
  e.preventDefault();
  user.auth(username.value, pwd.value);
});

sendmessage.addEventListener("click", (e) => {
  e.preventDefault();
  if (!user.is) {
    return;
  }
  const { pub } = user.is;

  gun.get("messages").set({ userPub: pub, message: message.value });
  message.value = "";
});
const updateUI = ({ userPub, message }, id) => {
  const usr = gun
    .user(userPub)
    .get("alias")
    .once((userName) => {
      console.log({ userName });
      output.innerHTML += `<p><b>${userName}:</b> ${message}</p>`;
    });
};

gun.on("auth", () => {
  $("#signForm").hide();
  $("#messageForm").show();
  gun.get("messages").map().once(updateUI);
});