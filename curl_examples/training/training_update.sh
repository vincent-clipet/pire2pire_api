# CONFIG
app_host=localhost:3000
route="/training/4/update"
data_json="./training_update.json"



# RUN
echo "> Update training '4'"
curl -X PUT -H "Content-Type: application/json" -d @$data_json "$app_host$route"
echo
exit 0
