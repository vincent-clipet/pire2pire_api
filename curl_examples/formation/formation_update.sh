# CONFIG
app_host=localhost:3000
route="/formation/3/update"
data_json="./formation_update.json"



# RUN
echo "> Update formation '3'"
curl -X PUT -H "Content-Type: application/json" -d @$data_json "$app_host$route"
echo
exit 0