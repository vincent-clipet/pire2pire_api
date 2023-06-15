# CONFIG
app_host=localhost:3000
route="/user/1/setrole"
data_json="./user_set_role.json"



# RUN
echo "> Set role '2' on user '1'"
curl -X PUT -H "Content-Type: application/json" -d @$data_json "$app_host$route"
echo
exit 0
