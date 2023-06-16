# CONFIG
app_host=localhost:3000
route="/module/3/update"
data_json="./module_update.json"



# RUN
echo "> Update module '3'"
curl -X PUT -H "Content-Type: application/json" -d @$data_json "$app_host$route"
echo
exit 0
