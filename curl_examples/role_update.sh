# CONFIG
app_host=localhost:3000
route="/role/3/update"
data_json="./role_update.json"



# RUN
echo "> Update role '3'"
curl -X PUT -H "Content-Type: application/json" -d @$data_json "$app_host$route"
echo
exit 0
