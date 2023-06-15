# CONFIG
app_host=localhost:3000
route="/user/signup"
data_json="./user_signup.json"



# RUN
echo "> Create a new user"
curl -X POST -H "Content-Type: application/json" -d @$data_json "$app_host$route"
echo
exit 0
