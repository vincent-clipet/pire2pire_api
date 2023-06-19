# CONFIG
app_host=localhost:3000
route="/training/create"
data_json="./training_create.json"



# RUN
echo "> Create a new training"
curl -X POST -H "Content-Type: application/json" -d @$data_json "$app_host$route"
echo
exit 0
