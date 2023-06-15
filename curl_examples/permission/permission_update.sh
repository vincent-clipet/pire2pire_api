# CONFIG
app_host=localhost:3000
route="/permission/3/update"
data_json="./permission_update.json"



# RUN
echo "> Update permission '3'"
curl -X PUT -H "Content-Type: application/json" -d @$data_json "$app_host$route"
echo
exit 0
