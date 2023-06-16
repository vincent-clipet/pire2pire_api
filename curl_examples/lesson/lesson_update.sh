# CONFIG
app_host=localhost:3000
route="/lesson/3/update"
data_json="./lesson_update.json"



# RUN
echo "> Update lesson '3'"
curl -X PUT -H "Content-Type: application/json" -d @$data_json "$app_host$route"
echo
exit 0
